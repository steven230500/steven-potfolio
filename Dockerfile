# syntax=docker/dockerfile:1.7

### Dependencias (instala con pnpm usando el lockfile)
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

### Build (Next.js standalone)
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables necesarias en build (solo públicas)
ENV NODE_ENV=production
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

RUN pnpm build

### Runtime mínimo
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copiamos el standalone y estáticos
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]

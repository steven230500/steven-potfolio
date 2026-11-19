/**
 * Runs a DOM update inside a View Transition when the browser supports it and
 * the user hasn't asked for reduced motion. `className` is set on <html> for
 * the duration so CSS can pick the right animation (see globals.css).
 */
export function withViewTransition(className: string, update: () => void) {
  const doc = typeof document !== "undefined" ? document : null
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (!doc || reduce || typeof doc.startViewTransition !== "function") {
    update()
    return
  }

  const root = doc.documentElement
  root.classList.add(className)
  const transition = doc.startViewTransition(update)
  transition.finished.finally(() => root.classList.remove(className))
}

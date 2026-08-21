import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

/* ── Types ── */
type RouterCtx = {
  path: string
  navigate: (to: string) => void
}

/* ── Context ── */
const RouterContext = createContext<RouterCtx>({ path: '/', navigate: () => {} })

/* ── Provider ── */
export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string) => {
    const [targetPath, hash] = to.split('#')
    const finalPath = targetPath || '/'
    window.history.pushState({}, '', to)
    setPath(finalPath)
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

/* ── Hook ── */
export function useRouter() {
  return useContext(RouterContext)
}

/* ── Link component ── */
type LinkProps = {
  to: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function RouterLink({ to, className, children, onClick }: LinkProps) {
  const { navigate } = useRouter()
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}

/* ── Route / Switch ── */
type RouteProps = {
  path: string
  element: React.ReactNode
}

export function Routes({ routes }: { routes: RouteProps[] }) {
  const { path } = useRouter()
  const match = routes.find((r) => r.path === path) ?? routes.find((r) => r.path === '*')
  return <>{match?.element ?? null}</>
}

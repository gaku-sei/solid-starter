import {
  Component,
  createContext,
  createSignal,
  onCleanup,
  useContext,
} from "solid-js"
import { Match, match as pathToRegexpMatch, Path } from "path-to-regexp"

export type Router = {
  history: {
    go: (href: string, replace?: boolean) => void
  }
  location: {
    match: <P extends Record<string, unknown>>(path: Path) => Match<P>
    path: string
  }
}

export const RouterContext = createContext<Router>()

const match = <P extends Record<string, unknown>>(path: Path) =>
  pathToRegexpMatch<P>(path, { decode: window.decodeURIComponent })

export const RouterProvider: Component = props => {
  const history = {
    go: (href: string, replace = false) => {
      replace
        ? window.history.replaceState({}, "", href)
        : window.history.pushState({}, "", href)

      window.dispatchEvent(new Event("popstate"))
    },
  }

  const [location, setLocation] = createSignal<Router["location"]>({
    match: <P extends Record<string, unknown>>(path: Path) =>
      match<P>(path)(window.location.pathname),
    path: window.location.pathname,
  })

  const listener = (event: PopStateEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newLocation: Location = (event.target as any).location

    setLocation({
      match: <P extends Record<string, unknown>>(path: Path) =>
        match<P>(path)(newLocation.pathname),
      path: newLocation.pathname,
    })
  }

  window.addEventListener("popstate", listener)

  onCleanup(() => {
    window.removeEventListener("popstate", listener)
  })

  return (
    <RouterContext.Provider value={{ history, location: location() }}>
      {props.children}
    </RouterContext.Provider>
  )
}

export const useLocation = (): Router["location"] => {
  const { location } = useContext(RouterContext)

  return location
}

export const useHistory = (): Router["history"] => {
  const { history } = useContext(RouterContext)

  return history
}

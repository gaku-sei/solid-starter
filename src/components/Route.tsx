import { useLocation } from "@contexts/router"
import { MatchResult, Path } from "path-to-regexp"
import { Match } from "solid-js"

type Props<P extends Record<string, unknown>> = {
  children: JSX.Element | ((match: MatchResult<P>) => JSX.Element)
  path: Path
}

export function Route<
  P extends Record<string, unknown> = Record<string, unknown>
>({ children, path }: Props<P>): JSX.Element {
  const location = useLocation()

  const match = location.match(path)

  return (
    <Match when={Boolean(match)}>
      {match &&
        (typeof children === "function"
          ? children(match as MatchResult<P>)
          : children)}
    </Match>
  )
}

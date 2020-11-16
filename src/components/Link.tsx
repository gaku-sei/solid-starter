import { useHistory } from "@contexts/router"
import { Component } from "solid-js"

type Props = {
  href: string
  replace?: boolean
}

export const Link: Component<Props> = ({ children, href, replace = false }) => {
  const history = useHistory()

  const onClick = (event: MouseEvent) => {
    event.preventDefault()
    history.go(href, replace)
  }

  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  )
}

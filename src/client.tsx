import "solid-js"
import { render } from "solid-js/dom"

import App from "./App"

import "./index.css"

const node = document.getElementById("root")

if (!node) {
  throw new Error("Couldn't find node #root")
}

render(() => <App />, node)

import { render } from "solid-js/dom"

import { RouterProvider } from "@contexts/router"
import { createSdk, SdkContext } from "@contexts/sdk"

import Home from "./Home"

it("renders without crashing", () => {
  const div = document.createElement("div")
  const dispose = render(
    () => (
      <RouterProvider>
        <SdkContext.Provider value={createSdk()}>
          <Home />
        </SdkContext.Provider>
      </RouterProvider>
    ),
    div,
  )
  div.textContent = ""
  dispose()
})

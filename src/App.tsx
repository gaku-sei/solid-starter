import { Component, Switch } from "solid-js"

import { SdkContext, createSdk } from "@contexts/sdk"
import Home from "@pages/Home"
import { Link } from "@components/Link"
import { Route } from "@components/Route"
import { RouterProvider } from "@contexts/router"

const App: Component = () => (
  <RouterProvider>
    <SdkContext.Provider value={createSdk()}>
      <Switch fallback={<div>404</div>}>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/about">
          <div>
            <Link href="/">Home page</Link>
            <Link href="/hello/foobar">Hello page</Link>
            <p>About page</p>
          </div>
        </Route>
        <Route<{ name: string }> path="/hello/:name">
          {match => (
            <div>
              <Link href="/">Home page</Link>
              <p>Hello {match.params.name}</p>
            </div>
          )}
        </Route>
      </Switch>
    </SdkContext.Provider>
  </RouterProvider>
)

export default App

import {
  Component,
  For,
  Suspense,
  createResource,
  createSignal,
} from "solid-js"

import { Link } from "@components/Link"
import { CountriesQuery } from "@graphql"
import { useSdk } from "@contexts/sdk"

import logo from "./logo.svg"

const Home: Component = () => {
  const sdk = useSdk()

  const [count, setCount] = createSignal(0)

  const [countries, loadCountries] = createResource<
    undefined | CountriesQuery
  >()

  loadCountries(() => sdk.countries())

  return (
    <div class="h-full w-full overflow-auto">
      <div class="h-full w-full bg-gray-300 flex flex-col items-center justify-center">
        <div class="w-2/3">
          <Link href="/about">About page</Link>
          <img src={logo} class="h-16" alt="logo" />
          <p>{count()}</p>
          <button onClick={() => setCount(count() + 1)}>Increment</button>
          <Suspense fallback={<div>Loading</div>}>
            <div>
              <For each={countries()?.countries || []}>
                {country => (
                  <div>
                    {country.name}
                    <div class="pl-4">
                      <For each={country.languages}>
                        {language => <div>{language.name}</div>}
                      </For>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Home

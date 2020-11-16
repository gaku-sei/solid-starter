import { GraphQLClient } from "graphql-request"
import { createContext, useContext } from "solid-js"

import { getSdk, Sdk } from "@graphql"

export const createSdk = (): Sdk => {
  const client = new GraphQLClient(process.env.API_URI || "")

  const sdk = getSdk(client)

  return sdk
}

export const SdkContext = createContext<Sdk>()

export const useSdk = (): Sdk => useContext(SdkContext)

'use client'
import React, { ReactNode } from 'react'
import {QueryClient , QueryClientProvider} from "@tanstack/react-query"
import {Provider as JotaiProvider, useAtom} from "jotai"
const queryClient = new QueryClient()
const Provider = ({children} : {children : ReactNode}) => {

  return (
    <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <>
            {children}
          </>
        </QueryClientProvider>
    </JotaiProvider>
  )
}

export default Provider
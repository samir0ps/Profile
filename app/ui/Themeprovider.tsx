'use client'
import { setCookie } from 'cookies-next'
import { ThemeProvider, useTheme } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'
import React, { useEffect } from 'react'

const Themeprovider = ({ children, ...props }: ThemeProviderProps) => (
  <ThemeProvider enableColorScheme {...props}>
    <AppThemeProviderHelper />
    {children}
  </ThemeProvider>
)

const AppThemeProviderHelper = () => {
  const { theme } = useTheme()
  
  useEffect(() => {
    setCookie("__theme__", theme, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      path: "/",
    })
  }, [theme])

  return null
}

export default Themeprovider
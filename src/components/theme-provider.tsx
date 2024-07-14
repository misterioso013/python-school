"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { PythonProvider } from 'react-py'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
        <PythonProvider lazy>
          <NextThemesProvider {...props}>
            {children}
          </NextThemesProvider>
        </PythonProvider>
      )
}
'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

const Themeprovider = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider attribute='class' enableSystem>
      {children}
    </ThemeProvider>
)

export default Themeprovider
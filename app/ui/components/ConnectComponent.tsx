'use client'
import React, { ReactNode, memo } from 'react'
import { useConnectUser, useReceivingNotification } from './useConnect'

const ConnectComponent = memo(({children}: {children: ReactNode}) => {
  useConnectUser()
  useReceivingNotification()
  return <>{children}</>
})

ConnectComponent.displayName = 'ConnectComponent'

export default ConnectComponent
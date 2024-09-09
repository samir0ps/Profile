'use client'
import { useEffect, useState, useCallback, useMemo } from "react"
import { useUser } from "@clerk/nextjs"
import { socket } from "@/app/socket"
import { Message } from "@/app/(root)/dashboard/messages/messagesComponent"
import { useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { messageAtom, notificationsAtom, openChatAtom, unreadCountAtom, usersAtom } from "@/clientActions/States"
import { usePathname } from "next/navigation"
import _ from 'lodash'

export const useConnectUser = () => {
    const { user , isLoaded } = useUser()
    useEffect(() => {
        if (!user) return

        const emailAddress = user.emailAddresses[0].emailAddress
        socket.connect()
        socket.emit('register', emailAddress)
        
        return () => {
            socket.disconnect()
            socket.off('register')
        }
    }, [user, isLoaded])
}

export const useReceivingMessage = (admin: boolean) => {
    const queryClient = useQueryClient()
    const [openContact] = useAtom(openChatAtom)
    
    const handleNewMessage = useCallback((message: Message) => {
        const queryKey = admin ? ['admin_messages', message.from] : ['messages']
        queryClient.setQueryData<Message[]>(queryKey, (prev = []) => [...prev, message])
        
        if (!openContact && !admin) {
            const audio = new Audio('/sounds/pop.mp3')
            audio.play().catch(error => console.error('Error playing audio:', error))
        }
    }, [queryClient, admin, openContact])

    useEffect(() => {
        socket.on('newMessages', handleNewMessage)
        return () => { socket.off('newMessages', handleNewMessage) }
    }, [handleNewMessage])
}

export type Notification = {
    id: string,
    title: string, 
    created_at: string, 
    sender: string, 
    unread: boolean
}

export const useReceivingNotification = () => {
    const [, setMessage] = useAtom(messageAtom)
    const [, setNotifications] = useAtom(notificationsAtom)
    const [, setUnreadCount] = useAtom(unreadCountAtom)
    const pathName = usePathname()
    
    const handleNewNotification = useCallback((notification: Omit<Notification, 'id'>) => {
        setMessage('Samir, you received a new message...')
        setNotifications(prev => [{ ...notification, id: crypto.randomUUID(), unread: true }, ...prev])
        setUnreadCount(prev => prev + 1)
        if (pathName.includes(notification.sender)) {
            const audio = new Audio('/sounds/pop.mp3')
            audio.play().catch(error => console.error('Error playing audio:', error))
        }
    }, [setMessage, setNotifications, setUnreadCount, pathName])

    useEffect(() => {
        socket.on('new_notification', handleNewNotification)
        return () => { socket.off('new_notification', handleNewNotification) }
    }, [handleNewNotification])
}

export const useSetUnreadNotifications = () => {
    const [notifications] = useAtom(notificationsAtom)
    const [users, setUsers] = useAtom(usersAtom) 

    const sortedUsers = useMemo(() => {
        const filteredUsers = users.map(u => {
            const userNotifications = notifications.filter(n => n.sender === u.email)
            const latestNotification = userNotifications[0]
            return { 
                ...u, 
                latestMessageDate: latestNotification ? new Date(latestNotification.created_at) : new Date(0),
                messages: userNotifications.filter(n => n.unread).length 
            }
        })
        
        return filteredUsers.length ? _.orderBy(filteredUsers, ['latestMessageDate'], ['desc']) : []
    }, [notifications, users])

    useEffect(() => {
        const hasChanges = JSON.stringify(sortedUsers) !== JSON.stringify(users)
        if (sortedUsers.length && hasChanges) {
            setUsers(sortedUsers)
        }
    }, [sortedUsers, setUsers, users])
}
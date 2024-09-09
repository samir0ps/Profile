'use client'

import { notificationsAtom, unreadCountAtom } from "@/clientActions/States"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useAtom } from "jotai"
import { useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction, useEffect } from "react"

export const UpdateNotifications = () => {
    const [, setNotifications] = useAtom(notificationsAtom)
    const email = useSearchParams().get('user')
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn:async()=>{
            const {data}  = await axios.put('/api/adminMessages' , {email}) 
            return data
        } , onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['notifications']})
        }
    })
    useEffect(() => {
        if (!email) return
        mutation.mutateAsync()
        setNotifications(prev => 
            prev.map(n => 
                n.sender === email ? { ...n, unread: false } : n
            )
        )
    }, [email, setNotifications])
}




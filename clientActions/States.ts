import { User } from "@/app/(root)/dashboard/messages/messagesComponent"
import { Notification } from "@/app/ui/components/useConnect"
import { atom} from "jotai"

export const openChatAtom = atom(false)
export const messageAtom = atom('')
export const notificationsAtom = atom<Notification[]>([])
export const unreadCountAtom = atom(0)
export const usersAtom =atom<User[]>([])

export const openMenuAtom = atom<boolean>(false)
'use client'
import { openChatAtom, openMenuAtom } from "@/clientActions/States"
import { cn } from "@/ui/utils/cn"
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { useAtom } from "jotai"
import { ChevronRight, MessageCircle, HelpCircle, LogOut, Globe, User, LayoutDashboard, Home, FileText } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { UseOutSideClick } from "./components/OutsideClick"
import { useRouter } from "next/navigation"

const UserAccordin = () => {
    const [ , setOpenMenu] = useAtom(openMenuAtom)
    const router = useRouter()
    const { signOut } = useClerk()
    const handleSignout = () => {
        signOut(() => { router.push('/') })
        setOpenMenu(false)
    }
    const buttons = [
        { label: 'Get Free Website', icon: <Globe className="w-4 h-4" /> },
        { label: "Get Free Consultant", icon: <User className="w-4 h-4" /> },
        { label: "Help", icon: <HelpCircle className="w-4 h-4" /> },
        { label: 'Logout', icon: <LogOut className="w-4 h-4" /> , onclick:handleSignout }
    ]
    const variants: Variants = {
        hidden: {
            height: '0px',
            opacity: 0
        },
        visible: {
            height: 'auto',
            opacity: 1,
            transition: { staggerChildren: 0.05, when: 'beforeChildren' }
        }
    }
    const itemsVariants: Variants = {
        hidden: {
            opacity: 0,
            y: -10
        },
        visible: {
            opacity: 1,
            y: 0
        }
    }
    return (
        <motion.ul variants={variants} initial='hidden' animate="visible" exit={'hidden'} className="flex flex-col gap-3 font-normal text-neutral-300 text-sm">
            {
                buttons.map((b, index) => {
                    return (
                        <motion.li onClick={b.onclick} variants={itemsVariants} key={index} className="flex items-center gap-2 hover:bg-neutral-700 p-2 rounded-md cursor-pointer transition-colors duration-200">
                            {b.icon}
                            {b.label}
                        </motion.li>
                    )
                })
            }
        </motion.ul>
    )
}

export const NavMenu = () => {
    const [openMenu , setOpenMenu] = useAtom(openMenuAtom)
    const [open, setOpen] = useState(false)
    const [openChat , setOpenchat] = useAtom(openChatAtom)
    
    const { user } = useUser()
    const variants = {
        visible: {
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.1
            },
        },
        hidden: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.5 , 
                delay:0.2,
            }
        }
    }
   
    const handleOpenChat  = ()=>{
        setOpenchat(true)
        setOpenMenu(false)
    }
    
    
    return (
        <AnimatePresence>
            {openMenu && <motion.div variants={variants} initial={'hidden'} animate={'visible'} exit={"hidden"} className="fixed top-16 z-[2500] h-fit max-h-screen w-fit max-w-full font-semibold overflow-hidden text-md sm:text-xl right-0 overflow-y-auto  flex flex-col gap-3 p-4 text-nowrap text-ellipsis  sm:p-6 rounded-xl dark:bg-neutral-800 bg-white shadow-lg">
                {user?.emailAddresses[0].emailAddress === "mahmoud7samirr@gmail.com" &&<Link href={'/dashboard'} className="flex items-center gap-2 p-3"><LayoutDashboard/>Dashboard</Link>}
                <button onClick={handleOpenChat} className="flex items-center gap-2 hover:bg-neutral-700 p-3 rounded-md transition-colors duration-200">
                    <MessageCircle className="w-5 h-5" />
                    Contact Me
                </button>
                <Link href='/about' className="flex items-center gap-2 hover:bg-neutral-700 p-3 rounded-md transition-colors duration-200">
                    <User className="w-5 h-5" />
                    About Me
                </Link>
                <Link href='/blog' className="flex items-center gap-2 hover:bg-neutral-700 p-3 rounded-md transition-colors duration-200">
                    <FileText className="w-5 h-5" />
                    Blog
                </Link>
                <SignedIn>
                    <button className="w-full flex items-center justify-between hover:bg-neutral-700 p-3 rounded-md transition-colors duration-200" onClick={() => { setOpen(!open) }}>
                        <span className="flex items-center gap-2 max-w-full overflow-hidden text-nowrap text-ellipsis">
                            <User className="w-5 h-5" />
                            {user?.emailAddresses[0].emailAddress}
                        </span>
                        <ChevronRight className={cn('transition-all duration-300', open ? "rotate-90" : "rotate-0")} />
                    </button>
                    <AnimatePresence>
                        {open && <UserAccordin />}
                    </AnimatePresence>
                </SignedIn>
                <SignedOut>
                    <Link onClick={()=>{setOpenMenu(false)}} href={'/sign-in'} className="flex items-center gap-2 hover:bg-neutral-700 p-3 rounded-md transition-colors duration-200">
                        <LogOut className="w-5 h-5" />
                        Login
                    </Link>
                </SignedOut>
            </motion.div>}
        </AnimatePresence>
    )
}

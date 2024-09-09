'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useMemo, useRef } from 'react'
import Logo from "@/assets/logo.svg"
import { cn } from '@/ui/utils/cn'
import { Button } from './Button'
import ThemeController from './components/themeController'
import { AnimatePresence, motion } from "framer-motion"
import { usePathname, useRouter } from 'next/navigation'
import useScrollDown from '@/ui/utils/yScroll'
import {useMediaQuery} from "react-responsive"
import { Menu } from 'lucide-react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import UserButton from './components/userButton'
import {Josefin_Sans} from "next/font/google"
import { useAtom } from 'jotai'
import { openChatAtom, openMenuAtom } from '@/clientActions/States'
import { NavMenu } from './navMenu'
import { UseOutSideClick } from './components/OutsideClick'
import MenuButton from './components/menuButton'
const spaceFont = Josefin_Sans({subsets:['vietnamese']})

const Navbar = () => {
    const [, setOpenChat]  = useAtom(openChatAtom) ; 
    const pathname = usePathname()
    const [selected, setSelected] = useState<string | null>(null)
    const y : number = useScrollDown()
    const [ ,setOpenMenu] = useAtom(openMenuAtom) 
    const isMobile = useMediaQuery({
        'maxWidth' : "720px"
    })
    const router = useRouter()

    const buttons = useMemo(() => [
        {
            href: '#',
            label: 'Contact Me',
            click : ()=>{setOpenChat(true)}
        },
        {
            href: '/about',
            label: 'About Me',
        },
        {
            href: '/blog',
            label: 'Blog',
        },
    ], [setOpenChat])

    const menuRef = useRef<HTMLDivElement>(null)
    const toggleMenu = ()=>{
        setOpenMenu(prev=>!prev)
    }
    UseOutSideClick(menuRef ,()=>{setOpenMenu(false)})
    if(pathname.startsWith('/dashboard')){
        return null
    }
    return (
        <nav className={cn('navbar flex justify-between transition duration-300 ease-linear items-center sm:h-20 h-16 right-1/2 translate-x-1/2 gap-10 fixed rounded-3xl px-10  sm:px-2 z-[1600] top-1  w-fit max-w-full' , y>0 && "shadow-md  bg-[#E2DFD0] dark:bg-[#1E201E]" , isMobile && "w-full rounded-none top-0 justify-between")}>
            <motion.div whileHover={{ scale:1.2 }} whileTap={{scale:1.1}} transition={{type:'spring' , damping : 10 , stiffness:300 ,bounce:0 , mass:0.5}} className="logo">
                <Link href={'/'} className={cn(' mx:text-sm lg:text-2xl flex items-center  w-fit h-fit')}>
                    <Image src={Logo || ""} width={isMobile? 32 : 36 }  height={isMobile ?32 : 36} className='text-white object-cover min-h-[24px] min-w-[24px]' alt='profile logo' />
                    <span className={cn('md:block hidden dark:text-[#E2DFD0] text-[#31363F] font-semibold' ,spaceFont.className )}>Samir</span>
                </Link>
            </motion.div>
            {
                isMobile && 
                    <div ref={menuRef} className="flex items-center gap-5">
                        <ThemeController isMobile={isMobile}/>
                        <MenuButton/>
                        <NavMenu/>
                    </div>
            }
            {!isMobile && <>
            <ul className='flex items-center text-sm   dark:text-content justify-center relative'>
                {buttons.map((b, index) => (
                    <li
                        onMouseEnter={() => setSelected(b.label)}
                        onMouseLeave={() => setSelected(null)}
                        className='relative hover:text-white transition-all duration-300 ease-linear px-3 py-2 group'
                        key={index}
                    >
                        <Link href={b.href} onClick={b.click} className='relative z-10 text-nowrap md:text-sm text-xs'>
                            {b.label}
                        </Link>
                        {!isMobile && <AnimatePresence>
                            {selected === b.label && (
                                    <motion.span
                                        layoutId='index'
                                        className='absolute inset-0 dark:bg-secondary bg-primary  border dark:border-pink-700 border-neutral-700 rounded-xl z-[-1]'
                                        initial={{ opacity: 0 }}
                                    animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                    />
                                )}
                        </AnimatePresence>}
                    </li>
                ))}
            </ul>
            <div className="nav-buttons flex items-center gap-3">
                    <ThemeController />
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <Button onClick={()=>{router.push("/sign-in")}}>Login</Button>
                    </SignedOut>
            </div>
            </>}

        </nav>
    )
}

export default Navbar

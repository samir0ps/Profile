import React, { FormEvent, useRef, useState } from 'react'
import { AnimatePresence, motion, Variants } from "framer-motion"
import { ChevronDown, ChevronRight, Moon, Sun } from "lucide-react"
import { useTheme } from 'next-themes'
import { cn } from '@/ui/utils/cn'
import { UseOutSideClick } from './OutsideClick'

type ThemeOption = {
  theme: string;
  value: string;
};

const ThemeController = ({isMobile} :{isMobile?:boolean}) => {
    const [openTheme, setOpenTheme] = useState(false)
    const shadowAnimations : Variants= {
        open : {
            transition: { delay:0.35} ,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"

        } , 
        close : {
            boxShadow:'none'
        }
    }
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
    
    const { setTheme, theme } = useTheme()

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        setTheme(value)
    }

    const themes: ThemeOption[] = [
        { theme: 'Light', value: 'light' },
        { theme: 'Dark', value: 'dark' },
        { theme: 'System', value: 'system' }
    ]
    const itemVariants = {
        visible: {
          opacity: 1,
          y:0,
          transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        hidden: { opacity: 0,y:20,  transition: { duration: 0.2 } }
      };
      const ref = useRef<HTMLDivElement>(null)
      UseOutSideClick(ref ,()=>{
        setOpenTheme(false)
      })
    return (
        <div 
            ref={ref}
            className='relative overflow-visible'
        >
            <motion.button
                whileTap={{scale:0.9}}
                transition={{type:'spring' , damping:24 , stiffness:300 , duration:0.2 }}             
                onClick={()=>{setOpenTheme(!openTheme)}}
                className={cn('flex items-center group  transition-colors duration-300  rounded-full justify-center '  , openTheme&& "text-secondary")} aria-haspopup="true" aria-expanded={openTheme}>
                {isMobile ? <>
                    {theme === "light"  ? <Sun/> : <Moon/>}
                </> 
                :
                "Theme"} <span className={cn(' transition-transform' , openTheme && "rotate-180")}><ChevronDown width={20} height={20}/></span>
            </motion.button>
            <AnimatePresence>
                {openTheme && (
                    <motion.div initial='close' animate="open" exit={'close'}  variants={shadowAnimations} className=' absolute right-1/2 translate-x-1/2 rounded-[20px] top-full'
                        
                    >

                        <motion.div 
                            initial="hidden" 
                            animate="visible" 
                            exit="hidden" 

                            variants={variants} 
                            className={cn('w-32 h-fit shadow-lg mt-1 p-4 arrow-container  rounded z-[100]   dark:bg-primary bg-white ')}
                        >
                            <ul className='text-start  flex flex-col text-sm dark:text-neutral-100 text-neutral-900 gap-3 pl-2'>
                                {themes.map((t) => (
                                    <motion.li 
                                        variants={itemVariants}
                                        whileHover={theme !== t.value ? {x:3   , opacity:0.8} : {x:0 , opacity:1}}
                                        key={t.value}
                                        className={cn(
                                            ' relative w-full text-start flex items-center',
                                            theme === t.value && "text-[#F11A7B]"
                                        )}
                                    >
                                        {theme === t.value && (
                                            <motion.div layoutId='idx' transition={{type:'spring' , damping:15 ,stiffness:200,bounce:0}} className='absolute right-full '>
                                                <ChevronRight color='#F11A7B' height={20} width={20} />
                                            </motion.div>
                                        )}
                                        <label 
                                            htmlFor={`${t.value}-theme`} 
                                            className='flex cursor-pointer text-md items-center justify-start'
                                        >
                                            {t.theme}
                                        </label>
                                        <input 
                                            onChange={handleChange} 
                                            checked={theme === t.value} 
                                            type="radio" 
                                            name="theme" 
                                            value={t.value} 
                                            className='hidden' 
                                            id={`${t.value}-theme`} 
                                        />
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ThemeController 
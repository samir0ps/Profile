'use client'
import React from 'react'
import { motion, useTransform, useSpring, useScroll } from 'framer-motion'
import Wave from '../ui/components/wave'
import Shapes from '../ui/components/shapes'
import {Josefin_Sans} from "next/font/google"
import { cn } from '@/ui/utils/cn'
import { separateLetters } from '@/ui/utils/letters'
const spaceFont = Josefin_Sans({subsets:['latin']})

const Main: React.FC = () => {
  

  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 1 }
    })
  }

  const wordReveal = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.3, duration: 1 }
    })
  }

  return (
    <div 
      className={cn("min-h-screen bg-gradient-to-br from-white via-zinc-300 to-neutral-300 dark:from-neutral-900 dark:via-stone-800 dark:to-neutral-950 flex items-center justify-center px-4 relative overflow-hidden" , spaceFont.className)}
    >
      <Shapes />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, staggerChildren: 0.4 }}
        className="text-center z-10"
      >
        <motion.h1 
          className="text-6xl sm:text-7xl md:text-9xl lg:text-[9rem] font-extrabold mb-3 text-orange-500 dark:text-purple-400"
        >
          <motion.span
            initial="hidden"
            animate="visible"
            variants={wordReveal}
            custom={0}
          >
            {separateLetters('Mahmoud').map((letter, index) => (
              <motion.span
                key={index}
                initial="hidden"
                animate="visible"
                variants={textReveal}
                custom={index}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>
        <motion.h1 
          className="text-6xl sm:text-7xl md:text-9xl lg:text-[9rem] font-extrabold mb-5 text-red-500 dark:text-blue-300"
        >
          <motion.span
            initial="hidden"
            animate="visible"
            variants={wordReveal}
            custom={1}
          >
            {separateLetters('Samir').map((letter, index) => (
              <motion.span
                key={index}
                initial="hidden"
                animate="visible"
                variants={textReveal}
                custom={index}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>
        <motion.h2
          className="text-2xl sm:text-3xl md:text-3xl text-center font-bold text-pink-600 dark:text-violet-400 mb-2"
        >
          {['Full', 'Stack', 'Developer.'].map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              initial="hidden"
              animate="visible"
              variants={wordReveal}
              custom={wordIndex + 2}
              className="inline-block mr-2"
            >
              {separateLetters(word).map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  initial="hidden"
                  animate="visible"
                  variants={textReveal}
                  custom={letterIndex}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.h2>
      </motion.div>

      <div className="h-16 bottom-0 absolute left-0 w-full bg-gradient-to-t from-neutral-300 dark:from-neutral-800 z-[1]"></div>
      <Wave />
      
    </div>
  )
}

export default Main

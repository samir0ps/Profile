'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import typescript from "@/assets/logos/typescript.svg"
import react from "@/assets/logos/react.svg"
import next from "@/assets/logos/nextjs.svg"
import svelte from "@/assets/logos/svelte.svg"
import postgres from "@/assets/logos/postgresql.svg"
import tailwind from "@/assets/logos/tailwind.svg"
import python from "@/assets/logos/python.svg"
import { separateLetters } from '@/ui/utils/letters'
import Tooltip from '@/ui/utils/tooltip'
import { useTheme } from 'next-themes'

const Skills = () => {
  const { theme } = useTheme()
  const skillsList = useMemo(() => [
    { name: 'TypeScript', logo: typescript, description: '<p class="tooltip-p">Typed <span class="tooltip-span">JavaScript</span> at Any Scale.</p>' },
    { name: 'React', logo: react, description: '<p class="tooltip-p">A JavaScript library for building user interfaces.</p>' },
    { name: 'Next.js', logo: next, description: '<p class="tooltip-p">The React Framework for Production.</p>' },
    { name: 'Svelte', logo: svelte, description: '<p class="tooltip-p">Cybernetically enhanced web apps.</p>' },
    { name: 'PostgreSQL', logo: postgres, description: '<p class="tooltip-p">A powerful, open-source object-relational database system.</p>' },
    { name: 'Tailwind CSS', logo: tailwind, description: '<p class="tooltip-p">A utility-first CSS framework for rapid UI development.</p>' },
    { name: 'Python', logo: python, description: '<p class="tooltip-p">A programming language that lets you work quickly and integrate systems more effectively.</p>' },
  ], [])

  const header = useMemo(() => separateLetters("My Expertise"), [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const letterVariants = {
    hidden: { y: 50, scale: 0.8, opacity: 0 },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: '100%',
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 300,
        duration: 1,
        delay: 0.5,
      },
    },
  }

  return (
    <div className="relative min-h-[50vh]  py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          className='flex items-center p-6 relative overflow-hidden h-max mb-4 font-bold justify-center mx-auto w-fit'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={containerVariants}
        >
          {header.map((l, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="text-4xl text-teal-500 dark:text-emerald-400 font-extrabold text-center"
            >
              {l}
            </motion.span>
          ))}
          
        </motion.h2>
        <motion.p
          className="text-center text-xl mb-10 text-gray-700 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          With a strong foundation in modern web technologies, I specialize in creating efficient, scalable, and user-friendly applications. My expertise spans front-end frameworks, back-end development, and responsive design, allowing me to deliver comprehensive solutions for diverse project needs.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillsList.map((item, index) => (
            <Tooltip content={item.description} key={index} placement="top">
              <motion.div
              initial={{scale:0 , y:50 , opacity:0}}
              whileInView={{scale:1  , opacity:1 , y:0}}
              viewport={{once:true}}
              transition={{delay:0.1*index , type:'spring' , damping:10 , stiffness:300 ,bounce:0 }}
              >
                <div className="flex items-center justify-center">
                  <Image src={item.logo} alt={item.name} width={60} height={60} loading='lazy' className={`${item.name === "Next.js" ? 'dark:invert' : ""} transition-transform duration-300 hover:scale-110`} />
                </div>
                <p className="mt-2 text-center text-sm font-medium">{item.name}</p>
              </motion.div>
            </Tooltip>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 blur-3xl bg-teal-500 dark:bg-emerald-500 opacity-20 rounded-full z-0 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ delay: 1, duration: 4, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-800 dark:bg-teal-600 opacity-20 rounded-full z-0 blur-2xl"
        animate={{
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-blue-700 dark:bg-cyan-400 opacity-10 rounded-full z-0 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </div>
  )
}

export default Skills

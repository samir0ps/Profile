import React from 'react'
import { motion, Variants } from "framer-motion"

const ScrollDown = () => {
  const chevronVariants: Variants = {
    initial: { opacity: 0, y: -5, pathLength: 0 },
    animate: { opacity: 1, y: 0, pathLength: [0 ,1], transition: {duration:1 } },
  }

  const containerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 1,
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
      },
    },
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
      </defs>
      <motion.g variants={containerVariants} initial="initial" animate="animate">
        <motion.path
          variants={chevronVariants}
          d="M7 6L12 11L17 6"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          variants={chevronVariants}
          d="M7 10L12 15L17 10"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          variants={chevronVariants}
          d="M7 14L12 19L17 14"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  )
}

export default ScrollDown
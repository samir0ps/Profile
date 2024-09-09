'use client'
import {motion} from "framer-motion"
const Shapes = () => {
  return (
    <>
        <motion.div
          animate={{
            scale: [1, 1.2, 0.9, 1.1, 1],
            rotate: [0, 15, -15, 10, 0],
            borderRadius: ["20%", "50%", "30%", "40%", "20%"],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0
          }}
          className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-[20%] opacity-70 blur-sm"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 0.8, 1.2, 1],
            rotate: [0, -20, 20, -10, 0],
            borderRadius: ["0%", "40%", "0%", "30%", "0%"],
          }}
          transition={{
            duration: 22,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 0.9, 1],
            repeat: Infinity,
            repeatDelay: 0
          }}
          className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-tl from-cyan-300 to-blue-500 rounded-none opacity-50 blur-md"
        />
        <motion.div
          animate={{
            y: [0, -40, 20, -20, 0],
            x: [0, 30, -20, 10, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Infinity,
            repeatDelay: 0
          }}
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-yellow-300 to-red-500 rounded-full opacity-60 blur-sm"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 0.8, 1.2, 1],
            rotate: [0, 45, -45, 20, 0],
            borderRadius: ["50%", "20%", "50%", "30%", "50%"],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 1],
            repeat: Infinity,
            repeatDelay: 0
          }}
          className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-gradient-to-bl from-green-300 to-teal-500 rounded-full opacity-40 blur-md"
        />
    </>
  )
}

export default Shapes
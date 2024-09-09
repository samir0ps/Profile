'use client'
import { motion } from "framer-motion"

const Shapes = () => {
  const commonTransition = {
    repeat: Infinity,
    repeatDelay: 0,
    ease: "easeInOut",
  }

  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a00e0" />
          <stop offset="100%" stopColor="#8e2de2" />
        </linearGradient>
        <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00c6ff" />
          <stop offset="100%" stopColor="#0072ff" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f857a6" />
          <stop offset="100%" stopColor="#ff5858" />
        </linearGradient>
        <linearGradient id="gradient4" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7f00ff" />
          <stop offset="100%" stopColor="#e100ff" />
        </linearGradient>
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f260" />
          <stop offset="100%" stopColor="#0575e6" />
        </linearGradient>
      </defs>

      <motion.path
        d="M0,50 Q50,0 100,50 T200,50"
        fill="none"
        stroke="url(#gradient1)"
        strokeWidth="10"
        animate={{
          d: [
            "M0,50 Q50,0 100,50 T200,50",
            "M0,100 Q50,150 100,100 T200,100",
            "M0,75 Q50,25 100,75 T200,75",
          ],
        }}
        transition={{ ...commonTransition, duration: 25 }}
        style={{ opacity: 0.8, filter: 'blur(3px)' }}
      />

      <motion.circle
        cx="70%"
        cy="30%"
        r={40}
        fill="url(#gradient3)"
        
        
        transition={{ ...commonTransition, duration: 30 }}
        style={{ opacity: 0.7, filter: 'blur(4px)' }}
      />


      <motion.path
        d="M 20 80 C 40 10, 65 10, 80 80 S 150 150, 180 80"
        fill="none"
        stroke="url(#gradient4)"
        strokeWidth="8"
        animate={{
          d: [
            "M 20 80 C 40 10, 65 10, 80 80 S 150 150, 180 80",
            "M 20 80 C 40 150, 65 150, 80 80 S 150 10, 180 80",
            "M 20 80 C 70 20, 95 20, 110 80 S 160 140, 180 80",
            "M 20 80 C 40 10, 65 10, 80 80 S 150 150, 180 80",
          ],
        }}
        transition={{ ...commonTransition, duration: 40 }}
        style={{ opacity: 0.5, filter: 'blur(6px)' }}
      />

      <motion.rect
        x="10%"
        y="60%"
        width="80"
        height="80"
        fill="url(#gradient2)"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ ...commonTransition, duration: 20 }}
        style={{ opacity: 0.6, filter: 'blur(2px)' }}
      />

      <motion.ellipse
        cx="80%"
        cy="70%"
        rx={60}
        ry={40}
        fill="none"
        stroke="url(#gradient1)"
        strokeWidth="6"
        
        transition={{ ...commonTransition, duration: 45 }}
        style={{ opacity: 0.6, filter: 'blur(2px)', transformOrigin: 'center' }}
      />

    </svg>
  )
}

export default Shapes
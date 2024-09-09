'use client'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import { ReactNode } from 'react'
import { motion } from "framer-motion"

const ScrollEffect = ({ children }: { children: ReactNode }) => {
    const { scrollYProgress } = useScroll()
    const spring = useSpring(scrollYProgress, {
        damping: 30,
        stiffness: 300,
        mass: 0.5
    })
    const y = useTransform(spring, [0, 1], [100, -100])
    const opacity = useTransform(spring, [0, 0.5, 1], [0.7,1, 1])
    const scale = useTransform(spring, [0  , 0.5, 1], [0.8,1, 1])

    return (
        <motion.div
            style={{
                y,
                opacity,
                scale,
                transition: 'all 0.2s ease-out'
            }}
        >
            {children}
        </motion.div>
    )
}

export default ScrollEffect
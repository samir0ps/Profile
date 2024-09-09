'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';
import MyImage from "@/assets/mine.jpg"

export default function About() {
    return (
      <div className="container mx-auto px-4 py-16 pt-24">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold bg-neutral-500/30 dark:bg-teal-700/30 w-fit mx-auto p-4 rounded-tr-[2.5rem] rounded-bl-[2.5rem] text-neutral-800 dark:text-teal-300 border border-neutral-500 dark:border-teal-300 text-center mb-12"
        >
          About Me
        </motion.h1>
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-12 lg:space-y-0 lg:space-x-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-300 to-cyan-300 dark:from-teal-600 dark:to-cyan-600 rounded-tl-[100px] rounded-br-[100px] blur-md transform -rotate-6"></div>
            <Image
              src={MyImage}
              alt="Profile picture"
              width={350}
              height={350}
              className="rounded-tl-[80px] rounded-br-[80px] border-4 border-white dark:border-gray-800 shadow-2xl relative z-10"
            />
          </motion.div>
          <div className="max-w-2xl space-y-8">
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-2xl font-semibold mb-6 text-neutral-700 dark:text-teal-300"
            >
              Hello! I&apos;m Mahmoud Samir, a passionate Full Stack Developer from Egypt with a strong focus on creating innovative digital solutions.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              With 5 years of experience in web development, I specialize in building scalable, high-performance applications using technologies like ReactJS, NodeJS, NextJS, and TypeScript. I&apos;m constantly evolving, working on projects like real-time chat apps, eCommerce platforms, and blogs.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              I love exploring new frameworks and technologies, and my work reflects a commitment to optimizing performance while creating engaging user experiences. Whether it&apos;s SvelteKit, Supabase, or TailwindCSS, I&apos;m always pushing my limits.
            </motion.p>
          </div>
        </div>
      </div>
    );
}

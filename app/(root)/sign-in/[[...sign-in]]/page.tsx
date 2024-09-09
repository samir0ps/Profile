'use client'
import { motion, Variants } from "framer-motion"

import { SignIn } from "@clerk/nextjs"
import Link from "next/link"
import { useState } from "react"

const Page = () => {

  const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: { 
          opacity: 1,
          transition: {
              staggerChildren: 0.1
          }
      }
  }

  const itemVariants: Variants = {
      hidden: { y: 20, opacity: 0 },
      visible: { 
          y: 0, 
          opacity: 1,
          transition: {
              type: "spring",
              stiffness: 100
          }
      }
  }

  const formVariants: Variants = {
      hidden: { 
          clipPath: "inset(10% 50% 90% 50% round 10px)",
          transition: { duration: 0.5 }
      },
      visible: {
          clipPath: 'inset(0% 0% 0% 0% round 20px)',
          transition: { duration: 0.5, delay: 0.5 }
      }
  } 
    const [animationEnded , setAnimationEnded] = useState(false)

  return (
      <div className='flex flex-col-reverse border-box py-20 md:flex-row min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 dark:from-neutral-700 dark:via-slate-500 dark:to-gray-500'>
          <motion.div 
              className='md:w-1/2 flex items-center justify-center p-12 dark:text-neutral-100 text-neutral-800'
              initial="hidden"
              animate="visible"
              variants={containerVariants}

          >
              <div>
                  <motion.h1 variants={itemVariants} className='text-5xl font-bold mb-6'>Welcome to My Profile</motion.h1>
                  <motion.p variants={itemVariants} className='text-2xl mb-8'>Discover my skills and experiences:</motion.p>
                  <motion.ul variants={containerVariants} className='text-xl space-y-4'>
                      {['Web Development', 'UI/UX Design', 'Data Analysis', 'Project Management'].map((skill, index) => (
                          <motion.li 
                              key={index} 
                              variants={itemVariants}
                              className='flex items-center'
                          >
                              <span className='mr-2'>🚀</span> {skill}
                          </motion.li>
                      ))}
                  </motion.ul>
              </div>
          </motion.div>
          <div className='w-full md:w-1/2 flex flex-col gap-5 items-center justify-center '>
                    <div 
                        className=' overflow-hidden rounded-2xl'
                        style={animationEnded ?{
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                        } : {}}
                    >
                        <motion.div onAnimationComplete={()=>{setAnimationEnded(true)}} initial="hidden" animate="visible" variants={formVariants} >
                            <SignIn />
                        </motion.div>
                    </div>
            <p className="text-neutral-800 dark:text-neutral-100 space-x-1">Don&apos;t have an account yet!<Link className="text-blue-500 dark:text-pink-200 text-sm ml-1 hover:underline" href={'/sign-up'}>SignUp</Link></p>
          </div>
      </div>
  )
}

export default Page
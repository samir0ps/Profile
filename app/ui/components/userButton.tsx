import { useClerk, useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { UserCircle, Briefcase, HelpCircle, LogOut, LayoutDashboard } from 'lucide-react'
import { UseOutSideClick } from './OutsideClick'
import { useRouter } from 'next/navigation'

const UserButton: React.FC = () => {
    const { user, isLoaded } = useUser()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const { signOut } = useClerk()
    const router = useRouter()

    const toggleMenu = () => setIsOpen(!isOpen)

    const menuVariants = {
      hidden: { clipPath: 'circle(0% at 100% 0%)', opacity: 0, scale: 0.9 },
      visible: {
        clipPath: 'circle(150% at 100% 5%)',
        opacity: 1,
        scale: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.1
           ,
           duration:0.5
        }
      },
    }

    const itemVariants = {
      hidden: { opacity: 0, x: 20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 300, damping: 10 }
      },
    }

    const handleSignout = () => {
        setIsOpen(false)
        signOut(() => { router.push('/') })
    }

    UseOutSideClick(menuRef, () => { setIsOpen(false) })

    if (!isLoaded || !user) return null

    const isAdmin = user.emailAddresses[0].emailAddress === 'mahmoud7samirr@gmail.com'

    return (
      <div className="relative" ref={menuRef}>
        <motion.button
          onClick={toggleMenu}
          className="flex items-center rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Image width={40} height={40}  src={user.imageUrl} alt="user image" priority className="min-w-10 min-h-10 rounded-full p-1" />
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="absolute right-0 w-fit rounded-3xl shadow-xl overflow-hidden bg-white dark:bg-neutral-800 text-neutral-800 dark:text-content"
            >
              <motion.ul className="py-2">
                {[
                    ...(isAdmin ? [{ name: 'Dashboard', icon: LayoutDashboard, onclick: () => router.push('/dashboard') }] : []),
                    { name: 'Get Free Website', icon: UserCircle },
                    { name: 'Get Free consultant', icon: Briefcase },
                    { name: 'Help', icon: HelpCircle },
                    { name: 'Logout', icon: LogOut, danger: true, onclick: handleSignout },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    onClick={() => {
                        item.onclick?.()
                        setIsOpen(false)
                    }}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-200 ${
                      item.danger ? 'text-red-500 hover:text-red-400' : 'hover:text-secondary'
                    } flex items-center`}
                  >
                    <motion.span whileHover={{x:10}} className='flex gap-1 text-nowrap w-full'>
                      {item.icon && <motion.div whileHover={{ rotate: 20 }}><item.icon className="mr-2" size={18} /></motion.div>}
                      {item.name}
                    </motion.span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
}

export default UserButton
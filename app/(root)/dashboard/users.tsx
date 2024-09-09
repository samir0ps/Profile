'use client'
import { UseOutSideClick } from '@/app/ui/components/OutsideClick'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Users, TrendingUp, Settings, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, ReactNode, useRef, memo } from 'react'

interface TabProps {
  name: string
  icon: ReactNode
}

interface UserCardProps {
    email: string
    imageUrl: string
}

interface StatCardProps {
  title: string
  value: string
  increase: boolean
  icon: ReactNode
}

interface SettingToggleProps {
  title: string
  icon: ReactNode
}

interface ReportCardProps {
  title: string
  status: 'positive' | 'neutral' | 'negative'
  icon: ReactNode
}

type UserType = {
    email: string,
    imageUrl: string
}

const Dashboard = memo(({users}: {users: UserType[]}) => {
  const tabs: TabProps[] = [
    { name: 'users', icon: <Users /> },
    { name: 'analytics', icon: <TrendingUp /> },
    { name: 'settings', icon: <Settings /> },
    { name: 'reports', icon: <AlertCircle /> },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black p-8"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-extrabold text-neutral-400 mb-12 text-center">
          Samir's Dashboard
        </h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-xl rounded-3xl shadow-2xl p-10 border-2 border-white border-opacity-20"
        >
            <div>
              <h2 className="text-4xl font-bold text-neutral-400 mb-8 flex items-center">
                <Users className="mr-4 text-neutral-400" size={40} /> User Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {users.map(user => (<UserCard key={user.email} email={user.email} imageUrl={user.imageUrl} />))}
              </div>
            </div>
        </motion.div>
      </div>
    </motion.div>
  )
})

const UserCard: React.FC<UserCardProps> = memo(({ email, imageUrl }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const handleOpeningOptions = () => {
    if(email === "mahmoud7samirr@gmail.com") return 
    setOpenOptions(prev => !prev)
  }
  const variants: Variants = {
    hidden: {
      opacity: 0,
      height: "0px",
      width: 20
    },
    visible: {
      opacity: 1,
      height: "100px",
      width: 320,
      transition: { staggerChildren: 0.3, delayChildren: 0.3 }
    }
  }
  const itemsVariant: Variants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0
    }
  }
  const ref = useRef<HTMLDivElement>(null)
  UseOutSideClick(ref, () => setOpenOptions(false))
  const router = useRouter()

  return (
    <div
      ref={ref}
      onClick={handleOpeningOptions}
      className='relative'
    >
      <AnimatePresence>
        {openOptions && (
          <motion.div 
            variants={variants} 
            initial='hidden' 
            animate='visible' 
            exit='hidden'  
            className="absolute overflow-hidden z-[1600] bottom-full left-0 bg-neutral-800 mb-1 shadow-xl shadow-black/30 p-4 rounded-xl text-white text-start flex flex-col gap-3 justify-between"
          >
            <motion.button 
              onClick={() => router.push(`/dashboard/messages?user=${email}`)} 
              variants={itemsVariant} 
              className='w-fit hover:text-blue-300 transition-colors duration-300'
            >
              Send Message
            </motion.button>
            <motion.button 
              variants={itemsVariant} 
              className='w-fit text-red-400 hover:text-red-500 transition-colors duration-300'
            >
              Ban user
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-black border-2 flex items-center relative border-neutral-800 border-opacity-40 rounded-2xl p-6 cursor-pointer"
      >
        <img src={imageUrl} alt={email} className="w-12 h-12 rounded-full mr-4 border-2 border-white" />
        <div className='flex-1 flex overflow-hidden'>
          <p className="text-sm font-bold text-neutral-300 overflow-hidden text-nowrap text-ellipsis w-fit max-w-3/4">{email}</p>
        </div>
      </motion.div>
    </div>
  )
})

UserCard.displayName = 'UserCard'
Dashboard.displayName = 'Dashboard'

export default Dashboard

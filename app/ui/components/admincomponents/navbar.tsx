'use client'
import Tooltip from '@/ui/utils/tooltip';
import { motion } from 'framer-motion';
import { HomeIcon, MessageSquareIcon, FolderIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="fixed bottom-3 left-0 flex justify-center items-center w-full">
        <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
    >
        <motion.div whileHover={{scale:1.2}} className="flex px-5 py-3 justify-between w-fit gap-5 max-w-md bg-black border border-collapse border-neutral-700 rounded-full shadow-xl shadow-black/30">
        {navItems.map((item, index) => (
            <Link href={item.href || ''}>
              <Tooltip content={item.label}>
                  <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center w-9 h-9 bg-neutral-900 border border-neutral-700 rounded-full shadow-md cursor-pointer"
                  whileHover={{ scale: 1.24}}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  >
                      <item.icon className="text-xl text-neutral-400" />
                  </motion.div>
              </Tooltip>
            </Link>
        ))}
        </motion.div>
    </motion.div>
  </div>
  );
};

const navItems = [
  { icon: HomeIcon, label: 'Home' , href:'/' },
  { icon: MessageSquareIcon, label: 'Messages' , href:"/dashboard/messages" },
  { icon: FolderIcon, label: 'Projects' , href : "/dashboard/projects" },
  { icon: SettingsIcon, label: 'Settings' },
];

export default Navbar;
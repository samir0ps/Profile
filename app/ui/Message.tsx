    'use client'
    import React, { useEffect, useCallback } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { X } from 'lucide-react';
    import { useAtom } from 'jotai';
    import { messageAtom } from '@/clientActions/States';

    const Snackbar = () => {
      const [message, setMessage] = useAtom(messageAtom);

      const clearMessage = useCallback(() => setMessage(''), [setMessage]);

      useEffect(() => {
        if (message) {
          const timer = setTimeout(clearMessage, 5000);
          return () => clearTimeout(timer);
        }
      }, [message, clearMessage]);

      return (
        <div className='fixed right-1/2 bottom-5 min-w-3/4 translate-x-1/2 z-[1600]'> 
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="z-50"
              >
                <div className="bg-gray-900 text-white px-10 py-5 rounded-xl shadow-lg flex items-center space-x-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                  />
                  <p className="text-sm font-medium">{message}</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearMessage}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    export default Snackbar;

  import { useState, useRef, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { UseOutSideClick } from '@/app/ui/components/OutsideClick';


  interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
  }

  const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    UseOutSideClick(modalRef, onClose);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDelete = async () => {
      setIsSubmitting(true);
      try {
        await onDelete();
      } finally {
        setIsSubmitting(false);
        onClose();
      }
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-black rounded-lg p-6 w-full max-w-md shadow-xl"
            >
              <h2 className="text-2xl font-bold text-red-500 mb-4">Delete Confirmation</h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete <span className="font-semibold">this item</span>? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-gray-300 rounded-md transition-colors"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 bg-red-500/30 text-red-500 rounded-xl hover:bg-red-500/50 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  export default DeleteModal;

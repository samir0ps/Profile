  import React, { useRef, useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { X } from 'lucide-react';
  import { UseOutSideClick } from '@/app/ui/components/OutsideClick';

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (project: { title: string; description: string; imageUrl: string } | { title: string; description: string; imageUrl: string } ) => void;
    projectToEdit?: { title: string; description: string; imageUrl: string };
  }

  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, projectToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
      if (projectToEdit) {
        setTitle(projectToEdit.title);
        setDescription(projectToEdit.description);
        setImageUrl(projectToEdit.imageUrl);
      } else {
        setTitle('');
        setDescription('');
        setImageUrl('');
      }
    }, [projectToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({  title, description, imageUrl });
      setTitle('');
      setDescription('');
      setImageUrl('');
      onClose();
    };

    const ref = useRef<HTMLDivElement>(null);
    UseOutSideClick(ref, onClose);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                ref={ref} 
                className="w-full max-w-xl border border-gray-600 transform overflow-hidden rounded-3xl bg-neutral-900 p-8 text-left align-middle shadow-2xl shadow-black/30"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-indigo-400">{projectToEdit ? 'Edit Project' : 'Add New Project'}</h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:rotate-90 hover:text-red-400 transition duration-300"
                    onClick={onClose}
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-indigo-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      placeholder='Chatapp, Profile, etc...'
                      value={title}
                      autoComplete='off'
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-3 bg-neutral-800 text-white rounded-full border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 transition duration-300 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-indigo-300 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      placeholder='Write a brief about this project'
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-3 bg-neutral-800 text-white rounded-xl border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 transition duration-300 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-indigo-300 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      id="imageUrl"
                      placeholder='www.example.com'
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      autoComplete='off'
                      className="w-full px-3 py-3 bg-neutral-800 text-white rounded-full border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500 transition duration-300 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div className="mt-8">
                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-white text-neutral-700 font-semibold rounded-full hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500  duration-300 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
                    >
                      {projectToEdit ? 'Update Project' : 'Add Project'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  export default Modal;
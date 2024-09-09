'use client'
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, ChevronDown, DotSquareIcon, EllipsisVertical, Edit, Trash2, Home, LayoutDashboard } from 'lucide-react';
import Modal from './components/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '@/app/ui/loader';
import { UseOutSideClick } from '@/app/ui/components/OutsideClick';
import DeleteModal from './components/deleteModel';
import Link from 'next/link';

type Project = {
      id: string,
      title: string,
      description: string,
      imageUrl: string,
}

const ProjectsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [openDelete , setOpenDelete] = useState(false)
    const [openEdit ,setOpenEdit] = useState(false)
    const { data: projects, isLoading } = useQuery<Project[]>({
      queryKey: ['projects'],
      queryFn: async () => {
        const { data } = await axios.get('/api/admin/projects');
        return data;
      },
      refetchOnWindowFocus: false,
      retry: false,
    });

    const queryClient = useQueryClient();

    const CreateMutation = useMutation({
      mutationFn: async (projectData: { title: string, description: string, imageUrl: string }) => {
        const { data } = await axios.post('/api/admin/projects', projectData);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        setIsOpen(false);
      }
    });

    const DeleteMutation = useMutation({
      mutationFn: async (id: string) => {
        const { data } = await axios.delete(`/api/admin/projects?id=${id}` );
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        setOpenDelete(false);
      }
    });

    const UpdateMutation = useMutation({
      mutationFn: async (projectData: { id: string, title: string, description: string, imageUrl: string }) => {
        const { data } = await axios.put(`/api/admin/projects`, projectData);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        setIsOpen(false);
        setSelectedProject(null);
        setOpenEdit(false);
      }
    });

    const handleDelete = () => {
        DeleteMutation.mutateAsync(selectedProject?.id || '');
    };
    const onCloseDelete = ()=>{
        setOpenDelete(false)
    }
    const handleUpdate = (projectData: { title: string, description: string, imageUrl: string }) => {
        if(!selectedProject) return
        UpdateMutation.mutateAsync({...projectData, id: selectedProject.id});
    };

    const handleCreate = (projectData: { title: string, description: string, imageUrl: string }) => {
      CreateMutation.mutateAsync(projectData);
    };

    const handleSubmit = (projectData: { id?: string, title: string, description: string, imageUrl: string }) => {
      if (openEdit && projectData.id) {
        handleUpdate(projectData);
      } else {
        handleCreate(projectData);
      }
    };

    const filteredProjects = projects?.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const menuRef = useRef<HTMLDivElement>(null)
    UseOutSideClick(menuRef , ()=>{setOpenMenuId(null)})
    if (isLoading) return <Loader />;
    if (!projects) return <div className="text-center text-2xl text-red-500">Oops, error while fetching the projects</div>;
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6 md:mb-0">Project Hub</h1>
            <div className="flex items-center gap-4">
              <Link href="/">
                <motion.button
                  className="bg-white hover:bg-slate-300 text-neutral-700 border-none p-3 rounded-full cursor-pointer shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home size={20} />
                </motion.button>
              </Link>
              <Link href="/dashboard">
                <motion.button
                  className="bg-white hover:bg-slate-300 text-neutral-700 border-none p-3 rounded-full cursor-pointer shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LayoutDashboard size={20} />
                </motion.button>
              </Link>
              <motion.button
                onClick={() => { setIsOpen(true); setSelectedProject(null); setOpenEdit(false); }}
                className="bg-white hover:bg-slate-300 text-neutral-700 border-none py-3 px-6 text-lg rounded-full cursor-pointer flex items-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={20} /> Create Project
              </motion.button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <input
                className="w-full p-4 text-lg border-2 border-gray-700 rounded-full bg-neutral-800 text-white pl-12 focus:outline-none focus:border-blue-500 transition duration-300"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <AnimatePresence>
            {filteredProjects && filteredProjects.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-neutral-800 rounded-2xl flex flex-col justify-between p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                    layout
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                      <div ref={menuRef} className="relative">
                        <motion.button
                          className="rounded-full size-12 flex items-center justify-center bg-transparent hover:bg-slate-300/30"
                          whileHover={{ rotate: 90 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                        >
                          <EllipsisVertical />
                        </motion.button>
                        <AnimatePresence>
                          {openMenuId === project.id && (
                            <motion.div
                              className="absolute right-0 mt-2 w-48 bg-neutral-700 rounded-md shadow-lg z-10 overflow-hidden"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ul className="py-1">
                                <motion.li
                                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <button
                                    onClick={() => {
                                        setSelectedProject(project);
                                        setOpenEdit(true);
                                        setIsOpen(true);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-white"
                                  >
                                    <Edit size={16} className="inline mr-2" /> Edit
                                  </button>
                                </motion.li>
                                <motion.li
                                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <button
                                    onClick={() =>{
                                        setSelectedProject(project)
                                        setOpenDelete(true)
                                        }
                                    }
                                    className="block w-full text-left px-4 py-2 text-sm text-white"
                                  >
                                    <Trash2 size={16} className="inline mr-2" /> Delete
                                  </button>
                                </motion.li>
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <motion.button
                        className="text-blue-400 hover:text-blue-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                className="text-gray-500 text-center text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No Projects found!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => { setIsOpen(false); setSelectedProject(null); setOpenEdit(false); }}
          onSubmit={openEdit ? handleUpdate :handleSubmit}
          projectToEdit={openEdit ? selectedProject || undefined : undefined}
        />
        <DeleteModal 
            isOpen={openDelete}
            onClose={onCloseDelete}
            onDelete={handleDelete}
        />
      </div>
    );
};

export default ProjectsPage;
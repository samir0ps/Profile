'use client'
import {useQuery} from "@tanstack/react-query"
import axios from "axios"
import Loader from "../loader"
import Image from "next/image"

type Project = {
    id: string,
    title: string,
    imageUrl: string,
    description: string,
}

export default function Projects() {
    const { data: projects, isLoading, refetch } = useQuery<Project[]>({
        queryKey: ['projects'],
        queryFn: async () => {
          const { data } = await axios.get('/api/projects');
          return data;
        },
        staleTime: 1000, 
        refetchOnWindowFocus: true, 
        refetchInterval: 5000, 
        retry: false,
      });
      
    if (isLoading) return <div className="relative h-screen"><Loader/></div>

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 text-center mb-12">Some Of My Works</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects?.map((project) => (
                    <div 
                        key={project.id}
                        className="bg-white dark:bg-neutral-800 pb-3 rounded-tl-lg rounded-br-lg rounded-tr-[5rem] rounded-bl-[4rem] border border-gray-700 hover:border-blue-500 overflow-hidden shadow-lg hover:shadow-2xl transition-shodows duration-300 transform hover:-translate-y-2"
                    >
                        <div className="relative h-48 sm:h-64">
                            <Image 
                                width={320}
                                height={320}
                                src={project.imageUrl} 
                                className="object-cover w-full h-full"
                                loading="lazy"
                                alt={`${project.title} image`}
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{project.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
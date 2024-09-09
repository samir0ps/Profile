'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { MessageCircle, X, Send} from 'lucide-react';
import MyImage from "@/assets/mine.jpg"
import { UseOutSideClick } from './OutsideClick';
import Image from 'next/image';
import axios from "axios"
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import Loader from '../loader';
import { useAtom } from 'jotai';
import { openChatAtom } from '@/clientActions/States';
import {useQuery, useQueryClient} from "@tanstack/react-query"
import { socket } from '@/app/socket';
import { useReceivingMessage } from './useConnect';

interface Message {
    content: string;
    from: string;
    created_at: string;
}

export const handleSendingMessage = async(from:string , to : string , content : string) => {
    const {data} = await axios.post("/api/messages",{from , to , content})
    socket.emit('message', {from , to , content , created_at:new Date()})
    return data
}

const ChatPopup: React.FC = () => {
    const [isOpen, setIsOpen] = useAtom<boolean>(openChatAtom);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const {user , isLoaded} =  useUser()
    const queryClient = useQueryClient()
    useReceivingMessage(false)
    const { data: messages = [], isLoading } = useQuery<Message[]>({
        queryKey: ['messages'],
        queryFn: async () => {
            const { data } = await axios.get("/api/messages")
            return data
        },
        refetchOnWindowFocus: false,
        enabled:!!user && isOpen
    })

    useEffect(() => {
        if (isOpen && messages.length === 0 && !isLoading) {
            const timer = setTimeout(() => {
                queryClient.setQueryData(['messages'], [{
                    content: "Hi there! I'm Mahmoud Samir. How can I help you today?",
                    from: 'mahmoud7samirr@gmail.com',
                    created_at: String(new Date())
                }])
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, messages.length, queryClient, isLoading]);
    
    const toggleChat = useCallback((): void => setIsOpen(!isOpen), [isOpen, setIsOpen]);

    const sendMessage = useCallback(async (): Promise<void> => {
        if(!user?.emailAddresses[0].emailAddress || !inputMessage.trim()) return
        
        const newMessage: Message = { 
            content: inputMessage, 
            from: user.emailAddresses[0].emailAddress, 
            created_at: new Date().toISOString() 
        };
        
        setInputMessage('');
        setIsTyping(true);
        
        try {
            queryClient.setQueryData(['messages'], (oldData: Message[] | undefined) => 
                oldData ? [...oldData, newMessage] : [newMessage]
            )
            await handleSendingMessage(user.emailAddresses[0].emailAddress, "mahmoud7samirr@gmail.com", inputMessage)
            
            setTimeout(() => {
                setIsTyping(false);
                const responseMessage: Message = {
                    content: "Thank you for your message. I'll get back to you as soon as possible. In the meantime, feel free to check out my portfolio or schedule a call!",
                    from: "mahmoud7samirr@gmail.com",
                    created_at: new Date().toISOString()
                };
                queryClient.setQueryData(['messages'], (oldData: Message[] | undefined) => 
                    oldData ? [...oldData, responseMessage] : [responseMessage]
                )
            }, 2000);
        } catch (error) {
            console.error("Failed to send message:", error);
            setIsTyping(false);
        }
    }, [user, inputMessage, queryClient]);

    const getTimeString = useCallback((date: string): string => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, []);

    const ref = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    UseOutSideClick(ref, () => {
        setIsOpen(false)
    })

    useEffect(() => {
        if(isOpen && containerRef.current){
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isOpen])

    const variants: Variants = {
        hidden: {
            clipPath: 'circle(0% at 100% 100%)',
            opacity: 0,
        },
        visible: {
            clipPath: 'circle(150% at 100% 100%)',
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        },
        exit: {
            clipPath: 'circle(0% at 100% 100%)',
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    }

    if(user?.emailAddresses[0].emailAddress === 'mahmoud7samirr@gmail.com') return null

    return (
        <div ref={ref} >
            <motion.button
                className="fixed bottom-5 sm:block hidden right-5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full p-4 z-[2500] shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
            >
                <MessageCircle size={24} />
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{type:'spring' , damping: 24 , bounce:0 , stiffness:300}}
                    className="fixed right-0 bottom-0 sm:bottom-20 sm:right-5 z-[2500] w-full h-full sm:w-96 sm:h-[24rem] md:h-[32rem] bg-white dark:bg-neutral-950 sm:rounded-3xl shadow-xl overflow-hidden flex flex-col"
                >
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Image width={32} height={32} src={MyImage} alt="mahmoud" className="w-10 ring-2 ring-blue-300 h-10 rounded-full mr-3 object-cover" />
                        <div>
                        <h3 className="font-bold">Mahmoud Samir</h3>
                        <p className="text-xs">Web Developer</p>
                        </div>
                    </div>
                    <button onClick={toggleChat}><X /></button>
                    </div>
                    <div ref={containerRef}
                        className="flex-grow overflow-y-auto small-scroll p-4"
                        >
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-4 ${msg.from !== 'mahmoud7samirr@gmail.com' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block max-w-[70%] ${msg.from !== 'mahmoud7samirr@gmail.com' ? 'bg-indigo-100 dark:bg-neutral-800' : 'bg-gray-200 dark:bg-neutral-700'} rounded-lg p-3`}>
                                <p>{msg.content}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{getTimeString(msg.created_at)}</p>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="text-left mb-4">
                        <div className="inline-block bg-gray-200 dark:bg-neutral-700 rounded-lg p-3">
                            <p className="text-gray-500 dark:text-gray-400">Samir is typing...</p>
                        </div>
                        </div>
                    )}
                    </div>
                    <div className="p-4 border-t dark:border-neutral-800">
                        {isLoaded ? 
                        <>
                            <SignedIn>
                                    <div className="flex items-center mb-2">
                                        <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendMessage()}
                                        className="flex-grow border dark:border-neutral-600 rounded-l-lg p-2 bg-white focus:ring-2 ring-blue-300 transition dark:bg-neutral-700 text-gray-900 dark:text-white"
                                        placeholder="Type your message..."
                                        />
                                        <button onClick={sendMessage} className="bg-gradient-to-r from-purple-500 border border-neutral-700 border-l-0 to-indigo-600 text-white p-2 rounded-r-lg">
                                            <Send />
                                        </button>
                                    </div>
                            </SignedIn>
                            <SignedOut>
                                Please Sign in first <span onClick={()=>{setIsOpen(false)}} className='text-blue-300 underline hover:text-blue-400 transition duration-300'><SignInButton /></span>
                            </SignedOut>
                        </> : 
                            <Loader size='small'/>
                        }
                    
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatPopup;

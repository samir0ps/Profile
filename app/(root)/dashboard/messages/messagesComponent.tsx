'use client'
import React, { useEffect, useRef, useState, useCallback, Fragment, useMemo } from 'react';
import { Send, User, Search, Menu, X, Home, ArrowLeft, Bell } from 'lucide-react';
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import moment from "moment"
import Loader from '@/app/ui/loader';
import { handleSendingMessage } from '@/app/ui/components/chat';
import { useMediaQuery } from 'react-responsive';
import Tooltip from '@/ui/utils/tooltip';
import { UseOutSideClick } from '@/app/ui/components/OutsideClick';
import {  useReceivingMessage, useSetUnreadNotifications } from '@/app/ui/components/useConnect';
import { useAtom } from 'jotai';
import { notificationsAtom, unreadCountAtom, usersAtom } from '@/clientActions/States';
import { UpdateNotifications } from './utils';
import { cn } from '@/ui/utils/cn';
import Image from "next/image"
export type Message = {
  from: string;
  content: string;
  to: string;
  created_at: string;
}

export type User = {
  id: string;
  email: string;
  avatar: string;
  messages?:number
}

type Notification = {
  id:string,
  title :string, 
  created_at : string , 
  sender :string, 
  unread : boolean
}

const MessagesPage = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchParam = useSearchParams();
  const userParam = searchParam.get('user');
  const [chatRoom, setChatRoom] = useState<string>('');
  const router = useRouter();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications  ,setNotifications] = useAtom<Notification[]>(notificationsAtom);
  const [unreadCount , setUnreadNotifications ] = useAtom<number>(unreadCountAtom)
  const [users , setUsers] = useAtom(usersAtom)
  const notificationsRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient()
  useReceivingMessage(true)
  
  useSetUnreadNotifications()
  UpdateNotifications()
  const toggleChatRoom = useCallback((email: string) => {
    
    router.push(`/dashboard/messages?user=${email}`);
    setChatRoom(email);
    if (chatRoom) {
      setShowSidebar(false);
    }
  }, [router, chatRoom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      handleSendingMessage('mahmoud7samirr@gmail.com' , chatRoom , newMessage)
      const newMsg = { from: 'mahmoud7samirr@gmail.com', content: newMessage, to: chatRoom, created_at: new Date().toISOString() };
      queryClient.setQueryData(['admin_messages' , chatRoom] ,(prev : Message[] | undefined) => prev ?  [...prev, newMsg] : [newMsg]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (userParam) {
      setChatRoom(userParam);
    }
  }, [userParam]);

  const { data:messages, isLoading } = useQuery({
    queryKey: ['admin_messages', chatRoom],
    queryFn: async () => {
      const { data } = await axios.get(`/api/adminMessages?chat-room=${chatRoom}`);
      console.log(data)
      return data.messages;
    },
    enabled: !!chatRoom,
    refetchOnWindowFocus: false,
  });
  const {isLoading : mainLoading} =useQuery({
    queryKey:['notifies'] , 
    queryFn:async()=>{
      const {data} = await axios.get('/api/notifies')
      setNotifications(data.notifications)
      setUnreadNotifications(data.count)
      setUsers(data.users)
      return data
    }
  })
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatRoom]);
  
  
  
  const filteredUsers = useMemo(() => {
    if(!users) return []
    return users?.filter((user : any) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);
  

 
  

  const notificationVariants:Variants = {
    hidden: { clipPath: 'circle(0% at 50% 50%)' },
    visible: { clipPath: 'circle(100% at 50% 50%)' , transition:{duration:0.5 ,when:'beforeChildren' , staggerChildren:0.3 ,delayChildren:0.3} },
  };

  const notificationContentVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  UseOutSideClick(notificationsRef , ()=>{
    setShowNotifications(false)
  })
  if(mainLoading) return <Loader/>
  return (
    <div className="flex h-screen bg-gradient-to-br from-neutral-900 to-neutral-800">
      <AnimatePresence>
        {(!isMobile || showSidebar) && (
          <motion.div
            initial={isMobile ? { x: "-100%" } : {x:0}}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${isMobile ? 'absolute z-10 w-full md:w-80' : 'w-72 lg:w-1/4 '} h-full bg-neutral-950 shadow-lg flex flex-col`}
          >
            <div className="p-6 relative">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Contacts</h2>
              {isMobile && (
                <button onClick={() => setShowSidebar(false)} className="absolute top-6 right-6 text-purple-400">
                  <X size={24} />
                </button>
              )}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 px-4 bg-neutral-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-shadow duration-300"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="space-y-4 overflow-y-auto overflow-x-hidden h-[calc(100vh-200px)] custom-scrollbar">
                <AnimatePresence>
                  {filteredUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => toggleChatRoom(user.email)}
                      className={`flex items-center relative space-x-3 overflow-hidden p-3 rounded-xl hover:bg-neutral-900 cursor-pointer transition-all duration-300 ${chatRoom === user.email ? 'bg-neutral-800 shadow-inner' : ''}`}
                    >
                      <Image width={32} height={32} src={user.avatar} alt={user.email} className="w-12 h-12 rounded-full border-2 border-purple-400 transition-transform duration-300 hover:scale-110" />
                      <span className="text-sm font-medium  text-nowrap overflow-hidden text-ellipsis text-neutral-400">{user.email}</span>
                        <>
                      <div   className={cn('  right-3 text-[12px] sticky font-bold bg-blue-300 shadow-lg shadow-black/40 rounded-full overflow-hidden text-nowrap text-ellipsis size-6 flex items-center justify-center text-neutral-700 top-1/2 -translate-y-1/2' , user.messages === 0 && "hidden")}>{user.messages}</div>
                      </>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-neutral-950 shadow-md flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-400">Messages</h1>
          <div className="flex space-x-4">
            <Tooltip content="Home">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="bg-neutral-900 text-white border-2 border-neutral-700 rounded-full p-3 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-300"
              >
                <Home className="size-5" />
              </motion.button>
            </Tooltip>
            <Tooltip content="Dashboard"> 
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/dashboard')}
                className="bg-neutral-900 border-2 border-neutral-700 text-white rounded-full p-3  transition-colors  duration-300"
              >
                <ArrowLeft className="size-5" />
              </motion.button>
            </Tooltip>
              <div ref={notificationsRef} className='relative'>
                <Tooltip content="Notifications">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowNotifications(!showNotifications)}
                      
                      className="bg-neutral-900 relative text-white border-2 border-neutral-700 rounded-full p-3  focus:outline-none  transition-colors duration-300"
                    >
                      {unreadCount > 0 &&  <>
                        <span className='size-2 bg-blue-200 rounded-full absolute right-0 top-1 animate-ping'></span>
                        <span className='size-2 bg-blue-300 rounded-full absolute right-0 top-1'></span>
                      </>}
                      <Bell className="size-5" />
                    </motion.button>
                  </Tooltip>
                  <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={notificationVariants}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute right-0 max-h-[320px] overflow-y-auto small-scroll mt-1 w-80 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg z-50"
                    >
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={notificationContentVariants}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="p-4"
                      >
                        <h3 className="text-lg font-semibold sticky top-0 py-3 bg-neutral-900 w-full h-fit text-purple-400 mb-2">Notifications</h3>
                        {notifications && notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              onClick={()=>{router.push(`/dashboard/messages?user=${notification.sender}`)}}
                              className={cn("mb-2 p-2   rounded cursor-pointer"  , notification.unread ? "bg-gray-800":'bg-neutral-800')}
                            >
                              <p className="text-sm text-white">{notification.title}</p>
                              <p className="text-xs text-gray-500 ">From {notification.sender}</p>
                              <p className="text-xs text-gray-400 mt-400">{moment(notification.created_at).fromNow()}</p>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400">No new notifications</p>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            {isMobile && (
              <button onClick={() => setShowSidebar(!showSidebar)} className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>
        
        {isLoading  ? (
          <div className='flex-1 relative'>
            <Loader />
          </div>
        ) : chatRoom ? (
          <div  className="flex-1 overflow-y-auto p-6 small-scroll  rounded-2xl ring-8 shadow-inner shadow-black/30 ring-neutral-950  space-y-6">
            {Array.isArray(messages) && messages && messages.map((msg, index) => (
              <Fragment key={index}>
                <MessageComponent {...msg} />

              </Fragment>
            ))}
            <div ref={messageEndRef}/>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl text-neutral-400">Select a contact to start chatting</p>
          </div>
        )}
        <div className="p-6 bg-neutral-950 shadow-lg">
          <form onSubmit={handleSubmit} className="flex items-center space-x-4">
            <motion.input
              whileFocus={{ scaleX: 1.02 , y:-5 }}
              type="text"
              value={newMessage}
              disabled={!chatRoom}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full disabled:opacity-50 transition-shadow border-neutral-800 border-2 duration-300 py-3 px-6 bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!chatRoom}
              className="bg-gray-800 disabled:opacity-50 text-white rounded-full p-3 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-300"
            >
              <Send className="w-6 h-6" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

const MessageComponent: React.FC<Message> = ({ from, content, to, created_at }) => {
  const isCurrentUser = from === "mahmoud7samirr@gmail.com";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`max-w-sm min-w-52 md:max-w-lg rounded-3xl p-4 ${
          isCurrentUser ? 'bg-neutral-900 text-white' : 'bg-neutral-800 text-white'
        } shadow-lg transition-all duration-300`}
      >
        <p className="font-bold text-blue-300 text-sm mb-2">{isCurrentUser ? "You" : "User"}</p>
        <p className="text-sm">{content}</p>
        <p className='text-xs text-gray-300 mt-3 italic font-light'>{moment(created_at).format('D MMM • h:mm a')}</p>
      </motion.div>
    </motion.div>
  );
};

export default MessagesPage;
'use client'
import  { useEffect, useState } from 'react'

const useScrollDown = () => {
    const [y , setY] = useState(0)
     useEffect(()=>{
        const handleScroll  = ()=>{
            setY(window.scrollY)
        }

        window.addEventListener('scroll' , handleScroll)
        return()=>{
            window.removeEventListener('scroll' , handleScroll)
        }
    } , [])
    return y
}

export default useScrollDown
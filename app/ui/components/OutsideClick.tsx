import { Ref, RefObject, useEffect } from "react"

export const UseOutSideClick = (ref:RefObject<HTMLElement> | null , Callback:()=>void)=>{
    useEffect(()=>{
        const handleOutsideClick =(e:MouseEvent | TouchEvent)=>{
            if(ref?.current && !ref?.current.contains(e.target as Node)  ){
                Callback()
            }
        }
        document.addEventListener('mousedown' , handleOutsideClick)
        document.addEventListener('touchend' , handleOutsideClick)
        return ()=>{
            document.removeEventListener('mousedown'  , handleOutsideClick)
            document.removeEventListener('touchend' ,handleOutsideClick)
        }
    } ,[])

}
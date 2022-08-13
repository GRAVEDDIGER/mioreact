import { useState, useEffect } from 'react';

export  const useResize = (referenciaMenu)=>{
const [windowSize,setWidowSize] =useState(window.innerWidth)
window.onresize =()=>setWidowSize(window.innerWidth)

useEffect(()=>{
if (windowSize>700) {
    referenciaMenu.current.style.opacity=1
}
},[windowSize])
}
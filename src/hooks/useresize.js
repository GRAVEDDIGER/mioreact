import { useState, useEffect } from 'react';

export  const useResize1 = ({referenciaMenu,referenciaHambrguer})=>{
const [windowSize,setWidowSize] =useState(window.innerWidth)
window.onresize =()=>setWidowSize(window.innerWidth)

useEffect(()=>{
if (windowSize>700) console.log(referenciaMenu.current)
},[windowSize])
}
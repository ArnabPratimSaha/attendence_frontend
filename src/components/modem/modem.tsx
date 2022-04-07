import React, { FC, useEffect } from 'react'
import './modem.css';
interface ModemInterface{
  status?:boolean,
  className?:string,
  style?:React.CSSProperties | undefined,
  onClick?:()=>void,
  id:string
}
const Modem:FC<ModemInterface>=({children,status,className,style,onClick,id})=> {
  useEffect(()=>{
    const element=document.getElementById(id);
    let timeout:ReturnType< typeof setTimeout>|undefined;
    if(element){
      timeout=setTimeout(()=>{
        if(status)element.classList.add('modem_open');
        else element.classList.remove('modem_open');
      },100)
    }
    return ()=>timeout && clearTimeout(timeout)
  },[status])
  return (
    <div className={`modem-fulldiv`} style={{display:status?'flex':'none'}}>
      <div className={`modem-layer `} onClick={()=>onClick && onClick()}></div>
      <div className={`modem-card ${className && className}`} id={id} style={{...style}}  >
        {children}
      </div>
    </div>
  )
}

export default Modem
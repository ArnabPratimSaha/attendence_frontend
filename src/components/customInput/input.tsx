import React, { FC, useState } from 'react';
import './input.css';
interface CustomInterface{
  name:string,
  placeholder:string,
  onChange?:( v:React.ChangeEvent<HTMLInputElement> )=>void,
  type:React.HTMLInputTypeAttribute | undefined,
  value?:any,
  required?:boolean,
  className?:string,
  style?:React.CSSProperties | undefined,
  autoComplete?:'on'|'off'
}
const Input:FC<CustomInterface>=({type,name,placeholder,onChange,value,required ,className,style,autoComplete}) =>{
  const [focus,setFocus]=useState<boolean>(false);
  return (
    <div style={{...style}} className={`custominput-fulldiv ${className && className} ${focus && 'input-focus'}`} >
      <input autoComplete={autoComplete}   onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} className={`custominput-input`} required={required} name={name} placeholder={placeholder} value={value} type={type} onChange={(e)=>onChange && onChange(e)}></input>
    </div>
  )
}

export default Input
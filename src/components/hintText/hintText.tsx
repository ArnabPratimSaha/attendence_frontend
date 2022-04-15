import React, { FC, memo } from 'react';
import "./hintText.css";
interface HintTextInterface{
    children?:React.ReactNode|undefined,
    text:string,
    className?:string
}
const HintText:FC<HintTextInterface>=({children,text,className})=> {
  return (
    <div className={`hint-text-fulldiv ${className}`}>
        <div className="hint-text">
            {text}
        </div>
        {children}
    </div>
  )
}

export default memo(HintText)
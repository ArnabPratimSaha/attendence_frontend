import React, { FC,memo } from 'react';
import { RiCheckboxBlankCircleLine,RiCheckboxBlankCircleFill } from 'react-icons/ri';
import './column.css';
interface ColumnInterface{
  attendanceArray:Array<boolean>,
  access:"RO"|"RW",
  time:Date,
  index:number,
  onClick?:(remark:boolean,index:number,sid:string)=>void,
  sidArray:Array<string>
}
const Column:FC<ColumnInterface>=({attendanceArray,access,time,onClick,sidArray,index})=> {
  return (
    <div className='column-fulldiv'>
      {attendanceArray.map((value,i)=><div key={i} className={`column-dot-div ${i%2===0?"dot-fill":"dot-empty"}`}>
          {value?
            <RiCheckboxBlankCircleFill className={`${access}`} onClick={()=>access==='RW'&&onClick && onClick(false,index,sidArray[i]) } />
              :
            <RiCheckboxBlankCircleLine className={`${access}`} onClick={()=>access==='RW'&&onClick && onClick(true,index,sidArray[i]) }/> }
        </div>
      )}
    </div>
  )
}

export default memo(Column)
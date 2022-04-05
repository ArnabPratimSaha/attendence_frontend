import React, { FC,memo } from 'react';
import { RiCheckboxBlankCircleLine,RiCheckboxBlankCircleFill } from 'react-icons/ri';
import './column.css';
interface ColumnInterface{
  attendanceArray:Array<boolean>,
  access:"RO"|"RW",
  time:Date
}
const Column:FC<ColumnInterface>=({attendanceArray,access,time})=> {
  return (
    <div className='column-fulldiv'>
      {attendanceArray.map((value,index)=><div key={index} className={`column-dot-div ${index%2===0?"dot-fill":"dot-empty"}`}>
          {value?<RiCheckboxBlankCircleFill/>:<RiCheckboxBlankCircleLine/> }
        </div>
      )}
    </div>
  )
}

export default memo(Column)
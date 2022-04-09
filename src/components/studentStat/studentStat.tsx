import React, { FC, memo, useEffect, useRef, useState } from 'react'
import { Student } from '../../interfaces/classData';
import "./style.css";
interface StudentStatInterface{
    student:Student,
    style?:React.CSSProperties | undefined,
    className?:string
}
const getTotalCount=(arr:Array<boolean>):number=>{
  let num:number=0;
  arr.forEach(n=>n&&num++);
  return num;
}
const StudentStat:FC<StudentStatInterface>=({student,style,className})=> {
  const [count,setCount]=useState(getTotalCount(student.attendanceArray));
  useEffect(()=>{
    setCount(getTotalCount(student.attendanceArray));
  },[student])
  return (
    <div style={{...style}} className={`student-stat-div ${className}`}>
        <p>Present : {count}/{student.attendanceArray.length}</p>
        <p>Present(%): {(count/student.attendanceArray.length*100).toFixed(2)}</p>
    </div>
  )
}

export default memo(StudentStat)
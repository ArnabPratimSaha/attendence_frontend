import React, { FC } from 'react'
import { Student } from '../../interfaces/classData';
import "./style.css";
interface StudentStatInterface{
    student:Student,
    style?:React.CSSProperties | undefined
}
const StudentStat:FC<StudentStatInterface>=({student,style})=> {
  return (
    <div style={{...style}} className='student-stat-div'>
        <p>Present : {student.attendanceCount}/{student.attendanceArray.length}</p>
        <p>Present(%): {(student.attendanceCount/student.attendanceArray.length*100).toFixed(2)}</p>
    </div>
  )
}

export default StudentStat
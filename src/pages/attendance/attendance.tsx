import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Column from '../../components/column/column';
import { ClassInterface, Student } from '../../interfaces/classData';
import './style.css'

function Attendance() {
    const { cid } = useParams();
    const [access, setAccess] = useState<"RO" | "RW">('RO');
    const [classData, setClassData] = useState<ClassInterface | undefined>();
    const [id, setId] = useState<string | undefined>(Cookies.get('id'));
    const [accesstoken, setAccesstoken] = useState<string | undefined>(Cookies.get('accesstoken'));
    const [refreshtoken, setRefreshtoken] = useState<string | undefined>(Cookies.get('refreshtoken'));

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_BACKEND}/class`,
            method: 'GET',
            params: {
                cid
            }
        }).then(res => {
            if (res.status === 200 && res.data) {
                const data: ClassInterface = res.data;
                setClassData(data);
                if (id && data.teachers.includes(id))
                    setAccess('RW');
                console.log(data.students.map(s => s.attendanceArray[0]))
            }
        })
    }, []);
    useEffect(() => {
        const top: HTMLElement | null = document.getElementById('top');
        const bottom: HTMLElement | null = document.getElementById('bottom');
        if (top) {
            // top.scroll({ left: right.scrollHeight, behavior: 'smooth' })
            top.addEventListener('scroll', (ev) => {
                const top: HTMLElement | null = document.getElementById('top');
                const bottom: HTMLElement | null = document.getElementById('bottom');
                if (top && bottom) bottom.scrollLeft = top.scrollLeft;
            })
        }
        // if (left) left.addEventListener('scroll', (e) => {
        //     e.preventDefault();
        // });
    }, [])
    return (
        <div className='attendence-topdiv'>
            <div className='attendance-label-div'>
                <div className='attendance-label'>

                </div>
                <div className='attendance-date' id='top'>
                    {classData && classData.attendanceArray.map((t: Date, index) => {
                        const time: Date = new Date(t);
                        return <div className='column-date-div'>
                            <p className='column-par column-date'>{time.getDay()}.{time.getMonth()}.{time.getFullYear()}</p>
                            <p className='column-par column-time'>{time.getHours()}:{time.getMinutes()}</p>
                        </div>
                    })}
                </div>
            </div>
            <div className='attendence-fulldiv' >
                <div className='attendence-leftdiv' >
                    <div className='student-attr'>
                        <div className="attr attr-roll">
                            {classData && classData.students.map((s, i) => <div key={i} className={`student-infodiv ${i % 2 == 0 ? "dot-fill" : "dot-empty"}`}>
                                <p>{s.roll}</p>
                            </div>)}
                        </div>
                        <div className="attr attr-name">
                            {classData && classData.students.map((s, i) => <div key={i} className={`student-infodiv ${i % 2 == 0 ? "dot-fill" : "dot-empty"}`}>
                                <p>{s.name}</p>
                            </div>)}
                        </div>
                    </div>
                </div>
                <div className='attendence-display' id='bottom'>
                    <div className='attendence-rightdiv' >
                        {classData && classData.attendanceArray.map((s, i) => <Column key={i} time={new Date(classData.attendanceArray[i])} attendanceArray={classData.students.map(s => s.attendanceArray[i])} access={access} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Attendance
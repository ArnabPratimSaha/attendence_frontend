import axios,{AxiosRequestHeaders} from 'axios';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Column from '../../components/column/column';
import StudentStat from '../../components/studentStat/studentStat';
import { ClassInterface, Student } from '../../interfaces/classData';
import './style.css'
import { IoAdd } from 'react-icons/io5';
import { FcPrint } from 'react-icons/fc';
import Button from '../../components/customButton/button';
import Input from '../../components/customInput/input';
import Modem from '../../components/modem/modem';
import ReactToPrint from 'react-to-print';
function Attendance() {
    const { cid } = useParams();
    const [access, setAccess] = useState<"RO" | "RW">('RO');
    const [modemStatus,setModemStatus]=useState<boolean>(false);
    const [classData, setClassData] = useState<ClassInterface | undefined>();
    const [id, setId] = useState<string | undefined>(Cookies.get('id'));
    const [accesstoken, setAccesstoken] = useState<string | undefined>(Cookies.get('accesstoken'));
    const [refreshtoken, setRefreshtoken] = useState<string | undefined>(Cookies.get('refreshtoken'));
    const [name,setName]=useState<string>('');
    const [roll,setRoll]=useState<string>('');
    const navigate=useNavigate();
    const componentRef = useRef<any>();
    const fetchData=async(setData:React.Dispatch<React.SetStateAction<ClassInterface | undefined>>,setAccess:React.Dispatch<React.SetStateAction<"RO" | "RW">>):Promise<void>=>{
        try {
            const res=await axios({
                url: `${process.env.REACT_APP_BACKEND}/class`,
                method: 'GET',
                params: {
                    cid
                }
            });
            if (res.status === 200 && res.data) {
                const data: ClassInterface = res.data;
                setData(data);
                if (id && data.teachers.includes(id))
                    setAccess('RW');
            }
        } catch (error) {
            throw error;
        }

    }
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
            }
        }).catch(err=>{

        })
    }, []);
    const [device,setDevice]=useState<"MOBILE"|"PC">((window.innerWidth <= 800  )?'MOBILE':'PC');
    const ev0=()=>{
        if(window.innerWidth <= 800)setDevice('MOBILE');
        else setDevice('PC');
    }
    useEffect(()=>{
        window.addEventListener('resize',ev0);
        return ()=>{
            window.removeEventListener('resize',ev0);
        }
    },[])

    useEffect(() => {
        const ev1=(ev:Event)=>{
            const top: HTMLElement | null = document.getElementById('top');
            const bottom: HTMLElement | null = document.getElementById('bottom');
            if (top && bottom) top.scrollLeft = bottom.scrollLeft;
        }
        const ev2=(ev:Event)=>{
            const top: HTMLElement | null = document.getElementById('top');
            const bottom: HTMLElement | null = document.getElementById('bottom');
            if (top && bottom) bottom.scrollLeft = top.scrollLeft;
        }
        const top: HTMLElement | null = document.getElementById('top');
        const bottom: HTMLElement | null = document.getElementById('bottom');
        if(top && bottom){
            top.removeEventListener('scroll',ev1);
            bottom.removeEventListener('scroll',ev2);
        }
        if (top && bottom) {
            if(device==='MOBILE'){
                bottom.addEventListener('scroll',ev1)
                top.ontouchmove=(e:Event)=>{
                    e.preventDefault();
                    top.scrollLeft+=0;
                }
            }else{
                top.addEventListener('scroll', ev2)
            }
        }        
        return ()=>{
            if(top && bottom){
                top.removeEventListener('scroll',ev1);
                bottom.removeEventListener('scroll',ev2);
            }
        }
    }, []);
    const handleAttendance:((remark: boolean, index: number, sid: string) => void)=async(remark:boolean,index:number,sid:string)=>{
        try {
            if(access==='RO')return;
            const headers:AxiosRequestHeaders={
                ['id']:id||'',
                ['accesstoken']:accesstoken||'',
                ['refreshtoken']:refreshtoken||'',
                ['classid']:cid||''
            }
            const res=await axios({
                url: `${process.env.REACT_APP_BACKEND}/class/col`,
                method: 'PATCH',
                data:{
                    sid,index,remark,
                    time:new Date()
                },
                headers:headers
            });
            if(res.status===200){
                await fetchData(setClassData,setAccess);
            }
        } catch (error) {
            
        }
    }
    const handleAddColClick:((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined=async()=>{
        try {
            if(access==='RO')return;
            const headers:AxiosRequestHeaders={
                ['id']:id||'',
                ['accesstoken']:accesstoken||'',
                ['refreshtoken']:refreshtoken||'',
                ['classid']:cid||''
            }
            const res=await axios({
                url: `${process.env.REACT_APP_BACKEND}/class/col`,
                method: 'POST',
                data:{
                    cid,
                    time:new Date()
                },
                headers:headers
            });
            if(res.status===200){
                await fetchData(setClassData,setAccess);
            }
        } catch (error) {
            
        }
    }
    const handleStudentAddSubmit:React.FormEventHandler<HTMLFormElement> | undefined=async(ev)=>{
        try {
            ev.preventDefault();
            if(access==='RO')return;
            const headers:AxiosRequestHeaders={
                ['id']:id||'',
                ['accesstoken']:accesstoken||'',
                ['refreshtoken']:refreshtoken||'',
                ['classid']:cid||''
            }
            const res=await axios({
                url: `${process.env.REACT_APP_BACKEND}/class/student`,
                method: 'POST',
                data:{
                    name,roll
                },
                headers:headers
            });
            setModemStatus(false);
            if(res.status===200){
                await fetchData(setClassData,setAccess);
            }
        } catch (error) {
            
        }
    }
    const handleColClick=(index:number)=>{
        navigate(`/class/${cid}/${index}`)
    }
    
    const getCount=useCallback(
      (index:number):number => {
        let num=0;
        if(classData){
            classData.students.forEach(s=>s.attendanceArray[index]&&num++);
        }
        return num;
      },
      [classData],
    )
    
    return (
        <div className='attendence-topdiv' ref={componentRef}>
            <Modem id='1' status={modemStatus} onClick={()=>setModemStatus(false)}>
                <form onSubmit={handleStudentAddSubmit}>
                    <div className="student__add_data">
                        <div className="student__add_field">
                            <span>Name</span>
                            <Input autoComplete='off' onChange={(e)=>setName(e.target.value)} required name='name' placeholder='Enter Name' type={'text'} className='student__add_name' />
                        </div>
                        <div className="student__add_field">
                            <span>Roll</span>
                            <Input autoComplete='off' onChange={(e)=>setRoll(e.target.value)} required name='roll' placeholder='Enter Roll' type={'text'} className='student__add_roll' />
                        </div>
                        <Button className='student__add_data_button' type='submit' name='add'>ADD</Button>
                    </div>
                </form>
            </Modem>
            <div className='attendance-label-div'>
                <div className='attendance-label'>
                    <span>Student</span>
                    {access==='RW' &&<Button name='add' type='button' onClick={()=>setModemStatus(true)}>Add Student</Button>}
                </div>
                <div className='attendance-date' id='top'>
                    {classData && classData.attendanceArray.map((t: Date, index) => {
                        const time: Date = new Date(t);
                        return <div className={`column-date-div ${access}`} onClick={()=>handleColClick(index)}>
                            <div className="column-date-div__time">
                                <p className='column-par column-date'>{time.getDay()}.{time.getMonth()}.{time.getFullYear()}</p>
                                <p className='column-par column-time'>{time.getHours()}:{time.getMinutes()}</p>
                            </div>
                            <div className="column-date-div__stat">
                                <p>{getCount(index)}/{classData.students.length}</p>
                                <p>{(getCount(index)/classData.students.length*100).toFixed(1)}%</p>
                            </div>
                        </div>
                    })}
                    {access==='RW' && <Button onClick={handleAddColClick} type='button' name='add' className={`column__add ${access}`}>
                        <IoAdd/>
                    </Button>}
                </div>
                <div className="overall-stats">
                    <span>Overall Attendance</span> 
                    <ReactToPrint
                        trigger={() => <Button className='print-button' name='print' type='button'><FcPrint/></Button>}
                        content={() => componentRef.current}
                    />
                </div>
            </div>
            <div className='attendence-fulldiv' >
                {classData && <div className='attendence-leftdiv' >
                    {classData && classData.students.map((s,i)=><div onClick={()=>navigate(`/class/${cid}/student/${s.id}`)} key={s.id} style={{background:i%2===0?'#fff':'#eeeeee'}} className='student-attr'>
                        <p>{s.name}</p>
                        <p>{s.roll}</p>
                    </div>)}
                </div>} 
                <div className='attendence-display' id='bottom'>
                    <div className='attendence-rightdiv' >
                        {classData && classData.attendanceArray.map((s, i) => <Column
                            onClick={handleAttendance}
                            key={i} 
                            time={new Date(classData.attendanceArray[i])}
                            index={i}
                            attendanceArray={classData.students.map(s => s.attendanceArray[i])} 
                            access={access} 
                            sidArray={classData.students.map(s => s.id)}
                            />)}
                        {access ==='RW' && <div className="attendence-rightdiv__add">

                        </div>}
                    </div>
                </div>
                {classData &&<div className="attendance-student-stat">
                    {classData.students.map((s,i)=><StudentStat className='attendance-student-stat__stat' style={{background:i%2!==0?'#eeeeee':"#fff"}} student={s} />)}
                </div>}
            </div>
        </div>
    )
}

export default Attendance
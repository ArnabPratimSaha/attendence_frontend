import axios, { AxiosRequestHeaders } from 'axios';
import Cookies from 'js-cookie';
import React, { FC, useEffect, useRef, useState } from 'react'
import Button from '../../components/customButton/button';
import Input from '../../components/customInput/input';
import Modem from '../../components/modem/modem';
import { MdClass, MdSpaceDashboard } from 'react-icons/md';
import './dashboard.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiCopy } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook/hook';
import { clearClasses, removeClass, setClasses } from '../../redux/reducers/classReducer';
interface classDataInterface {
  id: string,
  name: string,
  teachers: Array<string>,
  students: Array<string>,
  attendanceArray: Array<string>,
}
const Dashboard = () => {
  const status = useAppSelector(s => s.user.status);
  const classData = useAppSelector(s => s.classData.status);
  const dispatch = useAppDispatch();
  const [modemStatus, setModemStatus] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const classId=useRef<string|undefined>(undefined);

  useEffect(() => {
    if (status === 'NOT_AUTHORIZED' || status === 'WAITING') return;
    const headers: AxiosRequestHeaders = {
      ['id']: status.id,
      ['accesstoken']: status.accesstoken,
      ['refreshtoken']: status.refreshtoken
    }
    axios({
      url: `${process.env.REACT_APP_BACKEND}/user/class`,
      method: 'GET',
      headers: headers
    }).then(res => {
      if (res.status === 200) {
        dispatch(setClasses(res.data.classes));
        return;
      }
      dispatch(clearClasses());
    }).catch(err => {
      dispatch(clearClasses());
    })
  }, []);
  const handleClassDelete: React.FormEventHandler<HTMLFormElement> | undefined = async (ev) => {
    try {
      if(!classId.current)return;
      if (status === 'NOT_AUTHORIZED' || status === 'WAITING') return;
      const headers: AxiosRequestHeaders = {
        ['id']: status.id,
        ['accesstoken']: status.accesstoken,
        ['refreshtoken']: status.refreshtoken
      }
      const res=await axios({
        url: `${process.env.REACT_APP_BACKEND}/class`,
        method: 'DELETE',
        data:{
          cid:classId.current
        },
        headers: headers
      });
      if(res.status===200){
        dispatch(removeClass(classId.current));
        classId.current=undefined;
      }
    } catch (error) {
      
    }
  }
  const handleClassCreate = async () => {
    try {
      const name = prompt('Enter Class Name');
      if (!name) return;
      if (status === 'NOT_AUTHORIZED' || status === 'WAITING') return;
      const headers: AxiosRequestHeaders = {
        ['id']: status.id,
        ['accesstoken']: status.accesstoken,
        ['refreshtoken']: status.refreshtoken
      }
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND}/class/create`,
        method: 'POST',
        data: {
          name
        },
        headers: headers
      });
      if (res.status === 200) {
        return navigate(`/class/${res.data.id}`)
      }
    } catch (error) {

    }
  }
  if (classData === 'WAITING') return (<div>Loading</div>)
  if (classData === 'NOT_FOUND') return (<div>NOT found</div>)
  return (
    <>
      <Modem id='5' status={modemStatus} onClick={() => setModemStatus(false)}>
        <form onSubmit={handleClassDelete}>
          <div className="password_data">
            <div className="password__add_field">
              <span>Password</span>
              <Input autoComplete='off' onChange={(e) => setPassword(e.target.value)} required name='pass' placeholder='Enter Your passwrod' type={'password'} />
            </div>
            <Button className='password_button' type='submit' name='add'>Confirm</Button>
          </div>
        </form>
      </Modem>
      <div className='dashboard-fulldiv'>
        <div className="dashboard-topdiv">
          <div className="dashboard-leftdiv">
            <div className="dashboard-logo">
              <MdSpaceDashboard className="dashboard-icon" />
              <span >Dashboard</span>
            </div>
            <Button name='add' type='button' onClick={handleClassCreate} className='class-create'><MdClass className='class-create-icon' />Create Class</Button>
          </div>
          <div className="dashboard-rightdiv">

          </div>
        </div>
        <div className="dashboard-classes">
          {classData.length === 0 && <div>No Classes found</div>}
          {classData.map((c, i) => <div key={i} className={`dashboard-classcard`}>
            <div className="dashboard-classcard__left" onClick={() => navigate(`/class/${c.id}`)}>
              <div className="dashboard-classcard-classname">
                <p>{c.name}</p>
                <span>{c.id} <BiCopy className='copytoclipboard-icon' /></span>
              </div>
              <div className="dashboard-classcard-classinfo">
                <div className="classinfo-studentcount">
                  <p>{c.students.length}</p>
                  <span>students</span>
                </div>
                <div className="classinfo-attendencecount">
                  <p>{c.attendanceArray.length}</p>
                  <span>attendence</span>
                </div>
              </div>
            </div>
            <div className="dashboard-classcard__right">
              <Button onClick={() =>{setModemStatus(true);classId.current=c.id}} className='print-icon delete-col' type='button' name='delete' ><RiDeleteBinLine /></Button>
            </div>

          </div>)}
        </div>
      </div>
    </>
  )
}

export default Dashboard
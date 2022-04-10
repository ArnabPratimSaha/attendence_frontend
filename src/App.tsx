import React, { useState ,useRef, useEffect} from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Auth from './pages/authentication/auth';
import Intro from './pages/intro/intro';
import Signup from './pages/authentication/signup';
import Login from './pages/authentication/login';
import Dashboard from './pages/dashboard/dashboard';
import Protected from './pages/protected/protected';
import Attendance from './pages/attendance/attendance';
import AttendenceIndex from './pages/attendenceIndex/attendenceIndex';
import StudentAttendence from './pages/studentAttendence/studentAttendence';
import Navbar from './components/navbar/navbar';
import Cookies from 'js-cookie';
import { useAppDispatch } from './redux/hook/hook';
import { login, logout, User } from './redux/reducers/userReducer';
import axios, { AxiosRequestHeaders } from 'axios';

const App=()=> {
  const dispatch=useAppDispatch();
  useEffect(()=>{

    const id=Cookies.get('id')
    const accesstoken = Cookies.get('accesstoken')
    const refreshtoken = Cookies.get('refreshtoken')
    if (!id || !accesstoken || !refreshtoken) {
      dispatch(logout());
    } else {
      const headers: AxiosRequestHeaders = {
        ['id']: id,
        ['accesstoken']: accesstoken,
        ['refreshtoken']: refreshtoken,
      }
      axios({
        url: `${process.env.REACT_APP_BACKEND}/user`,
        method: 'get',
        headers: headers
      }).then(res => {
        if (res.status === 200) {
          const user:User={
            name:res.data.name,
            email:res.data.email,
            id,accesstoken,refreshtoken
          }
          dispatch(login(user))
        }else{
          dispatch(logout())
        }
      }).catch(err => { dispatch(logout())})
    }

  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route element={<Navbar/>}>
            <Route path='/' element={<Intro/>} />
            <Route path='auth' element={<Auth/>} >
              <Route path='signup' element={<Signup/>} />
              <Route path='login' element={<Login/>} />
            </Route>
            <Route path='/' element={<Protected/>}>
              <Route path='dash/:id'  element={<Dashboard/>} />
            </Route>
          </Route>
          <Route path='class/:cid' element={<Attendance/>} />
          <Route path='class/:cid/student/:sid' element={<StudentAttendence/>} />
          <Route path='class/:cid/:index' element={<AttendenceIndex/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

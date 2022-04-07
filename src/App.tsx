import React, { useState ,useRef} from 'react';
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
const App=()=> {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Intro/>} />
          <Route path='auth' element={<Auth/>} >
            <Route path='signup' element={<Signup/>} />
            <Route path='login' element={<Login/>} />
          </Route>
          <Route path='/' element={<Protected/>}>
            <Route path='dash'  element={<Dashboard/>} />
          </Route>
          <Route path='class/:cid' element={<Attendance/>} />
          {/* <Route path='print' element={<Example/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

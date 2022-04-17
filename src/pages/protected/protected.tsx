import axios,{AxiosRequestHeaders} from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import { useAppSelector } from '../../redux/hook/hook';
import Intro from '../intro/intro';
import './style.css';

const Error=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        navigate('/');
    },[])
    return(<></>)
}
const Protected=()=> {
    const status=useAppSelector((s)=>s.user.status)
    if(status==='WAITING'){
        return <Loading/>
    }
    if(status==='NOT_AUTHORIZED'){
        return(<Error/>) 
    }
    return (<Outlet/>)    
}

export default Protected
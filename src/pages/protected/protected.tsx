import axios,{AxiosRequestHeaders} from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
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
    const [status,setStatus]=useState<'LOADING'|'AUTHETICATED'|'NOT_AUTHENTICATED'>('LOADING');
    useEffect(()=>{
        setStatus('LOADING');
        const headers:AxiosRequestHeaders={
            id:Cookies.get('id')?.toString()||'',
            accesstoken:Cookies.get('accesstoken')?.toString()||'',
            refreshtoken:Cookies.get('refreshtoken')?.toString()||'',
        }
        axios({
            url:`${process.env.REACT_APP_BACKEND}/user/`,
            method:'GET',
            headers
        }).then(res=>{
            if(res.status===200){
                setStatus('AUTHETICATED');
            }else{
                setStatus('NOT_AUTHENTICATED')
            }
        }).catch(err=>setStatus('NOT_AUTHENTICATED'))
    },[])
    if(status==='LOADING'){
        return (<div className='protected-full-div'>

            loading
        </div>)
    }
    if(status==='AUTHETICATED'){
        return (<Outlet/>)
    }
    return(<Error/>

    ) 
    
    
}

export default Protected
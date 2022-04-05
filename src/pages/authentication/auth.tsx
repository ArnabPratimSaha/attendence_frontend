import axios from 'axios';
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './style.css'
const Auth=()=> {
    const [id,setId]=useState<string>('');
    const navigate=useNavigate();
    const handleFormSubmit:React.FormEventHandler<HTMLFormElement> | undefined=async(event):Promise<void>=>{
        try {
            event.preventDefault();
            const res=await axios({
                url:`${process.env.REACT_APP_BACKEND}/class`,
                method:'GET',
                params:{
                    cid:id
                }
            });
            if(res.status===200)navigate(`/class/${id}`)
        } catch (error) {
            
        }
    }
  return (
    <div className='auth-full-div'>
        <form onSubmit={handleFormSubmit}><input placeholder='Enter class id' type={'text'} name={id} value={id} onChange={e=>setId(e.target.value)} /><button type={'submit'}>Go</button> </form>
        <Outlet/>
    </div>
  )
}

export default Auth
import axios from 'axios';
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Button from '../../components/customButton/button';
import Input from '../../components/customInput/input';
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
            <form onSubmit={handleFormSubmit}>
              <div className="class-join-div">
                  <Input placeholder='Enter class id' type={'text'} name={id} value={id} onChange={e => setId(e.target.value)} />
                  <Button style={{marginLeft:'1rem'}} name={'sub'} type={'submit'}>Go</Button>
              </div>
          </form>
          <Outlet />
    </div>
  )
}

export default Auth
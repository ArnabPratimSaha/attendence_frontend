import axios from 'axios';
import React,{useState} from 'react'
import { VscEye,VscEyeClosed } from 'react-icons/vsc';
import {NavLink,useNavigate} from 'react-router-dom';
import AuthResponse from '../../interfaces/authResponseData';
import Cookies from 'js-cookie';

const  Signup=()=> {
    const [showPassword,setShowPassword]=useState<boolean>(false);
    const [name,setName]=useState<string>('');
    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const navigate=useNavigate();


    const handleFormSubmit:React.FormEventHandler<HTMLFormElement> | undefined=async(event):Promise<void>=>{
        try {
            event.preventDefault();
            const res=await axios({
                url:`${process.env.REACT_APP_BACKEND}/auth/signup`,
                method:'POST',
                data:{
                    name,email,password
                }
            });
            if(res.status===200){
                const data:AuthResponse=res.data as AuthResponse;
                Cookies.set('id',data.id);
                Cookies.set('accesstoken',data.accesstoken);
                Cookies.set('refreshtoken',data.refreshtoken);
                navigate('/dashboard');
            }
            
        } catch (error) {
            
        }
    }
  return (
    <div className='signup-full-div'>
        <form onSubmit={handleFormSubmit}>
            <input required type={'text'} name={'name'} placeholder={'Enter Your name'} value={name} onChange={e=>setName(e.target.value) }/><br/>
            <input required type={'email'} name={'email'} placeholder={'Enter Your email'} value={email}  onChange={e=>setEmail(e.target.value) }/><br/>
            <div>
                <input required type={showPassword?'text':'password'} name={'email'} value={password} onChange={e=>setPassword(e.target.value) } placeholder={'Enter Your password'} />
                <button onClick={()=>setShowPassword(s=>!s)} type={'button'} name={'show'} title={'show'}>{showPassword?<VscEye/>:<VscEyeClosed/>}</button>
            </div>
            <button type={'submit'} name={'submit'} title={'sign up'} >Sign up</button>
        </form>
        <div>
            Switch to <NavLink to={'/auth/login'} >Login</NavLink>
        </div>
    </div>
  )
}

export default Signup
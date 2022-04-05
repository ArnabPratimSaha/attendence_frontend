import React,{useState} from 'react'
import { VscEye,VscEyeClosed } from 'react-icons/vsc';
import {NavLink,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import AuthResponse from '../../interfaces/authResponseData';
function Login() {
    const [showPassword,setShowPassword]=useState<boolean>(false);
    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const navigate=useNavigate();
    const handleFormSubmit:React.FormEventHandler<HTMLFormElement> | undefined=async(event):Promise<void>=>{
        try {
            event.preventDefault();
            const res=await axios({
                url:`${process.env.REACT_APP_BACKEND}/auth/login`,
                method:'POST',
                data:{
                    email,password
                }
            });
            if(res.status===200){
                const data:AuthResponse=res.data as AuthResponse;
                Cookies.set('id',data.id);
                Cookies.set('accesstoken',data.accesstoken);
                Cookies.set('refreshtoken',data.refreshtoken);
                navigate(`/dash`);
            }
            
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log({err:error});
                
            }
        }
    }
  return (
    <div className='signup-full-div'>
        <form onSubmit={handleFormSubmit}>
            <input required type={'email'} name={'email'} placeholder={'Enter Your email'} value={email}  onChange={e=>setEmail(e.target.value) } /><br/>
            <div>
                <input required type={showPassword?'text':'password'} name={'email'} placeholder={'Enter Your password'} value={password} onChange={e=>setPassword(e.target.value) } />
                <button onClick={()=>setShowPassword(s=>!s)} type={'button'} name={'show'} title={'show'}>{showPassword?<VscEye/>:<VscEyeClosed/>}</button>
            </div>
            <button type={'submit'} name={'submit'} title={'login'} >Login In</button>
        </form>
        <div>
            Switch to <NavLink to={'/auth/signup'} >Sign up</NavLink>
        </div>
    </div>
  )
}

export default Login
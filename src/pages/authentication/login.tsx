import React,{useState} from 'react'
import { VscEye,VscEyeClosed } from 'react-icons/vsc';
import {NavLink,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import AuthResponse from '../../interfaces/authResponseData';
import Input from '../../components/customInput/input';
import Button from '../../components/customButton/button';
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
                Cookies.set('id',data.id,{expires:30});
                Cookies.set('accesstoken',data.accesstoken,{expires:30});
                Cookies.set('refreshtoken',data.refreshtoken,{expires:30});
                navigate(`/dash`);
            }
            
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log({err:error});
                
            }
        }
    }
  return (
    <div className='auth-card login-full-div'>
        <h1 className='auth-card-title'>LOG IN</h1>
        <form onSubmit={handleFormSubmit}>
            <Input required type={'email'} name={'email'} placeholder={'Enter Your email'} value={email}  onChange={e=>setEmail(e.target.value) } />
            <div className='password-div'>
                <Input style={{marginTop:'15px'}} required type={showPassword?'text':'password'} name={'email'} placeholder={'Enter Your password'} value={password} onChange={e=>setPassword(e.target.value) } />
                <Button style={{marginLeft:'10px',marginTop:'15px',height:'2rem',width:'2rem'}} onClick={(e)=>setShowPassword(s=>!s)} type={'button'} name={'show'} >{showPassword?<VscEye/>:<VscEyeClosed/>}</Button>
            </div>
            <Button style={{marginTop:'15px',padding:'5px 10px'}}  type={'submit'} name={'submit'} >Login In</Button>
        </form>
        <div className='auth-card-change'>
            Switch to <NavLink to={'/auth/signup'} >Sign up</NavLink>
        </div>
    </div>
  )
}

export default Login
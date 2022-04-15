import axios from 'axios';
import React,{useState} from 'react'
import { VscEye,VscEyeClosed } from 'react-icons/vsc';
import {Link, NavLink,useNavigate} from 'react-router-dom';
import Input from '../../components/customInput/input';
import Button from '../../components/customButton/button';
import { useAppDispatch } from '../../redux/hook/hook';
import { login, User } from '../../redux/reducers/userReducer';

const  Signup=()=> {
    const [showPassword,setShowPassword]=useState<boolean>(false);
    const [name,setName]=useState<string>('');
    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const navigate=useNavigate();
    const dispatch=useAppDispatch();

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
                const user:User=res.data as User;
                dispatch(login(user))
                navigate(`/dash/${user.id}`);
            }
            
        } catch (error) {
            
        }
    }
  return (
    <div className='auth-card signup-full-div'>
        <h1 className='auth-card-title'>SIGN UP</h1>
        <form onSubmit={handleFormSubmit}>
            <Input required type={'text'} name={'name'} placeholder={'Enter Your name'} value={name} onChange={(e)=>setName(e.target.value) }/>
            <Input style={{marginTop:'15px'}} required type={'email'} name={'email'} placeholder={'Enter Your email'} value={email}  onChange={e=>setEmail(e.target.value) }/>
            <div className='password-div'>
                <Input style={{marginTop:'15px'}} required type={showPassword?'text':'password'} name={'email'} value={password} onChange={e=>setPassword(e.target.value) } placeholder={'Enter Your password'} />
                <Button style={{marginLeft:'10px',marginTop:'15px',height:'2rem',width:'2rem'}} onClick={()=>setShowPassword(s=>!s)} type={'button'} name={'show'}>{showPassword?<VscEye/>:<VscEyeClosed/>}</Button>
            </div>
            <Button  className='auth-button signup-button'  type={'submit'} name={'submit'} >Sign up</Button>
        </form>
        <div className='auth-card-change'>
            Switch to <NavLink to={'/auth/login'}>Login</NavLink>
        </div>
    </div>
  )
}

export default Signup
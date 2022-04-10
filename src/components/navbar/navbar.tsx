import axios, { AxiosRequestHeaders } from 'axios';
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hook/hook';
import { RootState } from '../../redux/reducers/allReducer';
import Button from '../customButton/button';
import {logout} from '../../redux/reducers/userReducer';
import './navbar.css';
interface User {
    name: string,
    email: string,
    id: string
}
const Navbar = () => {
    const status=useAppSelector((s:RootState)=>s.user.status);
    const dispath=useAppDispatch();
    const handleLogout=()=>{
        if (status==='NOT_AUTHORIZED'|| status==='WAITING') {
            return;
        }
        const headers: AxiosRequestHeaders = {
            ['id']: status.id,
            ['accesstoken']:status.accesstoken,
            ['refreshtoken']: status.refreshtoken,
        }
        axios({
            url: `${process.env.REACT_APP_BACKEND}/auth/logout`,
            method: 'DELETE',
            headers: headers
        }).then(res=>{
            if(res.status===200){
                dispath(logout())
            }
        }).catch(err=>{})
    }
    return (
        <>
            <div className='navbar-fulldiv'>
                <div className="navbar-leftdiv">
                    <div className="navbar-logodiv">
                        <span>C</span>
                    </div>
                    <div className="navbar-links">
                        <NavLink
                            to={`/`}
                            className={({ isActive }) =>
                                `navlink ${isActive && 'nav-active'}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to={`/dash/${Cookies.get('id')}`}
                            className={({ isActive }) =>
                                `navlink ${isActive && 'nav-active'}`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </div>
                </div>
                <div className="navbar-rightdiv">
                    {status==='WAITING' && <div>Loading</div>}
                    {status === 'NOT_AUTHORIZED' && <div className='rightdiv-login'>
                        <NavLink
                            to={`/auth/login`}
                            className={({ isActive }) =>
                                `navlink-login`
                            }
                        >
                            Login
                        </NavLink>
                    </div>}
                    {status !== 'NOT_AUTHORIZED' && status!=='WAITING' && <div className='rightdiv-logout'>
                        {status.name}
                        <Button onClick={handleLogout} className='logout' name='logout' type='button'>Logout</Button>
                    </div>}
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navbar
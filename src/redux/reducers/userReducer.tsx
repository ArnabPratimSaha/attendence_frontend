import { createSlice, PayloadAction,createAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import type { RootState } from './allReducer';
export interface User{
    name:string
    id:string
    email:string,
    accesstoken:string
    refreshtoken:string

}
export interface UserStatus{
    status:"WAITING"|"NOT_AUTHORIZED"|User,

}
const initialState:UserStatus={
    status:'WAITING',
}
export const userSlice=createSlice({
    name:'User Reducer',
    initialState,
    reducers:{
        login:(state,data:PayloadAction<User>)=>{
            Cookies.set('id',data.payload.id,{expires:365});
            Cookies.set('accesstoken',data.payload.accesstoken,{expires:365});
            Cookies.set('refreshtoken',data.payload.refreshtoken,{expires:365});
            state.status=data.payload;

        },
        logout:(state)=>{
            Cookies.remove('id');
            Cookies.remove('accesstoken');
            Cookies.remove('refreshtoken');
            state.status='NOT_AUTHORIZED'
        },
        updateAccessToken:(state,accesstoken:PayloadAction<string>)=>{
            if(state.status!=='NOT_AUTHORIZED' && state.status!=='WAITING'){
                Cookies.set('accesstoken',accesstoken.payload,{expires:365})
                state.status.accesstoken=accesstoken.payload;
            }
        }
    }
})
export const {login,logout,updateAccessToken}=userSlice.actions;
export const userReducer=userSlice.reducer;

export type userType=typeof userSlice.getInitialState
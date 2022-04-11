import { createSlice, PayloadAction,createAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import type { RootState } from './allReducer';
import { ClassInterface,Student } from '../../interfaces/classData';
export interface Attendence{
    status:"WAITING"|"NOT_FOUND"|ClassInterface
}
const initialState:Attendence={
    status:'WAITING',
}
interface UpdateInterface{
    sid:string,
    index:number,
    remark:boolean,
}
export const attendenceSlice=createSlice({
    name:'Attendence Reducer',
    initialState,
    reducers:{
        setData:(state,data:PayloadAction<ClassInterface>)=>{
            state.status=data.payload;
        },
        update:(state,data:PayloadAction<UpdateInterface>)=>{
            if(state.status==='NOT_FOUND'||state.status==='WAITING')return;
            state.status.students.forEach(s=>{
                if(s.id===data.payload.sid){
                    s.attendanceArray[data.payload.index]=data.payload.remark;
                }
            })
        },
        setStatus:(state,data:PayloadAction<"WAITING"|"NOT_FOUND">)=>{
            state.status=data.payload;
        },
    }
})
export const {setData,update,setStatus}=attendenceSlice.actions;
export const attendenceReducer=attendenceSlice.reducer;

export type userType=typeof attendenceSlice.getInitialState
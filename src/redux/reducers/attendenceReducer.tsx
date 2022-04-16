import { createSlice, PayloadAction,createAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import type { RootState } from './allReducer';
import { ClassInterface,Student } from '../../interfaces/classData';
export interface Attendence{
    status:"WAITING"|"NOT_FOUND"|ClassInterface,
    sort:"ASCEND"|"DECEND"
}
const initialState:Attendence={
    status:'WAITING',
    sort:'ASCEND'
}
interface UpdateInterface{
    sid:string,
    index:number,
    remark:boolean,
}
interface AttendanceAddInterface{
    data:ClassInterface
}

export const attendanceSlice=createSlice({
    name:'Attendance Reducer',
    initialState,
    reducers:{
        setData:(state,data:PayloadAction<AttendanceAddInterface>)=>{
            if(state.sort==='ASCEND')
                data.payload.data.students = data.payload.data.students.sort((a, b) => +a.roll - +b.roll);
            else 
                data.payload.data.students = data.payload.data.students.sort((a, b) => +b.roll - +a.roll);
            state.status = data.payload.data;
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
        sortAttandance:(status,data:PayloadAction<"ASCEND"|"DECEND">)=>{
            if(status.status==='NOT_FOUND'||status.status==='WAITING')return;
            status.sort=data.payload;
            if(data.payload==='ASCEND')
                status.status.students=status.status.students.sort((a,b)=>+a.roll-+b.roll)
            else
            status.status.students=status.status.students.sort((a,b)=>+b.roll-+a.roll)
        }
    }
})
export const {setData,update,setStatus,sortAttandance}=attendanceSlice.actions;
export const attendanceReducer=attendanceSlice.reducer;

export type userType=typeof attendanceSlice.getInitialState
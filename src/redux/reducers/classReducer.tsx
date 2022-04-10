import { createSlice, PayloadAction,createAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import type { RootState } from './allReducer';
export interface ClassDataInterface {
    id: string,
    name: string,
    teachers: Array<string>,
    students: Array<string>,
    attendanceArray: Array<string>,
}
interface classInterface{
    status:'NOT_FOUND'|'WAITING'|ClassDataInterface[]
}
const initialState:classInterface={
    status:'WAITING'
}
export const classSlice=createSlice({
    name:'Attendence Reducer',
    initialState,
    reducers:{
        setClasses:(state,data:PayloadAction<ClassDataInterface[]>)=>{
            state.status=data.payload;
        },
        removeClass:(state,data:PayloadAction<string>)=>{
            if(state.status==='NOT_FOUND'||state.status==='WAITING')return;
            state.status=state.status.filter(s=>s.id!==data.payload)
        },
        clearClasses:(state)=>{
            state.status='NOT_FOUND';
        }
    }
})
export const {setClasses,removeClass,clearClasses}=classSlice.actions;
export const classReducer=classSlice.reducer;

export type userType=typeof classSlice.getInitialState
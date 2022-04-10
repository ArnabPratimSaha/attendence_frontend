import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import type { AppDispatch } from '../reducers/allReducer';
import { RootState } from '../reducers/allReducer';

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './attendenceIndex.css';
import { BiCopy } from 'react-icons/bi';
import { AiFillPrinter } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import ReactToPrint from 'react-to-print';
import Button from '../../components/customButton/button';
import Modem from '../../components/modem/modem';
import Input from '../../components/customInput/input';
import { useAppSelector } from '../../redux/hook/hook';

interface StudentIndividualData {
    id: string,
    name: string, roll: string,
    remark: boolean
}
interface DateAttendance {
    id: string,
    date: Date,
    name: string,
    students: Array<StudentIndividualData>,
    teachers: Array<string>
}
const AttendenceIndex = () => {
    const { cid, index } = useParams();
    const status=useAppSelector(s=>s.user.status);
    const [data, setData] = useState<DateAttendance | "LOADING" | "NOT_FOUND">("LOADING");
    const [access, setAccess] = useState<"RW" | "RO">('RO');
    const [modemStatus, setModemStatus] = useState<boolean>(false);
    const componentRef = useRef<any>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_BACKEND}/class/col`,
            method: 'GET',
            params: {
                cid, index
            }
        }).then(res => {
            if (res.status === 200 && res.data) {
                const data: DateAttendance = res.data;
                setData(data);
                if (status!=='NOT_AUTHORIZED' && status!=='WAITING' && data.teachers.includes(status.id))
                    setAccess('RW');
                return;
            }

            setData('NOT_FOUND');
        }).catch(err => {
            setData('NOT_FOUND');
        })
    }, [])

    const getPresent = useCallback((data: DateAttendance) => {
        let count: number = 0;
        data.students.forEach(s => s.remark && count++);
        return count;
    }, [data]);
    function copyToClipboard(val: string | null) {
        if (!val) return;
        navigator.clipboard.writeText(val);
    }
    const handleColdelete: React.FormEventHandler<HTMLFormElement> | undefined = async (ev) => {
        try {
            ev.preventDefault();
            if (access === 'RO' || status==='NOT_AUTHORIZED' || status==='WAITING') {
                return setModemStatus(false);
            };
            const headers: AxiosRequestHeaders = {
                ['id']: status.id,
                ['accesstoken']: status.accesstoken,
                ['refreshtoken']: status.refreshtoken,
                ['classid']: cid || ''
            }
            const res = await axios({
                url: `${process.env.REACT_APP_BACKEND}/class/col`,
                method: 'DELETE',
                data: {
                    index
                },
                headers: headers
            });
            if (res.status === 200) {
                setModemStatus(false);
                return navigate(`/class/${cid}`)
            }
            setModemStatus(false);
        } catch (error) {
            setModemStatus(false);
        }
    }
    if (data === 'LOADING')
        return (<div>Loading</div>)
    if (data === 'NOT_FOUND')
        return (<div>Not found</div>)
    return (
        <>
            <Modem id='2' status={modemStatus} onClick={() => setModemStatus(false)}>
                <form onSubmit={handleColdelete}>
                    <div className="password_data">
                        <div className="password__add_field">
                            <span>Password</span>
                            <Input autoComplete='off' onChange={(e) => setPassword(e.target.value)} required name='roll' placeholder='Enter Your passwrod' type={'password'} />
                        </div>
                        <Button className='password_button' type='submit' name='add'>Confirm</Button>
                    </div>
                </form>
            </Modem>
            <div className='attendenceindex-fulldiv' ref={componentRef}>
                <div className="attendenceindex-infodiv">
                    <div className="attendenceindex-classheader">
                        <div className="attendenceindex-classData">
                            <p>{data.name}</p>
                            <span id={data.id}>{data.id}<BiCopy className='copytoclipboard-icon' onClick={() => copyToClipboard(data.id)} /> </span>
                        </div>
                        <div className="col-edit">
                            <ReactToPrint
                                trigger={() => <Button className='print-icon' name='print' type='button'><AiFillPrinter /></Button>}
                                content={() => componentRef.current}
                            />
                            {access === 'RW' && <Button onClick={() => setModemStatus(true)} className='print-icon delete-col' type='button' name='delete' ><RiDeleteBinLine /></Button>}
                        </div>
                    </div>
                    <div className="attendenceindex-datediv">
                        <p>{new Date(data.date).toLocaleDateString()} at {new Date(data.date).toLocaleTimeString()}</p>

                    </div>
                    <div className="present_stat">
                        <p>Present {getPresent(data)} Out Of {data.students.length}</p>
                        <p>({(getPresent(data) / data.students.length * 100).toFixed(1)}%)</p>
                    </div>
                </div>
                <div className="attendenceindex-attendance">
                    {data.students.map((a, i) => <div key={i} className={`attendenceindex-attendance__card ${i % 2 == 0 ? `card__even` : `card__odd`}`}>
                        <div className="attendenceindex-attendance__card__student">
                            <div className="card__student_attr">
                                <span>{a.name}</span>
                                <p>{a.roll}</p>
                            </div>
                            <div className="card__student__id">
                                <span>{a.id}</span>
                                <BiCopy className='copytoclipboard-icon' />
                            </div>
                        </div>
                        {a.remark && <p className='present-p'>Present</p>}
                        {!a.remark && <p className='absent-p'>Not Present</p>}
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default AttendenceIndex
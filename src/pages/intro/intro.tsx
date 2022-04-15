import React, { useState } from 'react'
import Lottie from 'react-lottie';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/customButton/button';
import * as animationData from './calendar.json';
import {Helmet} from 'react-helmet'
import './intro.css';
function Intro() {
  const [isStopped, setIsStopped] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const navigate=useNavigate();
  return (
    <div className='intro-fulldiv'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>home</title>
      </Helmet>
      <div className="intro-topdiv">
        <div className="topintro-leftdiv">
          <div className="leftdiv-top">
            <h1>Attendence</h1>
            <span>manage class attendence like never before</span>
          </div>
          <div className="leftdiv-button">
            <span>Get Started Today</span>
            <Button onClick={()=>navigate('/auth/login')} type='button' className='intro-class-button' name='start'>Get Started</Button>
          </div>
        </div>
        <div className="lottie-animation">
          <Lottie options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
              
            }
          }}
            speed={.5}
            isStopped={isStopped}
            isPaused={isPaused} />
        </div>
      </div>
    </div>
  )
}

export default Intro
import React from 'react'
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout, setMode } from 'state';
import { MdMessage, MdLogout} from 'react-icons/md'
import {BsFillMoonFill, BsFillQuestionCircleFill  } from 'react-icons/bs'

export default function NavBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleLogout = () => {
    dispatch(setLogout())
    navigate("/")
  }


  return (
    <div className='navbar'>
      <div className='left-nav'>
        <h1>OpenBar</h1>
        <input className='search' placeholder="Search" />
      </div>
      <div className='right-nav'>
        <BsFillMoonFill size={"3vh"} onClick={()=> dispatch(setMode())}/>
        <MdMessage size={"3vh"} />
        <BsFillQuestionCircleFill size={"3vh"} onClick={() => { window.location.href = "https://github.com/aldoportillo/OpenBar"}} />
        <MdLogout size={"3vh"} onClick={toggleLogout}/>
      </div>
    </div>
  )
}

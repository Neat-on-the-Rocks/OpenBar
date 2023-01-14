import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin, setLogout, setMode } from 'state';
import { MdMessage } from 'react-icons/md'
import {BsFillMoonFill, BsFillQuestionCircleFill, BsFillBellFill  } from 'react-icons/bs'

export default function NavBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [dropDown, setDropDown] = React.useState(false)

  return (
    <div className='navbar'>
      <div className='left-nav'>
        <h1>OpenBar</h1>
        <input className='search'></input>
      </div>
      <div className='right-nav'>
        <BsFillMoonFill size={"3vh"} onClick={()=> dispatch(setMode())}/>
        <MdMessage size={"3vh"} />
        <BsFillBellFill size={"3vh"}/>
        <BsFillQuestionCircleFill size={"3vh"} onClick={() => dispatch(setLogout())}/>
        <div className='dropdown'>
          <button onClick={() => (setDropDown(!dropDown))}> {user ? <p>{`${user.firstName} ${user.lastName}`}</p> : <p onClick={() => dispatch(setLogin())}>Login</p>}</button>
          {dropDown && <p>Active Dropdown</p>}
        </div>
      </div>
    </div>
  )
}

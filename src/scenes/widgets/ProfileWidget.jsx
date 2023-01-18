import React from 'react'
import {RiUserSettingsFill} from 'react-icons/ri'
import {MdLocationPin} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

export default function ProfileWidget({picturePath, location, occupation,  name}) {
  return (
    <div className='profile-widget'>
        <div className='name'>
            <img src={`http://localhost:5000/assets/${picturePath}`} alt=""/>
            <h3>{name}</h3>
            <RiUserSettingsFill />
        </div>
        <div className="icon-text">
            <MdLocationPin />
            <h4>{location}</h4>
        </div>
        <div className="icon-text">
            <BsBriefcaseFill />
            <h4>{occupation}</h4>
        </div>
    </div>
  )
}

import React from 'react'
import {RiUserSettingsFill} from 'react-icons/ri'
import {MdLocationPin} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

export default function ProfileWidget({picturePath, location, occupation,  name}) {
  return (
    <div className='profile-widget'>
        <div className='user-info'>
            <div className='user'>
                <img src={`http://localhost:5000/assets/${picturePath}`} alt=""/>
                <h3>{name}</h3>
            </div>
            <RiUserSettingsFill size={25} />
        </div>
        <div className="icon-text">
            <MdLocationPin />
            <h4>{location}</h4>
        </div>
        <div className="icon-text">
            <BsBriefcaseFill />
            <h4>{occupation}</h4>
        </div>
        <hr />
        <h4 className="space-between"><p>Profile Views</p> <p>100</p></h4>
        <h4 className="space-between"><p>Friends</p> <p>0</p></h4>
        <hr />
    </div>
  )
}

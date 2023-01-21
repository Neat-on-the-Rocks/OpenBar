import React from 'react'
import {RiUserSettingsFill} from 'react-icons/ri'
import {MdLocationPin} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ProfileWidget({picturePath, location, occupation,  name, userId}) {
    const friends = useSelector((state) => state.user.friends);

    const navigate = useNavigate()
  return (
    <div className='profile-widget'>
        <div className='user-info'>
            <div className='user'>
                <img src={`http://localhost:5000/assets/${picturePath}`} alt=""/>
                <h3 onClick={ () => navigate(`/profile/${userId}`)}>{name}</h3>
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
        <h4 className="space-between"><p>Friends</p> <p>{friends.length}</p></h4>
        <hr />
    </div>
  )
}

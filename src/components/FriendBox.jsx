import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { setFriends } from 'state';
import {BsFillPersonPlusFill, BsFillPersonDashFill } from 'react-icons/bs'

export default function FriendBox({friendId, occupation, picturePath, friendName}) {

    const dispatch = useDispatch();
    // const navigate = useNavigate(); will be used to navigate to user profile
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const response = await fetch(
          `http://localhost:5000/users/${_id}/${friendId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    }

    const displayIcon = () => {
        if (isFriend){
            return  <BsFillPersonDashFill size={20} onClick={patchFriend}/>
        } else {
            return <BsFillPersonPlusFill size={20} padding={5} onClick={patchFriend}/>
        }
    }

  return (
    <div>
        <div className='space-between'>
            <div className="friend-info">
                <img src={`http://localhost:5000/assets/${picturePath}`} alt="" />
                <div className="text">
                    <h3>{friendName}</h3>
                    <p>{occupation}</p>
                </div>
            </div>
            { displayIcon()}
        </div>
    </div>
  )
}

  
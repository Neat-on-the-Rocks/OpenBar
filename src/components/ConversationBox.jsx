import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ConversationBox({id, members}) {
    const navigate = useNavigate()
    const userId = useSelector((state) => state.user._id)
    const friends = useSelector((state) => state.user.friends);

    const renderUser = members.map(member => {
        if(member !== userId){
            const {firstName, lastName, picturePath} = friends.find(friend => friend._id === member) 
            return (
              <>
                <img src={`http://localhost:5000/assets/${picturePath}`} alt="" />
                <h3>{`${firstName} ${lastName}`}</h3>
              </>
            )
        }
        return null
    })

  return (
    <div className="conversation-box" onClick={() => navigate(`/messenger/${id}`)}>{renderUser}</div>
  )
}

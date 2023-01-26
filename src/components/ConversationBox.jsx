import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ConversationBox({id, members}) {
    const navigate = useNavigate()
    const userId = useSelector((state) => state.user._id)
    const renderUser = members.map(member => {
        if(member !== userId){
            return member
        }
        return null
    })

    console.log(id);


  return (
    <div onClick={() => navigate(`/messenger/${id}`)}>{renderUser}</div>
  )
}

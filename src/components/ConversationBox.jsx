import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ConversationBox({id, members}) {
    const navigate = useNavigate()
    const userId = useSelector((state) => state.user._id)
    const [userInfo, setUserInfo] = React.useState("")
    const token = useSelector((state) => state.token);

    const renderUser = members.map(member => {
        if(member !== userId){
            return member
        }
        return null
    })

    const getUser = async (id) => {
      const res = await fetch(
          `http://localhost:5000/users/${id}`,
          {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
          }
      );
          const user = await res.json()
          setUserInfo(user)
    }

    React.useEffect(()=> {
      getUser(id)
    },[])

    console.log(userInfo);

  return (
    <div onClick={() => navigate(`/messenger/${id}`)}>{renderUser}</div>
  )
}

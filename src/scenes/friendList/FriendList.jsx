import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import FriendBox from '../../components/FriendBox'

export default function FriendList() {
    const {userId} = useParams()
    const token = useSelector((state) => state.token)
    console.log(userId);

    const [friends, setFriends] = React.useState(null)

    const getFriends = async () => {
        const res = await fetch(`http://localhost:5000/users/${userId}/friends`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        })
        const data = await res.json();
        setFriends(data)
    }

    React.useEffect(() => {
        getFriends()
    }, [])

    console.log(friends);

    const renderFriendList = friends?.map((friend) => {
        return <FriendBox friendId={friend._id} occupation={friend.occupation} picturePath={friend.picturePath} friendName={`${friend.firstName} ${friend.lastName}`}/>
    })
  return (
    <div>
        <h1>Friends</h1>
        {renderFriendList}
    </div>
  )
}

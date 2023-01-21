import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NavBar from 'scenes/navBar/NavBar'
import FriendListWidget from 'scenes/widgets/FriendListWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'
import { setFriends } from 'state'

export default function ProfilePage() {

  const [user, setUser] = React.useState()
  const {userId} = useParams()
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInId = useSelector((state) => state.user._id)
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.find((friend) => friend._id/*Map of friends*/ === loggedInId/*LoggedInId*/);

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${userId}/${loggedInId}`,
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

  React.useEffect(() => {
    getUser()
  }, [])


  if(!user) return null


  const memberSince = new Date(user.createdAt);

  const options = { month: "long" };

  const displayAddButton = () => {
    if(isFriend){
      return <button onClick={patchFriend}>Remove Friend</button>
    } else {
      return <button onClick={patchFriend}>Add Friend</button>
    }
  }
  return (
    <div className='profile-page'>
      <NavBar />
      <div className='profile-head'>
        <img src={`http://localhost:5000/assets/${user.picturePath}`} alt=""/>
        <div className='info'>
          <h3>{`${user.firstName} ${user.lastName}`}</h3>
          <h4>{user.location}</h4>
          <h4>{user.occupation}</h4>
        </div>
        <h4>{`Member Since: ${new Intl.DateTimeFormat("en-US", options).format(memberSince)} ${new Date(user.createdAt).getYear() + 1900}`}</h4>
        {loggedInId !== userId && displayAddButton()}
      </div>
      
      
      <FriendListWidget userId={userId} />
      <PostsWidget userId={user._id}  isProfile="true"/>
    </div>
  )
}

import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FriendListWidget from 'scenes/widgets/FriendListWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'

export default function ProfilePage() {

  const [user, setUser] = React.useState()
  const {userId} = useParams()
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  React.useEffect(() => {
    getUser()
  }, [])

  if(!user) return null

  const {_id, firstName, lastName, location, occupation, picturePath, createdAt} = user
  const memberSince = new Date(createdAt);

  const options = { month: "long" };

  return (
    <div className='profile-page'>
      <h1>Profile Page</h1>
      <h3>{`${firstName} ${lastName}`}</h3>
      <h3>{location}</h3>
      <h3>{occupation}</h3>
      <img src={`http://localhost:5000/assets/${picturePath}`} alt=""/>
      <h3>{`Member Since: ${new Intl.DateTimeFormat("en-US", options).format(memberSince)} ${new Date(createdAt).getYear() + 1900}`}</h3>
      <FriendListWidget userId={userId} />
      <PostsWidget userId={_id}  isProfile="true"/>
    </div>
  )
}

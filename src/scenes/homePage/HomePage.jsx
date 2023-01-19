import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from 'scenes/navBar/NavBar'
import PostsWidget from 'scenes/widgets/PostsWidget'
import UserPostWidget from 'scenes/widgets/UserPostWidget'
import ProfileWidget from 'scenes/widgets/ProfileWidget'
import FriendListWidget from 'scenes/widgets/FriendListWidget'


export default function HomePage() {
  const { _id, picturePath, location, occupation, firstName, lastName} = useSelector((state) => state.user)
  return (
    <div>
      <NavBar />
      <h2>Homepage</h2>
      <div className='page-content'>
        
        <ProfileWidget picturePath={picturePath} location={location} occupation={occupation} name={firstName + ' ' +lastName}/>
        <div className='center'>
          <UserPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </div>
        <FriendListWidget userId={_id} />
        
      </div>
    </div>
  )
}

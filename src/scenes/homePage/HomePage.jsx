import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from 'scenes/navBar/NavBar'
import PostWidget from 'scenes/widgets/PostWidget'
import UserPostWidget from 'scenes/widgets/UserPostWidget'

export default function HomePage() {
  const { _id, picturePath } = useSelector((state) => state.user)
  return (
    <div>
      <NavBar />
      <h2>Homepage</h2>
      <UserPostWidget picturePath={picturePath} />
      <PostWidget userId={_id} />
    </div>
  )
}

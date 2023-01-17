import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from 'scenes/navBar/NavBar'
import PostsWidget from 'scenes/widgets/PostsWidget'
import UserPostWidget from 'scenes/widgets/UserPostWidget'

export default function HomePage() {
  const { _id, picturePath } = useSelector((state) => state.user)
  return (
    <div>
      <NavBar />
      <h2>Homepage</h2>
      <UserPostWidget picturePath={picturePath} />
      <PostsWidget userId={_id} />
    </div>
  )
}

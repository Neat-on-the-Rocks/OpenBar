import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from 'state';

export default function PostWidget({postId, likes, postUserId, name, location, userPicturePath, description, picturePath, comments}) {
    const [isComments, setIsComments] = React.useState(false)
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token)
    const loggedInUserId  = useSelector((state) => state.user._id)
    const isLiked = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length;

    const patchLikes = async () => {
        const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }
  return (
    <div className='post'>
        <p>Friend Id: {postUserId}</p>
        <p>Name: {name}</p>
        <p>Loaction: {location}</p>
        <p>Picture: {userPicturePath}</p>
        <p>description: {description}</p>
        {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:5000/assets/${picturePath}`}
        />
        )}
        <p onClick={patchLikes}>LikeButton</p> {/*Make sure to add conditional icon based on isLiked */}
        <p># comments {comments.length}</p> {/*Conditionally render comments*/}
        {isComments && (
            <div className='comments'>
                {comments.map((comment, i) => (
                    <div key={`${name}-${i}`}>
                        <p>{comment}</p>
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

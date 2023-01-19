import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends, setPost } from 'state';
import {AiTwotoneLike} from 'react-icons/ai'
import {IconContext} from 'react-icons'
import {FaComments} from 'react-icons/fa'
import {BsFillPersonPlusFill, BsFillPersonDashFill } from 'react-icons/bs'

export default function PostWidget({postId, likes, postUserId, name, location, userPicturePath, description, picturePath, comments}) {
    const [isComments, setIsComments] = React.useState(false)
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token)
    const loggedInUserId  = useSelector((state) => state.user._id)
    const isLiked = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length;
    const friends = useSelector((state) => state.user.friends)
    const isFriend = friends.some(friend => friend._id === postUserId)

    const displayIcon = () => {
        if (isFriend){
            return  <BsFillPersonDashFill size={20} onClick={patchFriend}/>
        } else {
            return <BsFillPersonPlusFill size={20} padding={5} onClick={patchFriend}/>
        }
    }

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

    const patchFriend = async () => {
        const response = await fetch(
          `http://localhost:5000/users/${loggedInUserId}/${postUserId}`,
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

  return (
    <div className='post-box'>
        <div className='space-between'>
            <div className="poster-info">
                <img src={`http://localhost:5000/assets/${userPicturePath}`} alt="" />
                <div className="text">
                    <h3>{name}</h3>
                    <p>{location}</p>
                </div>
            </div>
            { postUserId !== loggedInUserId && displayIcon()}
        </div>
        <p className="post-text">{description}</p>
        {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:5000/assets/${picturePath}`}
        />
        )}
        <div className="interact-post">
         {/*Make sure to add conditional icon based on isLiked */}
            <div className="comment-count">
                <IconContext.Provider value={isLiked && {color: 'red'}} >
                    {likeCount}
                    <AiTwotoneLike  size={20} onClick={patchLikes}/>
                </IconContext.Provider>
            </div>

            <div className="comment-count">
                {comments.length ? comments.length:0} <FaComments size={20}/>
            </div>

             {/*Conditionally render comments*/}
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

    </div>
  )
}

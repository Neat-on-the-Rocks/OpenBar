import FriendBox from 'components/FriendBox';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from 'state';

export default function FriendListWidget({userId}) {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  React.useEffect(() => {
    getFriends();
  }, []);
  
  return (
    <div className='friend-container'>
      <h2>Friends List</h2>
    {friends.map((friend) => {
      return <FriendBox key={`key${friend._id}`} friendId={friend._id} friendName={`${friend.firstName} ${friend.lastName}`} occupation={friend.occupation} picturePath={friend.picturePath}/>
    })}
    </div>
  )
}



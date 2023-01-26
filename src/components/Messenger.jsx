import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import NavBar from 'scenes/navBar/NavBar';
import MessageForm from './MessageForm';

export default function Messenger() {
    const {conversationId} = useParams()
    const [messages, setMessages] = React.useState(null)
    const [sessionNum, setSessionNum] = React.useState(0)
    const friends = useSelector((state) => state.user.friends);
    const user = useSelector((state) => state.user)
    
    const getMessages = async () => {
        const response = await fetch(
          `http://localhost:5000/message/${conversationId}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setMessages(data);
      };
      
      React.useEffect(()=> {
        getMessages()
      },[])

      const renderMessages= messages?.map(message => {
        const { picturePath} = user._id !== message.sender ? friends.find(friend => friend._id === message.sender) : user;

        return (
        <div className={`message-bubble ${user._id !== message.sender ? "friend-message-bubble": "user-message-bubble"}`}>
            <img src={`http://localhost:5000/assets/${picturePath}`} alt="" />
            <p>{message.text}</p>
        </div>
        )
      })

  return (
    <div>
        <NavBar />
        <div className='message-box'>
            {renderMessages}
            <MessageForm conversationId={conversationId} getMessages={() => getMessages()} sessionNum={sessionNum} setSessionNum={setSessionNum}/>
        </div>
    </div>
  )
}

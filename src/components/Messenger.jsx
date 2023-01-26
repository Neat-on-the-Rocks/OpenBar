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
        const userData = user._id !== message.sender ? friends.find(friend => friend._id === message.sender) : user;
        console.log(userData);
        return (
        <div>
            <h3>{`${userData?.firstName} ${userData?.lastName}`}</h3>
            <h3>{message.createdAt}</h3>
            <h3>{message.text}</h3>
        </div>
        )
      })

  return (
    <div>
        <NavBar />
        {renderMessages}
        <MessageForm conversationId={conversationId} getMessages={() => getMessages()} sessionNum={sessionNum} setSessionNum={setSessionNum}/>
    </div>
  )
}

import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from 'scenes/navBar/NavBar';
import MessageForm from './MessageForm';

export default function Messenger() {
    const {conversationId} = useParams()
    const [messages, setMessages] = React.useState(null)
    const [sessionNum, setSessionNum] = React.useState(0)
    
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
      },[sessionNum])

      const renderMessages = messages?.map(message => {
        return (
        <div>
            <h3>{message.sender}</h3>
            <h3>{message.createdAt}</h3>
            <h3>{message.text}</h3>
        </div>
        )
      })

  return (
    <div>
        <NavBar />
        {renderMessages}
        <MessageForm conversationId={conversationId} sessionNum={sessionNum} setSessionNum={setSessionNum}/>
    </div>
  )
}

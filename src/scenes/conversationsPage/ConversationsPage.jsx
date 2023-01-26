import ConversationBox from 'components/ConversationBox'
import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from 'scenes/navBar/NavBar'

export default function ConversationsPage() {

    const [conversations, setConversations] = React.useState(null)
    const {userId} = useParams()

    const getConversations = async () => {
        const response = await fetch(
            `http://localhost:5000/conversation/${userId}`,
            {
                method: "GET"
            }
        )

        const data = await response.json();
        setConversations(data)
    }
    console.log(conversations)

    React.useEffect(() => {
        getConversations()
    }, [])

    const renderConversations = conversations?.map(conversation => {
        return <ConversationBox key={`Conv-${conversation._id}`} id={conversation._id} members={conversation.members} /> 
    })

  return (
    <div>
        <NavBar />
        {renderConversations}
    </div>
  )
}

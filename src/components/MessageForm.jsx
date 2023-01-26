import React from 'react'
import { useSelector } from 'react-redux'

export default function MessageForm({conversationId, sessionNum, setSessionNum}) {

    const loggedInId = useSelector((state) => state.user._id)
    const [text, setText] = React.useState("")

    const newMessage = async(e)=> {
        e.preventDefault()
        
        const formData = {
            conversationId: conversationId,
            sender: loggedInId,
            text: text,
        }

        const message = await fetch(
            `http://localhost:5000/message/`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            }
        )
        setText("")
        setSessionNum(() => sessionNum+1)
        await message.json();
        

    }
  return (
    <form onSubmit={(e) => newMessage(e)}>
        <input type="text" name="text" placeholder='message' value={text} onChange={(e) => setText(e.target.value)}/>
    </form>
  )
}

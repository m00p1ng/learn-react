import React, { useEffect, useState } from 'react'
import { Segment, Comment } from 'semantic-ui-react'

import firebase from '../../firebase'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'
import Message from './Message'

const useMessages = ({ messageRef, currentChannel, currentUser }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentChannel && currentUser) {
      addListeners(currentChannel.id)
    }

    return () => { }
  }, [])

  const addListeners = (channelId) => {
    addMessMessageListener(channelId)
  }

  const addMessMessageListener = (channelId) => {
    messageRef
      .child(channelId)
      .on('child_added', (snap) => {
        setMessages((prevMessages) => prevMessages.concat(snap.val()))
        setLoading(false)
      })
  }

  return {
    messages,
    loading,
  }
}

function Messages({ currentChannel, currentUser }) {
  const messageRef = firebase.database().ref('messages')
  const { messages } = useMessages({ messageRef, currentUser, currentChannel })

  const displayMessages = (messages) => (
    messages.length > 0 && messages.map((message) => (
      <Message
        key={message.timestamp}
        message={message}
        user={currentUser}
      />
    ))
  )

  return (
    <>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="messages">
          {displayMessages(messages)}
        </Comment.Group>

      </Segment>
      <MessageForm
        messageRef={messageRef}
        currentUser={currentUser}
        currentChannel={currentChannel}
      />
    </>
  )
}

export default Messages
import React, { useEffect, useState } from 'react'
import { Segment, Comment } from 'semantic-ui-react'

import firebase from '../../firebase'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'
import Message from './Message'

export default function Messages({ currentChannel, currentUser }) {
  const [messageRef] = useState(firebase.database().ref('messages'))
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
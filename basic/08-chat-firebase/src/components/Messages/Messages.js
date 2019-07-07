import React, { useEffect, useState } from 'react'
import { Segment, Comment } from 'semantic-ui-react'

import firebase from '../../firebase'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'
import Message from './Message'

const useMessages = ({ messageRef, currentChannel, currentUser }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [progressBar, setProgressBar] = useState(false)

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
    progressBar,

    setProgressBar,
  }
}

function Messages({ currentChannel, currentUser }) {
  const messageRef = firebase.database().ref('messages')
  const { messages, progressBar, setProgressBar } = useMessages({ messageRef, currentUser, currentChannel })

  const displayMessages = (messages) => (
    messages.length > 0 && messages.map((message) => (
      <Message
        key={message.timestamp}
        message={message}
        user={currentUser}
      />
    ))
  )

  const isProgressBarVisible = (percent) => {
    if (percent > 0) {
      setProgressBar(true)
    } else {
      setProgressBar(false)
    }
  }

  return (
    <>
      <MessagesHeader />

      <Segment>
        <Comment.Group className={progressBar ? 'messages__progress' : 'messages'}>
          {displayMessages(messages)}
        </Comment.Group>

      </Segment>
      <MessageForm
        messageRef={messageRef}
        currentUser={currentUser}
        currentChannel={currentChannel}
        isProgressBarVisible={isProgressBarVisible}
      />
    </>
  )
}

export default Messages
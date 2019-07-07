import React, { useEffect, useState } from 'react'
import { Segment, Comment } from 'semantic-ui-react'

import firebase from '../../firebase'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'
import Message from './Message'

const useMessages = ({ currentChannel, currentUser, isPrivateChannel }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [progressBar, setProgressBar] = useState(false)
  const [numUniqueUsers, setNumUniqueUsers] = useState(null)

  const privateMessagesRef = firebase.database().ref('privateMessages')
  const messagesRef = firebase.database().ref('messages')

  useEffect(() => {
    if (currentChannel && currentUser) {
      addListeners(currentChannel.id)
    }

    return () => { }
  }, [])

  useEffect(() => {
    countUniqueUsers(messages)
  }, [messages])

  const addListeners = (channelId) => {
    addMessMessageListener(channelId)
  }

  const addMessMessageListener = (channelId) => {
    getMessagesRef().child(channelId)
      .on('child_added', (snap) => {
        setMessages((prevMessages) => prevMessages.concat(snap.val()))
        setLoading(false)
      })
  }

  const countUniqueUsers = (messages) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name)
      }
      return acc
    }, [])

    setNumUniqueUsers(`${uniqueUsers.length} users`)
  }

  const getMessagesRef = () => {
    return isPrivateChannel ? privateMessagesRef : messagesRef
  }

  return {
    messages,
    loading,
    progressBar,
    numUniqueUsers,

    setProgressBar,
    getMessagesRef,
  }
}

const useSearch = ({ messages }) => {
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => {
    handleSearchMessage()
  }, [term])

  const handleSearchChange = (event) => {
    setTerm(event.target.value)
    setLoading(true)
  }

  const handleSearchMessage = () => {
    const channelMessages = [...messages]
    const regex = new RegExp(term, 'gi')
    const searchResults = channelMessages.reduce((acc, message) => {
      if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
        acc.push(message)
      }

      return acc;
    }, [])

    setResults(searchResults)
    setTimeout(() => { setLoading(false) }, 1000)
  }

  return {
    term,
    loading,
    results,

    handleSearchChange,
  }
}

function Messages({ currentChannel, currentUser, isPrivateChannel }) {
  const {
    messages,
    progressBar,
    numUniqueUsers,

    setProgressBar,
    getMessagesRef,
  } = useMessages({ currentUser, currentChannel, isPrivateChannel })
  const {
    term: searchTerm,
    loading: searchLoading,
    results: searchResults,

    handleSearchChange,
  } = useSearch({ messages })

  const displayMessages = (messages) => (
    messages.length > 0 && messages.map((message) => (
      <Message
        key={message.timestamp}
        message={message}
        user={currentUser}
      />
    ))
  )

  const displayChannelName = (channel) => {
    return channel ? `${isPrivateChannel ? '@' : '#'} ${channel.name}` : ''
  }

  const isProgressBarVisible = (percent) => {
    if (percent > 0) {
      setProgressBar(true)
    } else {
      setProgressBar(false)
    }
  }

  return (
    <>
      <MessagesHeader
        channelName={displayChannelName(currentChannel)}
        numUniqueUsers={numUniqueUsers}
        handleSearchChange={handleSearchChange}
        searchLoading={searchLoading}
        isPrivateChannel={isPrivateChannel}
      />

      <Segment>
        <Comment.Group className={progressBar ? 'messages__progress' : 'messages'}>
          {searchTerm
            ? displayMessages(searchResults)
            : displayMessages(messages)
          }
        </Comment.Group>

      </Segment>
      <MessageForm
        currentUser={currentUser}
        currentChannel={currentChannel}
        isProgressBarVisible={isProgressBarVisible}
        isPrivateChannel={isPrivateChannel}
        getMessagesRef={getMessagesRef}
      />
    </>
  )
}

export default Messages
import React, { useState } from 'react'
import { Segment, Button, Input } from 'semantic-ui-react'

import firebase from '../../firebase'

const useMessage = ({ currentUser, messageRef, currentChannel }) => {
  const [message, setMessage] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  const createMessage = () => {
    return {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
      content: message,
    }
  }

  const sendMessage = async () => {
    if (message) {
      setLoading(true)
      try {
        await messageRef
          .child(currentChannel.id)
          .push()
          .set(createMessage())

        setMessage('')
        setErrors([])
      } catch (error) {
        setErrors((prevErrors) => prevErrors.concat(error))
        console.error(error)
      } finally {
        setLoading(false)
      }
    } else {
      setErrors((prevErrors) => prevErrors.concat({ message: "Add a message" }))
    }
  }

  return {
    loading,
    errors,
    message,

    handleChange,
    sendMessage,
  }
}

function MessageForm({ messageRef, currentChannel, currentUser }) {
  const {
    loading,
    errors,
    message,
    handleChange,
    sendMessage,
  } = useMessage({ messageRef, currentChannel, currentUser })

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        onChange={handleChange}
        value={message}
        style={{ marginBottom: '0.7em' }}
        label={<Button icon="add" />}
        labelPosition="left"
        placeholder="Write you message"
        className={errors.some(error => error.message.includes('message')) ? "error" : ""}
      />
      <Button.Group icon widths="2">
        <Button
          onClick={sendMessage}
          disabled={loading}
          color="orange"
          content="Add reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  )
}

export default MessageForm
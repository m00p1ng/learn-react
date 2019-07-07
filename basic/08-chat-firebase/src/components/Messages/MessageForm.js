import React, { useState, useEffect } from 'react'
import uuidv4 from 'uuidv4'
import { Segment, Button, Input } from 'semantic-ui-react'

import FileModal from './FileModal'
import firebase from '../../firebase'

const createMessage = ({ currentUser, message = null, fileUrl = null }) => {
  const newMessage = {
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    user: {
      id: currentUser.uid,
      name: currentUser.displayName,
      avatar: currentUser.photoURL,
    },
  }

  if (fileUrl !== null) {
    newMessage['image'] = fileUrl
  } else {
    newMessage['content'] = message
  }

  return newMessage
}
const useModal = () => {
  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  return {
    modal,

    openModal,
    closeModal,
  }
}

const useMessage = ({ messageRef, currentChannel }) => {
  const [message, setMessage] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleChange = (event) => {
    setMessage(event.target.value)
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

const useFileUpload = ({ messageRef, currentChannel, currentUser }) => {
  const [uploadState, setUploadState] = useState('')
  const [percentUploaded, setPercentUploaded] = useState(0)
  const [errors, setErrors] = useState([])
  const storageRef = firebase.storage().ref()

  const sendFileMessage = async (fileUrl, ref, pathToUpload) => {
    ref.child(pathToUpload)
      .push()
      .set(createMessage({ currentUser, fileUrl }))
      .then(() => {
        setUploadState('done')
      })
      .catch((err) => {
        setErrors((prevError) => prevError.concat(err))
      })
  }

  const uploadFile = (file, metadata) => {
    const filePath = `chat/public/${uuidv4()}.jpg`
    setUploadState('uploading')
    const uploadTask = storageRef.child(filePath).put(file, metadata)

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snap) => {
      const percent = Math.round(snap.bytesTransferred / snap.totalBytes) * 100
      setPercentUploaded(percent)
    }, (err) => {
      setErrors((prevErrors) => prevErrors.concat(err))
      setUploadState('error')
    }, () => {
      console.log("IME HERER")
      const pathToUpload = currentChannel.id
      const ref = messageRef
      uploadTask.snapshot.ref.getDownloadURL()
        .then((downloadURL) => {
          sendFileMessage(downloadURL, ref, pathToUpload)
        })
        .catch((err) => {
          setErrors((prevErrors) => prevErrors.concat(err))
          setUploadState('error')
        })
    })
  }

  return {
    errors,
    uploadState,
    percentUploaded,

    uploadFile,
  }
}

function MessageForm({ messageRef, currentChannel, currentUser }) {
  const [errors, setErrors] = useState([])
  const {
    loading,
    errors: messageErrors,
    message,

    handleChange,
    sendMessage,
  } = useMessage({ messageRef, currentChannel, currentUser })
  const { modal, openModal, closeModal } = useModal()
  const {
    errors: uploadErrors,
    uploadFile,
  } = useFileUpload({ messageRef, currentChannel, currentUser })

  useEffect(() => {
    setErrors([
      ...messageErrors,
      ...uploadErrors,
    ])
  }, [messageErrors, uploadErrors])


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
          onClick={openModal}
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
        <FileModal
          modal={modal}
          closeModal={closeModal}
          uploadFile={uploadFile}
        />
      </Button.Group>
    </Segment>
  )
}

export default MessageForm
import React, { useState } from 'react'
import mime from 'mime-types'
import { Modal, Input, Button, Icon } from 'semantic-ui-react'

const useFile = ({ closeModal, uploadFile }) => {
  const [file, setFile] = useState(null)
  const authorized = [
    'image/jpeg',
    'image/png'
  ]

  const addFile = (event) => {
    const fileData = event.target.files[0]
    if (fileData) {
      setFile(fileData)
    }
  }

  const sendFile = () => {
    if (file !== null) {
      console.log(file)
      if (isAuthorized(file.name)) {
        const metadata = {
          contentType: mime.lookup(file.name)
        }
        uploadFile(file, metadata);
        closeModal()
        clearFile()
      }
    }
  }

  const isAuthorized = (filename) => {
    return authorized.includes(mime.lookup(filename))
  }

  const clearFile = () => {
    setFile(null)
  }

  return {
    addFile,
    sendFile,
  }
}

function FileModal({ modal, closeModal, uploadFile }) {
  const { addFile, sendFile } = useFile({ closeModal, uploadFile })

  return (
    <Modal basic open={modal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          onChange={addFile}
          label="File type: .jpg, png"
          name="file"
          type="file"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={sendFile}
          color="green"
          inverted
        >
          <Icon name="checkmark" /> Send
        </Button>
        <Button
          color="red"
          inverted
          onClick={closeModal}
        >
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default FileModal
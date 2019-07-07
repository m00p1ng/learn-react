import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

import { setCurrentChannel } from '../../actions'
import firebase from '../../firebase'

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

const useChannel = ({ currentUser, closeModal }) => {
  const [channels, setChannels] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [activeChannel, setActiveChannel] = useState("")
  const [form, setForm] = useState({
    channelName: "",
    channelDetails: "",
  })

  const dispatch = useDispatch()
  const channelsRef = useRef(firebase.database().ref('channels'))

  useEffect(() => {
    channelsRef.current.on('child_added', snap => {
      setChannels((prevChannels) => [...prevChannels, snap.val()])
    })

    return removeListeners
  }, [])

  useEffect(() => {
    if (firstLoad && channels.length > 0) {
      const firstChannel = channels[0]
      setFirstLoad(false)
      dispatch(setCurrentChannel(firstChannel))
      setActiveChannel(firstChannel.id)
    }
  }, [channels, dispatch, firstLoad])

  const removeListeners = () => {
    channelsRef.current.off()
  }

  const handleChange = (event) => {
    event.persist()
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isFormValid(form)) {
      addChannel()
    }
  }

  const addChannel = async () => {
    const key = channelsRef.current.push().key
    const { channelName, channelDetails } = form

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      }
    }

    await channelsRef.current
      .child(key)
      .update(newChannel)

    setForm({
      channelName: "",
      channelDetails: "",
    })

    closeModal()
  }

  const isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails

  const changeChannel = (channel) => {
    setActiveChannel(channel.id)
    dispatch(setCurrentChannel(channel))
  }

  return {
    channels,
    activeChannel,

    changeChannel,
    handleChange,
    handleSubmit,
  }
}

function Channels({ currentUser }) {
  const { modal, openModal, closeModal } = useModal()
  const {
    channels,
    activeChannel,

    changeChannel,
    handleChange,
    handleSubmit,
  } = useChannel({ currentUser, closeModal })

  const displayChannels = (channels) => (
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ))
  )

  return (
    <>
      <Menu.Menu style={{ paddingBottom: '2em' }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels{' '}
          </span>
          ({channels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {displayChannels(channels)}
      </Menu.Menu>

      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default Channels
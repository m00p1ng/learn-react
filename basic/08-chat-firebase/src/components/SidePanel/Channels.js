import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Menu, Icon, Modal, Form, Input, Button, Label } from 'semantic-ui-react';

import { setCurrentChannel, setPrivateChannel } from '../../actions'
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
  const [channel, setChannel] = useState(null)
  const [channels, setChannels] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [activeChannel, setActiveChannel] = useState("")
  const [notifications, setNotifications] = useState([])
  const [form, setForm] = useState({
    channelName: "",
    channelDetails: "",
  })

  const dispatch = useDispatch()
  const channelsRef = firebase.database().ref('channels')
  const messagesRef = firebase.database().ref('messages')

  useEffect(() => {
    channelsRef.on('child_added', snap => {
      setChannels((prevChannels) => {
        const channelsId = prevChannels.map((channel) => channel.id)
        const index = channelsId.indexOf(snap.key)

        if (index !== -1) {
          prevChannels[index] = snap.val()
          return prevChannels
        } else {
          return prevChannels.concat(snap.val())
        }
      })
      messagesRef.child(snap.key).on('value', (snap) => {
        if (channel) {
          handleNotifications(snap.key, channel.id, notifications, snap)
        }
      })
    })

    return removeListeners
  }, [channel])

  useEffect(() => {
    if (firstLoad && channels.length > 0) {
      const firstChannel = channels[0]
      setFirstLoad(false)
      dispatch(setCurrentChannel(firstChannel))
      setActiveChannel(firstChannel.id)
      setChannel(firstChannel)
    }
  }, [channels, dispatch, firstLoad])

  const handleNotifications = (channelId, currentChannelId, notifications, snap) => {
    let lastTotal = 0

    let index = notifications.findIndex(notification => notification.id === channelId)

    if (index !== -1) {
      if (channelId !== currentChannelId) {
        lastTotal = notifications[index].total

        if (snap.numChildren() - lastTotal > 0) {
          notifications[index].count = snap.numChildren() - lastTotal;
        }
      }
      notifications[index].lastKnownTotal = snap.numChildren()
    } else {
      notifications.push({
        id: channelId,
        total: snap.numChildren(),
        lastKnownTotal: snap.numChildren(),
        count: 0,
      })
    }

    setNotifications(notifications)
  }

  const removeListeners = () => {
    channelsRef.off()
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
    const key = channelsRef.push().key
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

    await channelsRef.child(key).update(newChannel)

    setForm({
      channelName: "",
      channelDetails: "",
    })

    closeModal()
  }

  const isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails

  const changeChannel = (channel) => {
    setActiveChannel(channel.id)
    clearNotifications()
    dispatch(setCurrentChannel(channel))
    dispatch(setPrivateChannel(false))
    setChannel(channel)
  }

  const clearNotifications = () => {
    let index = notifications.findIndex(notification => notification.id === channel.id)

    if (index !== -1) {
      let updatedNotifications = [...notifications]
      updatedNotifications[index].total = notifications[index].lastKnownTotal
      updatedNotifications[index].count = 0
      setNotifications(updatedNotifications)
    }
  }

  const getNotificationCount = (channel) => {
    let count = 0

    notifications.forEach(notification => {
      if (notification.id === channel.id) {
        count = notification.count
      }
    })

    if (count > 0) {
      return count
    }
  }

  return {
    channels,
    activeChannel,

    changeChannel,
    handleChange,
    handleSubmit,
    getNotificationCount,
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
    getNotificationCount,
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
        {getNotificationCount(channel) && (
          <Label color="red">{getNotificationCount(channel)}</Label>
        )}
        # {channel.name}
      </Menu.Item>
    ))
  )

  return (
    <>
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels{' '}
          </span>
          ({channels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {displayChannels(channels)}
      </Menu.Menu>

      <Modal open={modal} onClose={closeModal}>
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
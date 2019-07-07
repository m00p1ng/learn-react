import React, { useState, useEffect } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'

import { setCurrentChannel, setPrivateChannel } from '../../actions'
import firebase from '../../firebase'

const useUsers = ({ currentUser }) => {
  const [users, setUsers] = useState([])
  const [activeChannel, setActiveChannel] = useState()
  const userRef = firebase.database().ref('users')
  const presenceRef = firebase.database().ref('presence')
  const connectedRef = firebase.database().ref('.info/connected')

  useEffect(() => {
    if (currentUser) {
      addListeners(currentUser.uid)
    }
  }, [users.length])

  const addListeners = (currentUserUid) => {
    let loadedUsers = []
    userRef.on('child_added', (snap) => {
      if (currentUserUid !== snap.key) {
        let user = snap.val()
        user['uid'] = snap.key
        user['status'] = 'offline'
        loadedUsers.push(user)
        setUsers(loadedUsers)
      }
    })

    connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        const ref = presenceRef.child(currentUserUid)
        ref.set(true)
        ref.onDisconnect().remove(err => {
          if (err !== null) {
            console.error(err)
          }
        })
      }
    })

    presenceRef.on('child_added', (snap) => {
      if (currentUserUid !== snap.key) {
        addStatusToUser(snap.key)
      }
    })

    presenceRef.on('child_removed', (snap) => {
      if (currentUserUid !== snap.key) {
        addStatusToUser(snap.key, false)
      }
    })
  }

  const addStatusToUser = (userId, connected = true) => {
    const updatedUsers = users.reduce((acc, user) => {
      if (user.uid === userId) {
        user['status'] = connected ? 'online' : 'offline'
      }
      return acc.concat(user)
    }, [])
    setUsers(updatedUsers)
  }

  return {
    users,
    activeChannel,

    setActiveChannel,
  }
}

function DirectMessages({ currentUser }) {
  const { users, activeChannel, setActiveChannel } = useUsers({ currentUser })
  const dispatch = useDispatch()

  const isUserOnline = (user) => user.status === 'online'

  const changeChannel = (user) => {
    const channelId = getChannelId(user.uid)
    const channelData = {
      id: channelId,
      name: user.name,
    };
    dispatch(setCurrentChannel(channelData))
    dispatch(setPrivateChannel(true))
    setActiveChannel(user.uid)
  }

  const getChannelId = (userId) => {
    const currentUserId = currentUser.uid
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`
  }

  return (
    <Menu.Menu>
      <Menu.Item>
        <span>
          <Icon name="mail" /> Direct Messages
        </span>{' '}
        ({users.length})
      </Menu.Item>
      {users.map(user => (
        <Menu.Item
          key={user.uid}
          active={user.uid === activeChannel}
          onClick={() => changeChannel(user)}
          style={{ opacity: 0.7, fontStyle: 'italic' }}
        >
          <Icon
            name="circle"
            color={isUserOnline(user) ? 'green' : 'red'}
          />
          @ {user.name}
        </Menu.Item>
      ))}
    </Menu.Menu>
  )
}

export default DirectMessages
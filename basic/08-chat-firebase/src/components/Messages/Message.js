import React from 'react'
import moment from 'moment'
import { Comment } from "semantic-ui-react"

function Message({ message, user }) {
  const isOwnMessage = (message, user) => {
    return message.user.id === user.id ? "message__self" : ""
  }

  const timeFromNow = (timestamp) => {
    return moment(timestamp).fromNow()
  }

  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar}></Comment.Avatar>
      <Comment.Content className={isOwnMessage(message, user)}>
        <Comment.Author as="a">{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default Message
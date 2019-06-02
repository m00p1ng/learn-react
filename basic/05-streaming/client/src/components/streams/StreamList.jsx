import React, { useEffect } from 'react'
import { Link } from '@reach/router'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'

function StreamList({ streams, currentUserId, isSignedIn, fetchStreams }) {
  useEffect(() => {
    fetchStreams()
  }, [])

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <Link to="/streams/new" className="button is-primary">
          Create Stream
        </Link>
      )
    }
  }

  const renderAdmin = (stream) => {
    if (stream.userId === currentUserId) {
      return (
        <div className="buttons">
          <Link
            to={`/streams/edit/${stream.id}`}
            className="button is-warning"
          >
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="button is-danger"
          >
            Delete
          </Link>
        </div>
      )
    }
  }

  const renderList = () => {
    return streams.map(stream => {
      return (
        <div className="list-item" key={stream.id}>
          <Link to={`/streams/${stream.id}`}>
            {stream.title} - {stream.description}
          </Link>
          {renderAdmin(stream)}
        </div>
      )
    })
  }

  return (
    <>
      <h2 className="is-size-2">Streams</h2>
      <div className="list is-hoverable" >
        {renderList()}
      </div>
      {renderCreate()}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(
  mapStateToProps,
  { fetchStreams },
)(StreamList)
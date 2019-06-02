import React, { useEffect } from 'react'
import { navigate, Link } from '@reach/router'
import { connect } from 'react-redux'

import { fetchStream, deleteStream } from '../../actions'
import Modal from '../Modal'

function StreamDelete({ fetchStream, deleteStream, id, stream }) {
  useEffect(() => {
    fetchStream(id)
  }, [])

  const actions = (
    <>
      <button className="button is-danger" onClick={() => deleteStream(id)}>Delete</button>
      <Link to="/" className="button">Cancel</Link>
    </>
  )

  const renderContent = () => {
    if (!stream) {
      return 'Are you sure you want to delete this stream?'
    } else {
      return `Are you sure you want to delete the stream with title: ${stream.title}`
    }
  }

  return (
    <div>
      StreamDelete
      <Modal
        title="Delete Stream"
        content={renderContent()}
        actions={actions}
        onDismiss={() => navigate('/')}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.id],
  }
}

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete)
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import StreamForm from './StreamForm'
import { fetchStream, editStream } from '../../actions'

function StreamEdit({ fetchStream, editStream, id, stream }) {
  useEffect(() => {
    fetchStream(id)
  }, [])

  const onSubmit = (formValues) => {
    editStream(id, formValues)
  }

  if (!stream) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3 className="is-size-3">Edit a Stream</h3>
      <StreamForm
        onSubmit={onSubmit}
        initialValue={_.pick(stream, 'title', 'description')}
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
  { fetchStream, editStream },
)(StreamEdit)
import React from 'react'
import { connect } from 'react-redux'

import StreamForm from './StreamForm'
import { createStream } from '../../actions'

function StreamCreate({ createStream }) {
  const onSubmit = (formValues) => {
    createStream(formValues)
  }

  return (
    <div>
      <h3 className="is-size-3">Create a Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  )
}

export default connect(
  null,
  { createStream }
)(StreamCreate)
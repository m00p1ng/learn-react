import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import flv from 'flv.js'

import { fetchStream } from '../../actions'

const StreamShow = ({ id, stream, fetchStream }) => {
  const videoRef = useRef()
  const playerRef = useRef()

  useEffect(() => {
    fetchStream(id)
    buildPlayer()
  }, [playerRef.current])

  const buildPlayer = () => {
    if (playerRef || !stream) {
      return
    }

    playerRef.current = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    })
    playerRef.current.attachMediaElement(videoRef.current)
    playerRef.current.load()
  }

  if (!stream) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls />
      <h1 className="is-size-1">{stream.title}</h1>
      <h5 className="is-size-5">{stream.description}</h5>
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
  { fetchStream },
)(StreamShow)
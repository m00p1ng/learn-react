import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { signIn, signOut } from '../actions'
import googleAuth from '../googleAuth.json'

function GoogleAuth({ signIn, signOut, isSignedIn }) {
  const auth = useRef(null)

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      signIn(auth.current.currentUser.get().getId())
    } else {
      signOut()
    }
  }

  const onSignInClick = () => {
    auth.current.signIn()
  }

  const onSignOutClick = () => {
    auth.current.signOut()
  }

  useEffect(() => {
    window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        ...googleAuth,
        scope: 'email',
      })
      auth.current = window.gapi.auth2.getAuthInstance()
      onAuthChange(auth.current.isSignedIn.get())
      auth.current.isSignedIn.listen(onAuthChange)
    })
  }, [])

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null
    } else if (isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="button">
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={onSignInClick} className="button">
          Sign In with Google
        </button>
      )
    }
  }

  return (
    <>{renderAuthButton()}</>
  )
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
  mapStateToProps, { signIn, signOut }
)(GoogleAuth)
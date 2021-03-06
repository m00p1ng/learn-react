import React from 'react';
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import MetalPanel from './MetalPanel/MetalPanel'

function Home({ currentUser, currentChannel, isPrivateChannel }) {
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel
        key={currentUser && currentUser.id}
        currentUser={currentUser}
      />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
          isPrivateChannel={isPrivateChannel}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetalPanel />
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
})

export default connect(mapStateToProps)(Home)
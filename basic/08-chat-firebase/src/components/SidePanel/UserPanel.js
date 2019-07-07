import React from 'react'
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react'

import firebase from "../../firebase"

function UserPanel({ currentUser }) {
  const handleSignOut = () => {
    firebase.auth().signOut()
  }

  const dropdownOptions = () => [
    {
      key: "user",
      text: <span>Signed in as <strong>{currentUser.displayName}</strong></span>,
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signOut",
      text: <span onClick={handleSignOut}>Sign Out</span>
    }
  ]

  if(!currentUser) {
    return null
  }

  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>Eiei Chat</Header.Content>
          </Header>

          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={currentUser.photoURL} space="right" avatar />{' '}
                  {currentUser.displayName}
                </span>
              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  )
}

export default UserPanel
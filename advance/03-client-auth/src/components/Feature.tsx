import * as React from 'react'
import requireAuth from './requireAuth'

class Feature extends React.Component {
  public render() {
    return (
      <div>
        This is the feature page
      </div>
    )
  }
}

export default requireAuth(Feature) 
import * as React from 'react'
import { connect } from 'react-redux'

interface Props {
  history: any
  auth: boolean
}

export default (ChildComponent: React.ComponentType) => {
  class ComposedComponent extends React.Component<Props> {
    public componentDidMount() {
      this.shouldNavigateAway()
    }

    public componentDidUpdate() {
      this.shouldNavigateAway()
    }

    public shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push('/')
      }
    }

    public render() {
      return <ChildComponent {...this.props} />
    }
  }

  function mapStateToProps(state: any) {
    return { auth: state.auth.authenticated }
  }

  return connect(mapStateToProps)(ComposedComponent)
}

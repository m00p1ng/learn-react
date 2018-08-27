import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import * as actions from '../../actions'

interface Props {
  errorMessage: string
  history: any
  signup(formProps: any, callback: any): any,
}

class Signup extends React.Component<InjectedFormProps & Props> {
  public onSubmit = (formProps: any) => {
    this.props.signup(formProps, () => {
      this.props.history.push('/feature')
    })
  }

  public render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label >Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    errorMessage: state.auth.errorMessage,
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' }),
)(Signup)
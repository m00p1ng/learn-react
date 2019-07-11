import React from 'react';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';

import './SignIn.scss';

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: '', password: '' });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form action="">
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            label="email"
            onChange={this.handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            label="password"
            onChange={this.handleChange}
          />
          <CustomButton type="submit">Sign In</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignIn;

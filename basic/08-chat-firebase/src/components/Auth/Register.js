import React, { useState, useRef } from 'react';
import { Link } from "@reach/router";
import md5 from 'md5';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";

import firebase from '../../firebase';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const userRef = useRef(firebase.database().ref('users'))

  const isFormValid = () => {
    let error

    if (isFormEmpty({ username, email, password, passwordConfirmation })) {
      error = { message: 'Fill in all fields' }
      setErrors((prevErrors) => [...prevErrors, error])
      return false;
    } else if (!isPasswordValid({ password, passwordConfirmation })) {
      error = { message: 'Password is invalid' }
      setErrors((prevErrors) => [...prevErrors, error])
      return false;
    } else {
      return true;
    }
  }

  const isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length
  }

  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation < 6) {
      return false
    } else if (password !== passwordConfirmation) {
      return false
    } else {
      return true
    }
  }

  const displayErrors = errors => errors.map(error => <p key={error.message}>{error.message}</p>)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setErrors([])
      setLoading(true)
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)

        console.log(createdUser)
        await createdUser.user.updateProfile({
          displayName: username,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
        })

        await saveUser(createdUser)
        console.log('user saved')
      } catch (err) {
        console.log(err)
        setErrors((prevErrors) => [...prevErrors, err])
      } finally {
        setLoading(false)
      }
    }
  }

  const handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : ""
  }

  const saveUser = (createdUser) => {
    return userRef.current.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    })
  }

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }} >
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for Eiei chat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              type="text"
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              className={handleInputError(errors, 'email')}
              type="email"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              className={handleInputError(errors, 'password')}
              type="password"
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              value={passwordConfirmation}
              className={handleInputError(errors, 'password')}
              type="password"
            />
            <Button className={loading ? 'loading' : ''} color="orange" fluid size="large">Submit</Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid >
  )
}
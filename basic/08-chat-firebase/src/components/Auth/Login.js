import React, { useState } from 'react';
import { Link } from "@reach/router";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";

import firebase from 'firebase'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const displayErrors = errors => errors.map(error => <p key={error.message}>{error.message}</p>)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setErrors([])
      setLoading(true)

      try {
        const signedInUser = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)

        console.log(signedInUser)
      } catch (err) {
        console.error(err)
        setErrors((prevErrors) => [...prevErrors, err])
      } finally {
        setLoading(false)
      }
    }
  }

  const isFormValid = () => {
    return email && password;
  }

  const handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : ""
  }

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }} >
        <Header as="h2" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to Eiei chat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
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
            <Button className={loading ? 'loading' : ''} color="violet" fluid size="large">Submit</Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid >
  )
}
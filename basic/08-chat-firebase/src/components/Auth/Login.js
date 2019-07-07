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

import firebase from '../../firebase'

const useLoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid(form)) {
      setErrors([])
      setLoading(true)

      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(form.email, form.password)
      } catch (err) {
        setErrors((prevErrors) => prevErrors.concat(err))
      } finally {
        setLoading(false)
      }
    }
  }

  const handleFormChange = (event) => {
    event.persist()
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }))
  }

  const isFormValid = ({ email, password }) => {
    return email && password;
  }

  return {
    form,
    errors,
    loading,

    handleFormChange,
    handleSubmit,
  }
}

export default function Login() {
  const { form, errors, loading, handleFormChange, handleSubmit } = useLoginForm();
  const { email, password } = form;

  const displayErrors = errors => errors.map(error => <p key={error.message}>{error.message}</p>)
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
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
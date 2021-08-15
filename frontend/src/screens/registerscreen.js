import React, { useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'

const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$')

const Registerscreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [err, setErrorMessage] = useState('')
  const Register = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmpassword) {
      setErrorMessage('All fields are required')
    } else if (password.length < 6) {
      setErrorMessage('Password should be more than 6 characters.')
    } else if (password !== confirmpassword) {
      setErrorMessage('Confirm Password does not match.')
    } else if (!validPassword.test(password)) {
      setErrorMessage(
        'Password must be a combination of atleast 1 Uppercase, 1 Lowercase, 1 number, and 1 Special Symbol'
      )
    } else {
      alert('Registered successfully. Please Signin to Continue.')
      window.location.href = '/login'
      await axios.post(
        '/api/user/register',
        { name, email, password }
      )
    }
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {err && <Message variant='danger'>{err}</Message>}
      <Form on onSubmit={Register}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account? <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
export default Registerscreen

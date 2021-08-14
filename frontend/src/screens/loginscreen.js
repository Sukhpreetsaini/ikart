import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import token from 'jsonwebtoken'
import Cookies from 'universal-cookie'


const Loginscreen = ({ history }) => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [users, setusers] = useState({})
  const [err, setErrorMessage] = useState('')
  const cookies = new Cookies()
  useEffect(() => {
    const getusers = async () => {
      const { data } = await axios.get(`/api/user/login`)
      setusers(data)
    }
    getusers()
  }, [])
  const Login = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMessage('Both fields are required.')
    } else {
      const row = users.map((user) => {
        var match = 0
        if (user.email === email) {
          match = 1
          setErrorMessage('')
        } else if (email === 'admin@ikart.com' && password == 'admin') {
          cookies.set('admin', true, { path: '/', maxAge: 3600 })
          window.location.href = '/admin'
          setErrorMessage('')
        } else {
          setErrorMessage('Your email or password is incorrect')
        }
        if (match === 1) {
          bcrypt.compare(password, user.password).then((result) => {
            if (result) {
              const mytoken = token.sign(
                {
                  user: user._id,
                },
                'SUKH'
              )
              cookies.set('userloggedin', mytoken, { path: '/', maxAge: 3600 })
              setErrorMessage('')
              if (window.previousLocation == '/login') {
                window.location.href = '/shipping'
              } else {
                window.location.href = '/'
              }
            } else {
              setErrorMessage('Your email or password is incorrect')
            }
          })
        }
      })
    }
  }
  return (
    <FormContainer>
      <h1>Sign In </h1>
      {err && <Message variant='danger'>{err}</Message>}
      <Form on onSubmit={Login}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={(e) => setemail(e.target.value)}
            value={email}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer? <Link to={'/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
export default Loginscreen

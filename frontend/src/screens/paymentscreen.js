import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/checkoutsteps'
import Message from '../components/Message'
import Cookies from 'universal-cookie'

const PaymentScreen = ({ history }) => {
  const cookies = new Cookies()
  const [noc, setnoc] = useState([])
  const [CN, setCN] = useState([])
  const [CVV, setCVV] = useState([])
  const [ED, setED] = useState([])
  const [err, setErrorMessage] = useState('')

  const payment = (e) => {
    e.preventDefault()
    if (isNaN(CN) || CN.length < 16) {
      setErrorMessage('Enter Valid Card number')
    } else if (isNaN(ED)) {
      setErrorMessage('Enter Expiry data in format mmyy')
    } else if (isNaN(CVV) || CVV.length < 3) {
      setErrorMessage('Enter Valid CVV')
    } else {
      cookies.set('carddetails', noc + ',XXXX-XXXX-XXXX-' + CN.slice(12, 17))
      history.push('/placeorder')
    }
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Payment </h1>
      {cookies.get('carddetails') && (
        <h5>
          USE Last Added Card : <br></br>
          <a href='/placeorder'>{cookies.get('carddetails')} </a>
        </h5>
      )}
      {err && <Message variant='danger'>{err}</Message>}
      <Form onSubmit={payment}>
        <Form.Group controlId='name'>
          <Form.Label>Name on Card</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name on Card'
            value={noc}
            required
            onChange={(e) => setnoc(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Card Number'
            value={CN}
            maxLength='16'
            required
            onChange={(e) => setCN(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Expiry data</Form.Label>
          <Form.Control
            type='text'
            placeholder='mmyy'
            value={ED}
            required
            maxLength='4'
            onChange={(e) => setED(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter CVV'
            value={CVV}
            maxLength='3'
            required
            onChange={(e) => setCVV(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen

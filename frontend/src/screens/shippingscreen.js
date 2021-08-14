import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import CheckoutSteps from '../components/checkoutsteps'
import FormContainer from '../components/FormContainer'
import Cookies from 'universal-cookie';

const ShippingScreen = ({history}) => {
  const cookies = new Cookies();
  const [address, setAddress] = useState([])
  const [city, setCity] = useState([])
  const [postalCode, setPostalCode] = useState([])
  const [country, setCountry] = useState([])
  const checkout = async(e) => {
    e.preventDefault()
      cookies.set("address", address+", " +city+", "+postalCode +", "+country)
      history.push('/payment')
  }
  return (
    <FormContainer>
        <CheckoutSteps step1 />
      <h1>Shipping</h1>
      { cookies.get("address") && <h5>USE Previous Address : <br></br><a href="/payment">{cookies.get("address")} </a></h5> }
      <h3> <br></br>Add New</h3>
      <Form onSubmit={checkout}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen

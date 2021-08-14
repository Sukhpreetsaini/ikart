import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container style={{ backgroundColor: '#333333' }}>
        <Row>
          <Col className='text-center py-3' >Copyright &copy; iKart</Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>
            Designed and Developed by Sukhpreet and Amit!
          </Col>
        </Row>
        <Row className='pt-0 pb-1'>
          <Col className='text-center py-3'></Col>
          <Col className='text-center py-3'></Col>
          <Col className='text-center py-3'>
            <img
              src='https://www.freepnglogos.com/uploads/instagram-logo-png-transparent-0.png'
              width='60'
              alt='instagram logo png transparent'
            />
          </Col>
          <Col className='text-center py-3'>
            <img
              src='https://www.freepnglogos.com/uploads/facebook-logo-17.jpg'
              width='50'
              alt='simple facebook transparent logo download'
            />
          </Col>
          <Col className='text-center py-3'>
            <img
              src='https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png'
              width='60'
              alt='simple twitter transparent logo download'
            />
          </Col>
          <Col className='text-center py-3'></Col>
          <Col className='text-center py-3'></Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

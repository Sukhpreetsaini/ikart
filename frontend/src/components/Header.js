import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import Cookies from 'universal-cookie'
import jwt from 'jsonwebtoken'
import logo from './llogoo.png'

const Header = () => {
  window.previousLocation = ''
  const [user, setusers] = useState({})
  const cookies = new Cookies()
  if (cookies.get('userloggedin')) {
    window.decoded = jwt.verify(cookies.get('userloggedin'), 'SUKH')
  } else {
    window.decoded = ''
  }
  useEffect(() => {
    const getusers = async () => {
      const { data } = await axios.get(`/api/user/login/${window.decoded.user}`)
      setusers(data)
    }
    getusers()
  }, [])
  const logout = async () => {
    cookies.remove('userloggedin')
    cookies.remove('admin')
    cookies.remove('address')
    cookies.remove('carddetails')
    localStorage.clear()
    window.location.href = '/'
  }
  return (
    <header>
      {cookies.get('admin') ? (
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <Navbar.Brand href='/admin'>
            <img src={logo} style={{ height: '45px' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <Nav.Link href='/admin'>
                  <i className='fas fa-user'></i> Admin
                </Nav.Link>
                <Nav.Link href='/add'>
                  <i className='fas fa-plus'></i> Add Product
                </Nav.Link>
                <Nav.Link href='/adminorder'>
                  <i class='fas fa-list'></i> Orders
                </Nav.Link>
                <Nav.Link onClick={logout}>
                  <i className='fas fa-lock'></i> Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <Navbar.Brand href='/'>
              <img src={logo} style={{ height: '45px' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <Nav.Link href='/'>
                  <i className='fas fa-list-alt'></i> Products
                </Nav.Link>
                <Nav.Link href='/cart'>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
                {cookies.get('userloggedin') ? (
                  <NavDropdown title={user.name} id='username'>
                    <NavDropdown.Item href='/order'>My Orders</NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Login / SignUp
                    </Nav.Link>
                  </LinkContainer>
                )}
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </header>
  )
}

export default Header

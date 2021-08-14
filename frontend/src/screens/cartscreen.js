import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Cookies from 'universal-cookie';

const cartscreen = ({history}) => {
  const cookies = new Cookies();
    const removefromcart = async(key)=>{
        localStorage.removeItem(key)
        window.location.reload()
    }
    const checkout = async()=>{
      sessionStorage.setItem("Total",window.total)
      if(cookies.get("userloggedin")){
       history.push('/shipping')
      }
      else{
        window.previousLocation = '/login'
        history.push('/login')
      }
    }
    window.total = 0
    return (
        <Row >
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {localStorage.length != 0 ? (<Row className="pt-5 pb-1">
                <Col md={2}>
                  </Col>
                  <Col md={3}>
                      <label>Product Name</label>
                  </Col>
                  <Col md={2}>
                      <label>Price</label>
                  </Col>
                  <Col md={2}>
                    <label>Quantity</label>
                  </Col>
            </Row>
            ): (
              <div></div>
            )}
            {localStorage.length === 0 ? (
              <Message>
                Your cart is empty <Link to='/'>Go Back</Link>
              </Message>
            ) : (
                <div>{Object.entries(localStorage).map(([key, value]) => {
                    const [product, setproduct] = useState({})
                    useEffect(() =>{
                        const getproduct = async () => {
                          const { data } = await axios.get(`/api/products/${key}`)
                            setproduct(data)
                        }
                        getproduct()
                      }, [])
                      if(window.total==0){window.total = product.price * value}
                      else(window.total = window.total+(product.price * value))
                    return(
                        <ListGroup variant='flush'>
                            
                            <Row className="pt-5 pb-1">
                              <Col md={2}>
                                <Image src={product.image} alt={product.name} fluid rounded />
                              </Col>
                              <Col md={3}>
                                <Link to={`/product/${key}`}>{product.name}</Link>
                              </Col>
                              <Col md={2}>${product.price}</Col>
                              <Col md={2}>{value}</Col>
                              <Col md={2}>
                                <Button
                                  type='button'
                                  variant='light'
                                  onClick={() => removefromcart(key)}
                                >
                                  <i className='fas fa-trash'></i>
                                </Button>
                              </Col>
                         </Row>
                    </ListGroup>
                   )
                })
            }</div>
          )
        }         
    </Col>
    <Col md={4}>
       <Card>
           <ListGroup variant='flush'>
            <ListGroup.Item>
               <h2>
                 Subtotal Of Your items
                </h2>
            ${(window.total).toFixed(2)}
            {}
            </ListGroup.Item>
            <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={window.total == 0}
              onClick={checkout}
            >
              Proceed To Checkout
            </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>                       
  </Row>
  )
}


export default cartscreen
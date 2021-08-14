import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'universal-cookie';
import CheckoutSteps from '../components/checkoutsteps'
import jwt from "jsonwebtoken"

const placeOrderScreen = () => {
    const cookies = new Cookies();
    
    const Placeorder = async(e) => {
        e.preventDefault();
         const userid = (jwt.verify(cookies.get("userloggedin"),"SUKH")).user
         const address = cookies.get("address")
         const amountpaid = (Number(sessionStorage.getItem("Total")) + (Number(sessionStorage.getItem("Total")/100) * 13) + 3.99).toFixed(2)
        {Object.entries(localStorage).map(([key, value]) => {
            const productid = key
            const productqty = value
            const isdelivered = false
             axios.post(
                "http://localhost:5000/api/order/add",
                { userid,
                  productid,
                  productqty,
                  address,
                  amountpaid,
                  isdelivered,
                })
            })
        }
        alert("order Placed succefully! Check your order status in 'MY ORDERS'")
        localStorage.clear()
        window.location.href = '/order'
    }
    return (
        <>
          <CheckoutSteps step1 step2 step3/>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Address:</strong>
                    {cookies.get("address")}
                  </p>
                </ListGroup.Item>
    
                <ListGroup.Item>
                  <h2>Payment </h2>
                  <strong>Card: </strong>
                  {cookies.get("carddetails")}
                </ListGroup.Item>
    
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  <div>{Object.entries(localStorage).map(([key, value]) => {
                    const [product, setproduct] = useState({})
                    useEffect(() =>{
                        const getproduct = async () => {
                          const { data } = await axios.get(`/api/products/${key}`)
                            setproduct(data)
                        }
                        getproduct()
                      }, [])
                      return(
                    <ListGroup variant='flush'>
                        <ListGroup.Item >
                          <Row>
                            <Col md={3}>
                              <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                                {product.name}
                            </Col>
                            <Col md={4}>
                              {value} x ${product.price} = ${value * product.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      
                    </ListGroup>
                  )
                })
                }
                </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${sessionStorage.getItem("Total")}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${3.99}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${((sessionStorage.getItem("Total")/100)*13).toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${(Number(sessionStorage.getItem("Total")) + (Number(sessionStorage.getItem("Total")/100) * 13) + 3.99).toFixed(2) }</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-block'
                      onClick={Placeorder}
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )
    }

export default placeOrderScreen

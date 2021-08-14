import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup,  Button,} from 'react-bootstrap'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import jwt from "jsonwebtoken"

const OrderScreen = () => {
    const cookies = new Cookies();
    const [orders, setorders] = useState([])
    const [products, setproducts] = useState([])
    useEffect(() =>{
        const get = async () => {
          const { data } = await axios.get('/api/order')
          setorders(data)
        }
        get()
      }, [])
      useEffect(() =>{
        const get = async () => {
          const { data } = await axios.get(`/api/products`)
          setproducts(data)
        }
        get()
      }, [])
      const cancel = async(data)=>{
        const cancel = true
        window.location.reload()
        await axios.put(`http://localhost:5000/api/order/cancel/${data}`, {cancel,})
    }
      return(
        <Row className="justify-content-md-center" >
          <Col md={15}>
            <h1>My Orders</h1>
           <Row className="justify-content-md-center" className="pt-5 pb-1">
           <Col md={2}>
                  </Col>
                  <Col md={2}>
                      <label>Product Name</label>
                  </Col>
                  <Col md={2}>
                      <label>Quantity</label>
                  </Col>
                  <Col md={2}>
                    <label>Delivery Status</label>
                  </Col>
            </Row>
            
            <ListGroup variant='flush'>    
                            
                              {orders.map((order) => (  
                               jwt.verify(cookies.get("userloggedin"),"SUKH").user == order.userid  ? ( 
                                <Row className="pt-5 pb-1">
                                {products.map((product) => (
                                    <>
                                    
                                    {product._id == order.productid && <Col md={2}><Image src={product.image} alt={product.name}  fluid rounded  /> </Col>}
                                    
                                    
                                    {product._id == order.productid && <Col md={2}>{product.name}</Col>}
                                    
                                    </>
                                    ))}
                              <Col md={2}>{order.productqty}</Col>
                              {!order.cancel ? (
                              <Col md={2}>{order.isdelivered ? (<div class="text-success">Delivered</div>) : (<div class="text-danger">On its Way</div>)}</Col>
                              ) : (
                                <Col md={2}> <div class="text-danger"> Order Cancelled </div> </Col>
                              )}
                              {!order.isdelivered ? (
                              <Col md={3}>{order.cancel ? (<div class="text-danger"> </div>) : 
                              (<Button variant="danger" onClick={() => cancel(order._id)}>Cancel Order</Button>)}</Col>) :
                              (<div></div>)}
                              </Row>
                            ) : (
                              <div></div>
                              
                            ))
                            )
                            }  
                </ListGroup>
            </Col>
            </Row>
    )
}
export default OrderScreen
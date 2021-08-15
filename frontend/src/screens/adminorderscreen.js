import React, { useState, useEffect } from 'react'
import { Row, Col,  ListGroup,  Button} from 'react-bootstrap'
import axios from 'axios'

const AdminOrderScreen = ({match}) => {
    const [orders, setorders] = useState([])
    const [products, setproducts] = useState([])
    var qty
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
      const Delivered = async(data1,data2,data3)=>{
          const isdelivered = true
          window.location.reload()
          const { data } = await axios.get(`/api/products/${data2}`)
           qty = data.countInStock
          var countInStock = (qty - data1)
          console.log(countInStock)
         await axios.put(`/api/order/deliver/${data3}`, {isdelivered,})
          
         await axios.put(
           `/api/products/change/${data2}`,
            { 
              countInStock,
           })
            
      }
      const clear = async(data)=>{
        window.location.reload()
        await axios.delete(`/api/order/${data}`)
        }
      return(
        <Row >
          <Col md={20} >
            <h1>Orders</h1>
           <Row  >
           <Col md={3}  >Order ID / User ID
                  </Col>
                  <Col >
                      <label>Product Name</label>
                  </Col>
                  <Col md={1}>
                      <label>Quantity</label>
                  </Col>
                  <Col md={1}>
                      <label>Payment status</label>
                  </Col>
                  <Col md={2}>
                      <label>Address</label>
                  </Col>
                  <Col md={2}>
                    <label>Delivery Status</label>
                  </Col>
                  <Col md={1} >Clear Order</Col>
            </Row>
            <ListGroup variant='flush'>    
                              {orders.map((order) => (   
                            <Row className="pt-5 pb-1">
                                <Col md={3} >
                                    {order._id} / {order.userid}
                                    </Col>
                                {products.map((product) => (
                                    <>                                    
                                    {product._id == order.productid && <Col md={2}>{product.name}</Col>}                                                                        
                                    </>
                                    ))}
                              <Col md={1}>{order.productqty}</Col>
                              <Col md={1} ><div class="text-success">Done</div>  </Col>
                              <Col md={2} class="text-wrap" >{order.address}</Col>
                              {!order.cancel ? (
                              <Col md={2}>{order.isdelivered ? (<div class="text-success">Delivered</div>) : (<div class="text-danger">Not Delievered <Button onClick={() => Delivered(order.productqty,order.productid,order._id)}>Delivered</Button></div> )}</Col>
                              ) : (<Col md={2}> <div class="text-danger">Order Cancelled</div> </Col>)}
                              <Col md={1} class="text-wrap" ><Button variant="danger" onClick={() => clear(order._id)}>Clear</Button></Col>
                              </Row>
                            )
                            )
                            }  
                </ListGroup>
            </Col>
            </Row>
    )
}
export default AdminOrderScreen
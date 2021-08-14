import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Message from '../components/Message'

const Adminscreen = () => {
    const [products, setproducts] = useState([])
    const removeproduct= async(data)=>{
      console.log(data)
      axios.delete(`/api/products/${data}`)
      window.location.reload()
    }
  useEffect(() =>{
    const get = async () => {
      const { data } = await axios.get('/api/products')
      setproducts(data)
    }
    get()
  }, [])
    return(
        <Row>
          <Col md={11}>
            <h1>Product List</h1>
           <Row>
                <Col md={2}>
                  </Col>
                  <Col md={2}>
                      <label>Product Name</label>
                  </Col>
                  <Col md={2}>
                      <label>Price</label>
                  </Col>
                  <Col md={2}>
                    <label>Stock Left</label>
                  </Col>
            </Row>
            <ListGroup variant='flush'>
                            {products.map((product) => (
                            <Row className="pt-5 pb-1">
                              <Col md={2}>
                                <Image src={product.image} alt={product.name} fluid rounded />
                              </Col>
                              <Col md={2}>
                                {product.name}
                              </Col>
                              <Col md={2}>${product.price}</Col>
                              <Col md={2}>{product.countInStock}
                              </Col>
                              <Col md={2}><Button href={`/edit/${product._id}`}>Edit</Button>
                              </Col>
                              <Col md={2}><Button variant="danger" onClick={() => removeproduct(product._id)}>Delete</Button>
                              </Col>
                         </Row>
                            ))}
                    </ListGroup>
            </Col>
            </Row>
    )
}
export default Adminscreen
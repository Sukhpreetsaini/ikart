import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import axios from 'axios'


const ProductScreen = ({ history, match }) => {
    const [qty, setqty] = useState(1)
    const [product, setproduct] = useState({})
    useEffect(() =>{
      const getproduct = async () => {
        const { data } = await axios.get(`/api/products/${match.params.id}`)
        setproduct(data)
      }
      getproduct()
    }, [])
    const Addtocart = async ()=>{
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      const productid = data._id
      localStorage.setItem(productid,qty)
      alert("Product Added Successfully!!")
      history.push('/')
    }
  return (
        <>
        <div>Product</div>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {
                    product.countInStock > 0 && (
                      <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setqty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    )
                  }
                  

                  <ListGroup.Item>
                    <Button
                      onClick={Addtocart}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
  )
}

export default ProductScreen

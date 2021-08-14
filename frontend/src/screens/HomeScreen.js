import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import CarouselComponent from '../components/CarouselComponent'

const HomeScreen = () => {
  const [products, setproducts] = useState([])
  useEffect(() => {
    const get = async () => {
      const { data } = await axios.get('/api/products')
      setproducts(data)
    }
    get()
  }, [])
  return (
    <>
      <CarouselComponent />
      <h1>
        <strong>Our Products</strong>
      </h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}
export default HomeScreen

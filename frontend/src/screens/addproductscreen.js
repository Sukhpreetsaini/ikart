import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const Addproductscreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [err, setErrorMessage] = useState('');
  const uploaddata = async(e) => {
    e.preventDefault();
      if(!name || !price || !image || !brand || !category || !countInStock || !description){
        setErrorMessage("All fields are required!")
      }
      else{
        setErrorMessage("")
        alert("Product Added Successfully")
        window.location.href = '/admin'
        await axios.post(
          "/api/products/upload",
          { name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,})
          }
      }
  return (
    <>
      <FormContainer>
        <h1>Add Product</h1>
        {err && <Message variant='danger'>{err}</Message>}
          <Form onSubmit={uploaddata}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              ADD
            </Button>
          </Form>
          </FormContainer>
    </>
  )
}
export default Addproductscreen
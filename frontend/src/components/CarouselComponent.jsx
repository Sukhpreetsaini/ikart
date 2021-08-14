import React from 'react'
import { Carousel } from 'react-bootstrap'
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img4 from './img4.jpg';
import img5 from './img5.jpg';

const CarouselComponent = () =>{
    return(
        <Carousel>
            <Carousel.Item interval={1500}>
                <img
                className="d-block w-100"
                src={img1}
                alt="First slide"
                />
                {/* <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                className="d-block w-100"
                src={img2}
                alt="Second slide"
                />
                {/* <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                className="d-block w-100"
                src={img4}
                alt="Third slide"
                />
                {/* <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                className="d-block w-100"
                src={img5}
                alt="Fourth slide"
                />
                {/* <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselComponent;
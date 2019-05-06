import React from 'react'
import { Carousel } from 'react-bootstrap';


const style = {

  
    height: '65vh',
    minHeight: '350px',
    background: 'no-repeat center center scroll',
    webkitBackgroundSize: 'cover',
    mozBackgroundSize: 'cover',
    obackgroundSize: 'cover',
    backgroundSize: 'cover',

}

export default function CarouselHome() {
  return (
<header>
<Carousel>
  <Carousel.Item  style={style}>
    <img
      className="d-block w-100"
      src="https://source.unsplash.com/O7fzqFEfLlo/1920x1080"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={style}>
    <img
      className="d-block w-100"
      src="https://source.unsplash.com/RCAhiGJsUUE/1920x1080"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item  style={style}>
    <img
      className="d-block w-100"
      src="https://source.unsplash.com/wfh8dDlNFOk/1920x1080"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</header>

)
}

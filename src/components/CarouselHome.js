import React from 'react'
import { Carousel } from 'react-bootstrap';


const style = {

  
    height: '80vh',
    minHeight: '350px',
    background: 'no-repeat center center scroll',
    WebkitBackgroundSize: 'cover',
    MozBackgroundSize: 'cover',
    obackgroundSize: 'cover',
    backgroundSize: 'cover',

}

const CarouselHome = () => {
  return (

<div className="m-3">
<Carousel>
  <Carousel.Item  style={style}>
    <img
      className="d-block w-100"
      src={require('../layout/img/site/black-and-white-electronics-notebook-257937.jpg')}
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
      src={require('../layout/img/site/code-coder-coding-270348.jpg')}
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
      src={require('../layout/img/site/charts-data-document-669613.jpg')}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item  style={style}>
    <img
      className="d-block w-100"
      src={require('../layout/img/site/codes-coding-communication-360591.jpg')}
      alt="Fourth slide"
    />

    <Carousel.Caption>
      <h3>Fourth slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</div>

)
}
export default CarouselHome;
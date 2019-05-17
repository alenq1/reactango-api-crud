import React, { Component } from 'react'
import  Header  from '../layout/Header'
import  Footer  from '../layout/Footer'
import  CarouselHome  from '../components/CarouselHome';
import { Container, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const nameapp = 'Header'
const footermsg = 'Footer'
const style = { 
   
  textAlign: 'center',
  
  
  
      }

const footerstyle = { 
   
  
      }



export default class Home extends Component {
  render() {
    return (
        <>
      <Header brand={nameapp} alerts={MySwal}></Header>
        
        <CarouselHome/>
        <Link to="/login">
            <Button>TEST</Button>
        </Link>      
        
      <Footer message={footermsg}></Footer>
      </>   
    )
  }
}

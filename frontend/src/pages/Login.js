import React, { Component } from 'react'
import  Header  from '../layout/Header'
import  Content  from '../layout/Content';
import  Footer  from '../layout/Footer'
import FormLogin from '../components/FormLogin';
import { Container } from 'react-bootstrap';


const nameapp = 'loPan'
const footermsg = 'lopanInc'
const page = 'Login'
const style ={

  
  width: '100%',
  height: '100%',
  padding: '100px',
  
  

}

export default class Login extends Component {
  render() {
    return (
      <>
        <Container style={style}>
          <Content page={FormLogin}/>
        </Container>
        
        <Footer message={footermsg}/>
      </>
    )
  }
}

import React from 'react'
import  Header  from '../layout/Header'
import  Content  from '../layout/Content';
import  Footer  from '../layout/Footer'
import FormLogin from '../components/FormLogin';
import { Container } from 'react-bootstrap';


const nameapp = 'nameapp'
const footermsg = 'footer'
const page = 'Login'
const style ={

  /* 
  width: '100%',
  height: '100%',
  padding: '100px',
  
   */
  margin: '100'

}

const Login = (props) => {
  
    return (
      <>
        <Container style={style}>
          <Content page={FormLogin}/>
        </Container>
        
        <Footer message={footermsg}/>
      </>
    )
  
}
export default Login
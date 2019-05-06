import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';





const FormLogin = (props) => {
  return (
    <div>
      <Form 
      
      validated={props.validated}
      style ={props.style}
      >
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control 
    type="text"
    name={props.name} 
    placeholder="Enter Username" 
    value={props.username}
    onChange={props.handleChange}
    required
    />
    <Form.Text className="text-muted">
      
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control 
    name={props.namepassword}
    type="password" 
    placeholder="Password" 
    value={props.password}
    onChange={props.handleChange}
    required
    />
  </Form.Group>
  
  <Button 
  variant="primary" 
  onClick={props.handleLogin} 
  className="col text-center">
    Submit
  </Button>
</Form>
    </div>
  )
}
export default FormLogin

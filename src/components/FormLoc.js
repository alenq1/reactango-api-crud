import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';


const FormLoc = (props) => {
  return (
    <div>
      <Form 
      
      validated={props.validated}
      style ={props.style}
      >
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Location Name</Form.Label>
    <Form.Control 
    type="text"
    name={props.name} 
    placeholder="Enter Location Name" 
    value={props.fieldloc}
    onChange={props.handleChange}
    required
    />
    <Form.Text className="text-muted">
      
    </Form.Text>
  </Form.Group>

</Form>
    </div>
  )
}
export default FormLoc

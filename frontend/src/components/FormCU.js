import React, { Component } from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import  MyUploader  from '../components/MyUploader';

const FormCU = (props) => {
    
    const { validated } = 'false';
    
    return (
      
      <Form
        noValidate
        validated = {validated}
      >
      
        <Form.Row>
          <Form.Group as={Col} md="10" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              name="name"
              required
              type="text"
              placeholder="First name"
              defaultValue={props.fields.name}
              onChange={props.handleChange}
            />
            
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} md="10" controlId="validationCustom02">
            <Form.Label>Location</Form.Label>
            <Form.Control as="select"
            name="location"
            onChange={props.handleChange}
            required
            >
              <option disabled>Choose...</option>
              <option selected>{props.fields.location}</option>
              {props.locations.map(loc =>
                <option key={loc.id} value={loc.name}>{loc.name}</option>
                
                )}
              
            </Form.Control> 
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="5" controlId="validationCustom03">
            <Form.Label>Price</Form.Label>
            <Form.Control 
            name="price"
            type="number" 
            placeholder="Price" required 
            defaultValue={props.fields.price}
            onChange={props.handleChange}

            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="5" controlId="validationCustom04">
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
            name="quantity"
            type="number" 
            placeholder="Quantity"
            required
            defaultValue={props.fields.quantity}
            onChange={props.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>  
        
        <Form.Row>

          <Form.Group as={Col} md="10" controlId="validationCustom05">
            <Form.Label>Description</Form.Label>
            <Form.Control 
            name="description"
            type="textarea" 
            placeholder="Description" 
            required 
            defaultValue={props.fields.description}
            onChange={props.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
        <Form.Label>Image</Form.Label>

          <MyUploader/>
        </Form.Row>
        
      </Form>
    );
  
}

export { FormCU };
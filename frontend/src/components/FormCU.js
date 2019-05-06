import React, { Component } from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';

class FormCU extends React.Component {
constructor(props) {
    super(props);

    this.state = { 
      
      validated: false,
      updfields: {},
      formfields: {
        id: '',
        name: '',
        location: '',
        price: 0,
        quantity: 0,
        description: ''
        
      }
    }
    
 }
  
  render() {
    
    const { validated } = 'false';
    
    return (
      
      <Form
        noValidate
        validated={validated}
      >
      
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              name="name"
              required
              type="text"
              placeholder="First name"
              defaultValue={this.props.fields.name}
              onChange={this.props.handleChange}
            />
            
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Location</Form.Label>
            <Form.Control as="select"
            name="location"
            onChange={this.props.handleChange}
            required
            >
              <option disabled>Choose...</option>

              {this.props.locations.map(loc =>
                <option key={loc.id} value={loc.name}>{loc.name}</option>
                
                )}
              
            </Form.Control> 
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Price</Form.Label>
            <Form.Control 
            name="price"
            type="number" 
            placeholder="Price" required 
            defaultValue={this.props.fields.price}
            onChange={this.props.handleChange}

            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
            name="quantity"
            type="number" 
            placeholder="Quantity"
            required
            defaultValue={this.props.fields.quantity}
            onChange={this.props.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>  
        <Form.Row>

          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Description</Form.Label>
            <Form.Control 
            name="description"
            type="textarea" 
            placeholder="Description" 
            required 
            defaultValue={this.props.fields.description}
            onChange={this.props.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        
      </Form>
    );
  }
}

export { FormCU };
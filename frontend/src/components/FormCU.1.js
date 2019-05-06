import React, { Component } from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import QueryService from '../services/QueryService';

const queryservice = new QueryService()



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
    
    
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
    


  }

  

  
  
  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true })
    console.log(this.state.formfields, 'DATOS P MANDAR SERVIDOR')
    console.log(this.props.type, 'valor de type pasado al form')
    if(this.props.type){
      queryservice.updateProduct(this.state.formfields)
      .then( result => {
          console.log(result.data, 'UPDATE EXITOSO')
          //console.log(this.state.fieldsprod, 'FIELDS PASADOS PARA FORM')
        })
      .catch( error  => {
          console.log(error.message, 'UPDATE CON ERRROR')
          //this.setState({ error: error.message });
        })
      

    }
    else{

      queryservice.createProduct(this.state.formfields)
      .then(result => {
          console.log(result.data, 'CREACION EXITOSA')
          //console.log(this.state.fieldsprod, 'FIELDS PASADOS PARA FORM')
        })
      .catch( error  => {
          console.log(error.message, 'CREACION CON ERRROR')
          //this.setState({ error: error.message });
        })


    }


  }

  handleChange(event) {

    
    /* const { updfields } = this.state;
    
    if(this.props.fields){
      this.setState({updfields: this.props.fields})
      }
    else {
      this.setState({updfields: {}})
  
    } 
    
    
    
    
    if(this.props.type){
      const { formfields } = {...this.state}
      this.setState({ formfields: this.props.fields})
    }

     */
    
    const { formfields } = {...this.state}
    const actualfield = formfields
    const {name, value} = event.target
    actualfield[name] = value
    if(this.props.type){
      this.setState({
        formfields: this.props.fields
      })
      console.log(this.state.formfields, 'CAMBIOS DE FIELDS moddificados')

    }

    else {
    this.setState({
      formfields: actualfield
    })
    console.log(this.state.formfields, 'CAMBIOS DE FIELDS nuevoss')
    }
  }

  
  render() {
    
    const { validated } = this.state;
    
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
        </Form.Row>
        <Form.Row>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Location</Form.Label>
            <Form.Control as="select"
            name="location"
            required
            onChange={this.props.handleChange}
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
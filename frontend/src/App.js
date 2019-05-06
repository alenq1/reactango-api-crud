import React, { Component } from 'react'
import './App.css';
import { Button, Table, Modal } from 'react-bootstrap'
import { FormCU } from './components/FormCU';
//import { NavLogin } from './NavLogin'
import axios from 'axios';
import QueryService from './services/QueryService';

const queryservice = new QueryService() 
 
export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       show: false,
       products: [],
       locations: [],
       fieldsprod: {},
       error: null,
       edit: false,
       add: false,
       logged: false,
       test: 1
    }
    this.isLogged = this.isLogged.bind(this)
    this.counter = this.counter.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    
  }
  
  componentDidMount() {
      
    queryservice.getProducts()
    .then( result => {
          //console.log(result, 'result con axios')
          this.setState({
            products: result.data
          })
          //console.log(this.state.products, 'prduct state con axios')
          
        })
        .catch(error => {
          console.log(error.request.response, 'estructura del error')
          this.setState({ error: error.request.response });
        }
      )
  }

  getLocals(){

    queryservice.getLocations()
  
      .then( result => {
          console.log(result, 'result con axios')
          this.setState({
            locations: result.data
          })
          console.log(this.state.locations, 'Locations state con axios')
          
        })
        .catch( error  => {
          this.setState({ error: error.message });
        })




  }
  
  
  
  /* handleCreate(){
    
    this.setState({ show: true })
    this.getLocals()
  

  } */


  

  handleDelete(pk){

    const { products } = this.state;
    queryservice.deleteProduct(pk)
    .then( result => {
          console.log(result, 'result con axios')
          this.setState({
            products: products.filter(product=> product.id !== pk)
          })
          console.log(this.state.products, 'prduct state con axios')
          
        })
        .catch( error => {
          this.setState({ error: error.message });
        }
      )
  }

  handleProduct(product){

    console.log(product, 'ESTE ES EL VALOR PK')
    this.setState({ show: true })
    this.getLocals()

    if(product){
    
    this.setState({ edit: true, add: false })
    queryservice.getProduct(product.id)        
        .then( result => {
          console.log(result.data, 'result de SOLO PRODUCTO')
          this.setState({
            fieldsprod: result.data
          })
          console.log(this.state.fieldsprod, 'FIELDS PASADOS PARA FORM')
          
        })
        .catch( error => {
          this.setState({ error: error.message });
        }
      )
    }

    else {
      this.setState({ 
        
        add: true,
        edit: false, 
        fieldsprod: {}
      
      })
      


    }


  }

  handleHide(){

    this.setState({ 
    
      show: !this.state.show,
      fieldsprod: {},
    
    })
  }

  isLogged(){
    console.log("me LOEGUEARON")
    this.setState({logged: true})

  }

  counter(){
    console.log("me apretaron")
    const { test } = this.state
    this.setState({test: test +1})

  }





  render() {
    let msg;
    if(!this.state.logged){
      return(
  //    msg = <div><NavLogin/><h1>Sin Acceso</h1></div>
      <div></div>
      )

    }
    

    


    
    if(this.state.error != null){
    msg = <div><h1>{this.state.error}</h1></div>
  }
    else {
    msg = undefined
    } 

    return (
      <>
{/*       <NavLogin 
      logueado={this.state.logged} 
      isLogged={this.isLogged} 
      counter={this.counter}
      numero={this.state.test}
      handleLogin={this.handleLogin}
      />
 */'test'}      <div className="App">
        <div className="container text-center">
          <li>
          <h3>prueba</h3>
          </li>
          <li>
            <Button onClick={() => this.handleProduct()}>add new</Button>
          </li>
            { msg }          
        </div>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>   
               {this.state.products.map(product =>
            

            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>            
              <td>
              <Button variant="warning" onClick={() => this.handleProduct(product)}>edit</Button>
              <Button variant="danger" onClick={() => this.handleDelete(product.id)}>delete</Button>
              </td>
            </tr>
            )}
          </tbody>
        </Table>
          <Modal show={this.state.show} onHide={() => this.handleHide()}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <FormCU locations={this.state.locations} fields={this.state.fieldsprod} type={this.state.edit}>       
          </FormCU>
          </Modal>
      </div>
      </>
    )
  }
}

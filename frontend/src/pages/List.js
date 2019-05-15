import React, { Component } from 'react'
import  Header  from '../layout/Header'
import  Content  from '../layout/Content';
import  Footer  from '../layout/Footer'
import { Redirect, withRouter } from 'react-router-dom'
import { Modal, Alert, Button, Row } from  'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons';
import  { fab }from '@fortawesome/free-brands-svg-icons';
import Tables from '../components/Tables';
import Modalcont from '../components/Modalcont'
import QueryService from '../services/QueryService';

const queryservice = new QueryService()
const nameapp = 'Header'
const footermsg = 'Footer'
const page = 'List'

const style = { 
   
  textAlign: 'center',
  background: '#360033',  
  background: '-webkit-linear-gradient(to right, #0b8793, #360033)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to right, #0b8793, #360033)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: 'whitesmoke',
  textShadow: '#282c34',
  padding: '10px',
  margin: '10px 0' 
  
      }


export default class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       tablenames: [],
       list: [],
       fields: {},
       show: false,
       error: '',
       message: '',
       modaltitle: ''
    }
    this.handleHide = this.handleHide.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    
  }
  
  async componentDidMount() {
      
    await queryservice.getProducts()
    .then( result => {
          //console.log(result, 'result con axios')
          this.setState({list: result.data})
          //console.log(this.state.products, 'prduct state con axios')          
        })
        .catch(error => {
        //  console.log(error, 'estructura del error')
          this.setState({ error: error });
        })
  }

  handleData(data){

    const {show, modaltitle, list, fields } = this.state

    if(!data){

      this.setState({ 
        fields: {},
        show: true,
        modaltitle: 'Create'
      
      })
    //console.log(data, 'DATA DEL FORM limpio')

    }
    
    else{

      this.setState({ 
        show: true,
        modaltitle: 'Update',
        fields: data
      
      })

    }

  }
  
  
  async handleCreate(data){

    //console.log(data, 'DATA DEL FORM para AGREG')
    await queryservice.createProduct(data)
    .then( result => {
      //console.log(result, 'result con axios')
      this.setState({
      
      message: 'CREADO CORRECTO',
      show: false
      })
      //console.log(this.state.products, 'prduct state con axios')      
    })
    .catch(error => {
      //console.log(error, 'estructura del error')
      this.setState({ error: error });
    })
  }

  async handleUpdate(data){

    //console.log(data, 'DATA DEL FORM para modif')
    await queryservice.updateProduct(data)
    .then( result => {
      //console.log(result, 'result con axios')
      this.setState({
       ////// list: result.data
       fields: {},
       message: 'MODIFICADO CORRECTO',
       show: false
      })
      //console.log(this.state.products, 'prduct state con axios')
      
    })
    .catch(error => {
      //console.log(error, 'estructura del error')
      this.setState({ error: error });
    })
    

  }

  handleChange(event){

    const { fields } = {...this.state}
    const actualfield = fields
    const {name, value} = event.target
    actualfield[name] = value
    
      this.setState({
        fields: actualfield
      })
      //console.log(this.state.fields, 'CAMBIOS DE FIELDS moddificados')

    }
  

  async handleDelete(pk){

    const { list } = this.state;
    await queryservice.deleteProduct(pk)
    .then( result => {
        //  console.log(result, 'result con axios')
          this.setState({
            list: list.filter(product=> product.id !== pk)
          })
       //   console.log(this.state.list, 'prduct state con axios')
          
        })
        .catch( error => {
          this.setState({ error: error.message });
        })
  }
  

  handleHide(){

    this.setState({ 
      show: !this.state.show
    
    })
  }


  render() {
    return (
      <>
      <Header brand={nameapp}/>
      <Row className="justify-content-center mt-4">
      <h1>Product List </h1>
        <Button  
        onClick={() => this.handleData()} variant="success" className="ml-4">
        Add New
        </Button>
      </Row>
      {this.state.message}
      <Modalcont
      show={this.state.show}
      modaltitle={this.state.modaltitle}
      handleHide={this.handleHide}
      handleUpdate={this.handleUpdate}
      handleCreate={this.handleCreate}
      handleChange={this.handleChange}
      fields={this.state.fields}
      />

     
      <Tables
      list={this.state.list}
      style={style}
      handleUpdate={this.handleUpdate}
      handleDelete={this.handleDelete}
      handleData={this.handleData}
      >
      
      </Tables>
      <Footer message={footermsg}/>
      </>
    )
  }
}

import React, { Component } from 'react'
import  Header  from '../layout/Header'
import  Content  from '../layout/Content';
import  Footer  from '../layout/Footer'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { Modal, Alert, Button, Row, Fade, Spinner } from  'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons';
import  { fab }from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tables from '../components/Tables';
import Modalcont from '../components/Modalcont'
import QueryService from '../services/QueryService';
import SideBar from '../components/SideBar';
//import Spinner from '../components/Spinner';

const queryservice = new QueryService()
const nameapp = 'Header'
const footermsg = 'Footer'
const page = 'List'
const MySwal = withReactContent(Swal)

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
       modaltitle: '',
       loading: false
    }
    this.handleHide = this.handleHide.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    
  }
  
  async componentDidMount() {

    const {loading} = this.state
    this.setState({loading: true})

    await queryservice.getProducts()
    .then( result => {
          //console.log(result, 'result con axios')
          this.setState({list: result.data,
                         loading: false })
          //console.log(this.state.products, 'prduct state con axios')          
        })
        .catch(error => {
        //  console.log(error, 'estructura del error')
          this.setState({ error: error,
                          loading: false });
        })

        this.setState({loading: false});
    
    
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
  
  
  async handleCreate(data, images){

    
    console.log(data, 'DATA DEL FORM para AGREG')
    console.log(images, 'DATA DE IMAGENS para AGREG')
    let fieldsData = new FormData()
    fieldsData.append('name', data.name)
    
    fieldsData.append('location', data.location)
    fieldsData.append('price', data.price)
    fieldsData.append('quantity', data.quantity)
    fieldsData.append('description', data.description)
    if(images[1] !== undefined){
    fieldsData.set('images', '')
    fieldsData.append('images', images[1], images[1].name)
    }
    console.log(fieldsData.get('name'), 'ESTE ES FIELDS DATA COVERTIDO')
    await queryservice.createProduct(fieldsData)
    .then( result => {
      //console.log(result, 'result con axios')
      this.setState({
      
      message: <Alert className="mt-4" dismissible variant="info">Creado {data.name}</Alert>,
      show: false
      })
      MySwal.fire(
        'Create Sucessfull!',
        'OK',
        'success'
      )
      //console.log(this.state.products, 'prduct state con axios')
      //fieldsData.reset()      
    })
    .catch(error => {
      //console.log(error, 'estructura del error')
      this.setState({ error: error });
      MySwal.fire(
        'Error!',
        error.message,
        'error'
      )
    })

  }

  async handleUpdate(data, images){


    console.log(data, 'DATA DEL FORM para modif')
    console.log(images[1], 'DATA DE IMAGENS UNO para MODIF')
    let fieldsData = new FormData()
    fieldsData.append('name', data.name)
    
    fieldsData.append('location', data.location)
    fieldsData.append('price', data.price)
    fieldsData.append('quantity', data.quantity)
    fieldsData.append('description', data.description)
    if(images[1] !== undefined){
      fieldsData.set('images', '')  
    fieldsData.append('images', images[1], images[1].name)
    }
    console.log(fieldsData.get('name'), 'ESTE ES FIELDS DATA COVERTIDO')
    console.log(fieldsData.get('images'), 'ESTE ES FIELDS IMAGES COVERTIDO')
    console.log(data.id, 'ESTE ES ID PARA URL')
    await queryservice.updateProduct(fieldsData, data.id)
    .then( result => {
      //console.log(result, 'result con axios')
      this.setState({
       ////// list: result.data
       fields: {},
       message: 
       
       
       <Alert className="mt-4" dismissible variant="info">
       
       Modified {data.name}
       
       </Alert>,

       show: false
      })
      MySwal.fire(
        'Modified SucessFully!',
        'OK',
        'success'
      )
      //console.log(this.state.products, 'prduct state con axios')
      
    })
    .catch(error => {
      //console.log(error, 'estructura del error')
      this.setState({ error: error });
      MySwal.fire(
        'Error!',
        error.message,
        'error'
      )
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

    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.value) {
        
        await queryservice.deleteProduct(pk)
        .then( result => {
        //  console.log(result, 'result con axios')
          this.setState({
            list: list.filter(product=> product.id !== pk)
          })
          MySwal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
       //   console.log(this.state.list, 'prduct state con axios')
          
        })
        .catch( error => {

          MySwal.fire(
            'Error!',
            error.message,
            'error'
          )

          this.setState({ error: error.message });
        })
        
        
      }
    }) 
        
  }
  

  handleHide(){

    this.setState({ 
      show: !this.state.show
    
    })
  }

  handleOnClick(data){

    this.setState({ 
      show: true,
      fields: data,
      modaltitle: 'Detail'
    
    })

  } 


  render() {
    return (
      <>
      <Header brand={nameapp} alerts={MySwal}/>
      <div id="content-wrapper">
        <SideBar/>
        <div className="container-fluid mt-2" style={{paddingLeft: '80px'}}>
      <ol className="breadcrumb">
            <li className="breadcrumb-item">
            
              <a href="">Products</a>
            
              </li>
            
            <li className="breadcrumb-item active">List</li>
          </ol>
      <Row className="justify-content-center mt-4">
      <h1></h1>
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
      handleOnClick={this.handleOnClick}
      fields={this.state.fields}
      alerts={MySwal}
      />

      {this.state.loading ? 

      <div style={{textAlign: 'center',
                    margin: 'auto',
                    padding: '200px'

                    }}>
        
        <Spinner animation="grow" variant="light" role="status" />
        <Spinner animation="grow" variant="light" role="status" />
        <Spinner animation="grow" variant="light" role="status" />
        
      </div>



      :
      

      <Tables
      list={this.state.list}
      style={style}
      handleUpdate={this.handleUpdate}
      handleDelete={this.handleDelete}
      handleOnClick={this.handleOnClick}
      handleData={this.handleData}
      alerts={MySwal}
      loading={this.state.loading}
      >
      
      </Tables>
       }
      
      </div>
      </div>
      <Footer message={footermsg}/>
      </>
    )
  }
}

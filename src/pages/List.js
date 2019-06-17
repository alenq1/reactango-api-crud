import React, { Component } from 'react'
import  Header  from '../layout/Header'
import  Footer  from '../layout/Footer'
import { Modal, Alert, Button, Row, Fade, Spinner } from  'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tables from '../components/Tables';
import Modalcont from '../components/Modalcont'
import QueryService from '../services/QueryService';
import SideBar from '../components/SideBar';
import '../bread.css'
import { FaRegPlusSquare, FaTags } from 'react-icons/fa'
//import Spinner from '../components/Spinner';

const queryservice = new QueryService()
const nameapp = 'Header'
const footermsg = 'Footer'
const page = 'List'
const MySwal = withReactContent(Swal)


export default class List extends Component {
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
        this.setState({
            list: result.data,
            loading: false 
        })
          //console.log(this.state.products, 'prduct state con axios')          
      })
      .catch(error => {
        //  console.log(error, 'estructura del error')
        this.setState({ 
          error: error,
          loading: false 
        });
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
    })
    .then(async(result) => {
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
          <Row className="container mt-3">
            <div className="cont_breadcrumbs_3">
              <ul>  
                <li>
                  <a href="#">Products</a>
                </li>
                <li>
                  <a href="#" className="breadcrumb-item active">List</a>
                </li>
              </ul>
            </div>
            <div >
              <Button  
                onClick={() => this.handleData()} variant="success" className="m-5">
                <FaRegPlusSquare size="2em"/> Add New
              </Button>
              
            </div>
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

          <div style={{
            textAlign: 'center',
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

import React, { Component } from 'react'
import  Header  from '../layout/Header'
import  Content  from '../layout/Content';
import  Footer  from '../layout/Footer'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { Modal, Alert, Button, Row, Fade } from  'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons';
import  { fab }from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tables from '../components/Tables';
import Modalcont from '../components/Modalcont'
import ReactEcharts from 'echarts-for-react';
import QueryService from '../services/QueryService';
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


export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       tablenames: [],
       list: [],
       fields: {},
       average: 0,
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
    this.findAvg = this.findAvg.bind(this)
    
  }
  
  async componentDidMount() {

    await queryservice.getProducts()
    .then( result => {
          //console.log(result, 'result con axios')
          this.setState({list: result.data})
          //console.log(this.state.products, 'prduct state con axios')          
        })
        .catch(error => {
          console.log(error, 'estructura del error')
          this.setState({ error: error });
        })

  //      this.setState({loading: false});
    
    
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
      
      message: <Alert className="mt-4" dismissible variant="info">Creado {data.name}</Alert>,
      show: false
      })
      MySwal.fire(
        'Create Sucessfull!',
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

  async handleUpdate(data){

    //console.log(data, 'DATA DEL FORM para modif')
    await queryservice.updateProduct(data)
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
  
  findAvg(arr){

    //let value;
    //console.log(arr, 'ARREGLO dENTRADA PARa PRoMEDIO')
    let acum = 0;
    for (let value of arr) {
      acum += value['price']
    //  console.log(value['price'], 'valores para promediar' )
    //  console.log(acum, 'acumulado' )
  }
  let  prom = (acum / this.state.list.length).toFixed(2)
  //console.log(prom, 'promedio')
  return prom
 

  }

  render() {
    
    const { list, average } = this.state
    console.log(list, list.length,'ESTA ES LA LISTA')
    const options =  {
      xAxis: {
        type: 'category',
        data: [list.length] 
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [this.findAvg(list)] ,
        type: 'line'
    }]
    };

    return (

      <>
      <Header brand={nameapp} alerts={MySwal}/>
      
      <div id="content-wrapper">

        <div className="container-fluid">

        
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Dashboard</a>
              </li>
              <li className="breadcrumb-item">
              <Link to="/list">
              <a href="">List</a>
              </Link>  
              </li>
            <li className="breadcrumb-item active">Overview</li>
          </ol>

        
          <div className="row">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-dollar-sign"></i>
                  </div>
                  
                  <h1 className="display-4" id="vesusd">{list.length}</h1>
                <p className="lead">Total Products</p>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="#">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                      <i className="fab fa-btc"></i>
                  </div>
                    <div className="row">
                  <h1 id="btccusd" className="display-4 mr-2">{this.findAvg(list)}</h1>
                  <h1><i id="arrow" className="fas fa-arrow-right    "></i></h1>
                    </div>
                    <p className="lead">Average Price</p>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="#">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-exclamation-circle"></i>
                  </div>
                  <h1 className="display-4">45%</h1>
                        <p className="lead">Acierto</p>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="#">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-info o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-wallet"></i>
                  </div>
                  <h2 className="display-6">0.00004000</h2>
                            <p className="lead"></p>
                            <p className="lead"></p>
                            <p className="lead">Saldo BTC</p>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="#">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>

        
          <div className="card mb-3">
            <div className="card-header">
              <i className="fas fa-chart-area"></i>
              Graficos de Actividad </div>
            <div className="card-body">
              <canvas id="myAreaChart" width="100%" height="30"></canvas>
                  
              <div className="row">
              <div className="col-sm3">
              
              <div id="main5" style={{width: '1000%', height:'400px'}}>
              <ReactEcharts
  option={options}
  notMerge={true}
  lazyUpdate={true}
  theme={"theme_name"}
   />

              </div>
  
              </div>    
              <div className="col-sm3">
              <div id="main2" style={{width: '500px', height:'400px'}}></div>
              </div>
              <div className="col-sm3">
              <div id="main3" style={{width: '500px', height:'400px'}}></div>
              </div>
              <div className="col-sm3">
                      <div id="main4" style={{width: '500px', height:'400px'}}></div>
                      </div>
              <div className="col-sm3">
                      <div id="main" style={{width: '500px', height:'400px'}}></div>
                      </div>
                      
              </div>
            </div>
            <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
          </div>

          
          <div className="card mb-3">
            <div className="card-header">
              <i className="fas fa-table"></i>
              Ronda de multiply</div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  
                    <thead className="thead-inverse thead-dark">
                      <tr>
                        
        
                          
                          <th>repeticion de filas</th>
                        
        
                          
                      </tr>
                      </thead>
                      <tbody>
                          
                          <tr>
                          
                          <td>otra repeticion</td>
                          
                        </tr>
                   
                      </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
          </div>

        </div>
        
        <footer className="sticky-footer">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright © Your Website 2018</span>
            </div>
          </div>
        </footer>

      </div>
      

    
    

    
    <a className="scroll-to-top rounded" href="#page-top">
      <i className="fas fa-angle-up"></i>
    </a>
      <Footer message={footermsg}/>
      </>
    )
  }
}

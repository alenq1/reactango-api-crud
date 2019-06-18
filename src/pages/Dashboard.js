import React, { Component } from 'react'
import  Header  from '../layout/Header'
import  Footer  from '../layout/Footer'
import '../bread.css'
import axios from 'axios'
import * as moment from 'moment';
import Maps from '../components/Maps'
import { Modal, Alert, Button, Row, Fade, Spinner, Table } from  'react-bootstrap';
import { FaPoll, FaFileInvoiceDollar, FaFire, FaMapMarkedAlt, 
          FaTasks, FaChartBar, FaChartPie, FaChartLine } from 'react-icons/fa'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tables from '../components/Tables';
import Modalcont from '../components/Modalcont'
import QueryService from '../services/QueryService';
import LineChart, {PieChart, CircleChart, RatingChart} from "../components/LineChart";
import SideBar from '../components/SideBar';
import {LoadSpinner, BorderSpinner} from '../components/Spinners';

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
       totQuanty: 0,
       hotLocation: undefined,
       coord: '',
       rating: 0,
       show: false,
       error: '',
       message: '',
       modaltitle: '',
       sidebar: false,
       loading: false
    }
    
    
    this.findAvg = this.findAvg.bind(this)
    
    this.handleSideBarToggle = this.handleSideBarToggle.bind(this)
    
  }

  
  
  async componentDidMount() {

    const {coord, hotLocation} = this.state
    console.log("CARGANDO")
    this.setState({ loading: true })
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
    const {list} = this.state
    this.findAvg(list)
      
      console.log("LISTO")
      console.log(coord, "COORDENADAS")

}

  
  handleHide(){

    this.setState({ 
      show: !this.state.show
    
    })
  }

  handleSideBarToggle(){
     this.setState({ 
       sidebar: !this.state.sidebar
    
    }) 

  }


  findAvg(arr){
    this.setState({ loading: true })
    //let value;
    //console.log(arr, 'ARREGLO dE  NTRADA PARa PRoMEDIO')
    let acum = 0;
    let quanty = 0;
    let most = []
    for (let value of arr) {
      acum += value['price']
      quanty += value['quantity']
      most.push(value['location'])
    //  console.log(value['price'], 'valores para promediar' )
    //  console.log(acum, 'acumulado' )
    }
    let  prom = (acum / this.state.list.length).toFixed(0)

    // formula for most frequent value .---->
    let counts = most.reduce((a, c) => {
        a[c] = (a[c] || 0) + 1;
        return a;
    }, {});

    let maxCount = Math.max(...Object.values(counts));
    let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);
  
  //console.log(mostFrequent, 'MAS FREQUENTE');
  //console.log(prom, 'promedio')
    this.setState({
      hotLocation: mostFrequent,
      average: prom,
      totQuanty: quanty,      
      loading: false 
    })
 

  }

  render() {
    
    const { hotLocation, list, average, totQuanty,  loading, coord } = this.state
    //console.log(list, list.length,'ESTA ES LA LISTA')
    console.log(hotLocation, "HHHHHHHHH")
    console.log(coord, "PARAMA MOSTRAR COORDS")
    const today = new Date
    function getDateAgo(date, days) {
      date.setDate(date.getDate() - days);
      return date.getDate();
    }
    

    return (

      <>
        <div id="wrapper">
      
          <Header brand={nameapp} alerts={MySwal}/>
      
            <div id="content-wrapper">
              <SideBar onClick={() => this.handleSideBarToggle()}/>
                <div className="container-fluid mt-2" style={
                  this.state.sidebar ?
                  {paddingLeft: '240px'}
                  :
                  {paddingLeft: '80px'}
                  }
                >

          
              <div className="row m-3">

                <div className="cont_breadcrumbs_3">
                  <ul>  
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#" className="breadcrumb-item active">Overview</a></li>
                  </ul>
                  
                </div>
          
                <div className="col-xl-2 col-sm-3 mb-2 mt-3">
                  <div className="card text-white o-hidden h-100" style={{

                              background: '#000000',  /* fallback for old browsers */
                              background: '-webkit-linear-gradient(to top, #0f9b0f, #000000)',  /* Chrome 10-25, Safari 5.1-6 */
                              background: 'linear-gradient(to top, #0f9b0f, #000000)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                  }}>
                    <div className="card-body">
                      <div className="card-body-icon ">
                          
                      </div>
                  
                      <h3 className="display-6">{list.length === 0 ? 
                        <LoadSpinner/>
                        :
                          list.length
                      }
                      <FaPoll size="2em"/>
                      </h3>
                      <p className="lead">Total Products</p>
                    </div>
                    
                  </div>
                </div>
            
                <div className="col-xl-2 col-sm-3 mb-2 mt-3">
                  <div className="card text-white o-hidden h-100" style={{

                              background: '#FFE000',  /* fallback for old browsers */
                              background: '-webkit-linear-gradient(to top, #799F0C, #FFE000)',  /* Chrome 10-25, Safari 5.1-6 */
                              background: 'linear-gradient(to top, #799F0C, #FFE000)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                  }}>
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fab fa-btc"></i>
                      </div>
                    <div className="row">
                      <h3 className="display-6">{!average ? 
                        <LoadSpinner/>
                        :
                          average
                      }
                      <FaFileInvoiceDollar size="2em"/>
                      </h3>
                      
                    </div>
                      <p className="lead">Average Price</p>
                    </div>
                    
                  </div>
                </div>

                <div className="col-xl-2 col-sm-3 mb-2 mt-3">
                  <div className="card text-white o-hidden h-100" style={{

                        background: '#000046',  /* fallback for old browsers */
                        background: '-webkit-linear-gradient(to top, #000046, #1cb5e0)',  /* Chrome 10-25, Safari 5.1-6 */
                        background: 'linear-gradient(to top, #000046, #1cb5e0)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                  }}>
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-exclamation-circle"></i>
                      </div>
                      <h3 className="display-6">{!totQuanty ? 
                        <LoadSpinner/>
                        :
                          totQuanty
                      }
                      <FaTasks size="2em"/>
                      </h3>
                      <p className="lead">Total Quantity</p>
                    </div>
                    
                  </div>
                </div>

                <div className="col-xl-2 col-sm-3 mb-2 mt-3">
                  <div className="card text-white o-hidden h-100"style={{

                      background: '#c21500',  /* fallback for old browsers */
                      background: '-webkit-linear-gradient(to top, #c21500, #ffc500)',  /* Chrome 10-25, Safari 5.1-6 */
                      background: 'linear-gradient(to top, #c21500, #ffc500)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                  }}>
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-wallet"></i>
                      </div>
                      <h3 className="display-6">{loading ? 
                      <LoadSpinner/>
                      :
                        hotLocation === undefined ? 
                        
                        Error
                        
                        
                        :

                        hotLocation[0]


                        
                      }
                      <FaFire size="2em"/>
                      </h3>
                      <p className="lead">Hot Location</p>
                    </div>
                    
                  </div>
                </div>
              </div>


            <div className="row mt-3 mb-3">
              <div className="card col-xl-5 col-sm-3 ml-3 mr-1 text-dark">
                <div className="card-header">
                  <FaChartBar/>
                  Bar Chart
                </div>
                <div className="card-body">
                  <div >
              
                    <LineChart
                    textchart={'Quantity Bar Graph'}
                    typechart={'bar'}
                    xdata={list.map(datarr =>
                      datarr.location
                      )}
                    ydata={list.map(datarr =>
                      datarr.quantity
                      )}
                    color={'#2f4554'}
                    />
                  </div>
                  
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>

              <div className="card w-15 col-sm-3 ml-1 mr-1">
                <div className="card-header text-dark">
                  <FaChartPie/>
                      Circle Graph
                </div>
                <div className="card-body">
                  <div >
              
                    <CircleChart
                      data={list.map(datarr => {
                        let newarr ={value: '', name:''}
                        newarr['value'] = datarr.quantity
                        newarr['name'] = datarr.location
                        
                        return newarr;
                        })}
                        textchart={"Quantity Circle Chart "}
                    />
                  </div>
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>

              <div className="card w-15 col-sm-3 ml-1 mr-1">
                <div className="card-header text-dark">
                  <FaChartLine/>
                    Other graph
                </div>
                <div className="card-body">
                  <div >
              
                    <RatingChart
                      ydata={list.map(datarr =>
                      datarr.location
                      )}
                      xdata={list.map(datarr => {
                        let newarr ={value: '', symbol:''}
                        newarr['value'] = datarr.quantity
                        newarr['symbol'] = 'path://M16.678,17.086h9.854l-2.703,5.912c5.596,2.428,11.155,5.575,16.711,8.607c3.387,1.847,6.967,3.75,10.541,5.375 v-6.16l-4.197-2.763v-5.318L33.064,12.197h-11.48L20.43,15.24h-4.533l-1.266,3.286l0.781,0.345L16.678,17.086z M49.6,31.84 l0.047,1.273L27.438,20.998l0.799-1.734L49.6,31.84z M33.031,15.1l12.889,8.82l0.027,0.769L32.551,16.1L33.031,15.1z M22.377,14.045 h9.846l-1.539,3.365l-2.287-1.498h1.371l0.721-1.352h-2.023l-0.553,1.037l-0.541-0.357h-0.34l0.359-0.684h-2.025l-0.361,0.684 h-3.473L22.377,14.045z M23.695,20.678l-0.004,0.004h0.004V20.678z M24.828,18.199h-2.031l-0.719,1.358h2.029L24.828,18.199z  M40.385,34.227c-12.85-7.009-25.729-14.667-38.971-12.527c1.26,8.809,9.08,16.201,8.213,24.328 c-0.553,4.062-3.111,0.828-3.303,7.137c15.799,0,32.379,0,48.166,0l0.066-4.195l1.477-7.23 C50.842,39.812,45.393,36.961,40.385,34.227z M13.99,35.954c-1.213,0-2.195-1.353-2.195-3.035c0-1.665,0.98-3.017,2.195-3.017 c1.219,0,2.195,1.352,2.195,3.017C16.186,34.604,15.213,35.954,13.99,35.954z M23.691,20.682h-2.02l-0.588,1.351h2.023 L23.691,20.682z M19.697,18.199l-0.721,1.358h2.025l0.727-1.358H19.697z'
                        
                        return newarr;
                        })}
                      color={'#749f83'}
                      textchart={'IconBar Chart'}
                    />
                  </div>
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>
            </div>

            <div className="row mt-3 mb-3">
              <div className="card col-lg-11 col-sm-4 ml-3">
                <div className="card-header text-dark">
                  <FaMapMarkedAlt/>
                    Top locations Marker & Last Activity
                </div>
                <div className="card-body">
                  
                  <div className="row container">
                    { !hotLocation  ?

                      <BorderSpinner/>

                      :
                    <>
                    
                    <Maps
                      position={hotLocation}
                      zoom={2}
                      height={"300px"}
                      width={"1000px"}
                      loading={loading}
                      numcities={5}
                    />
                    
                    </>
                    }
                    
                    <Table className="table-borderless table-hover table-striped text-center mr-4 mt-3">
                      <thead>
                        <tr className="bg-dark text-white">
                          <th>Product</th>
                          <th>Last Activity</th>
                        </tr>
                      </thead>
                      
                      <tbody >
                        {list.map((products) =>
                          <tr>
                          <td>{products.name}</td>
                          <td>{moment(products.date_activity, moment.ISO_8601).fromNow()}</td>
                        </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    
    <Footer message={footermsg}/>
  
  </>
  
  )}

}

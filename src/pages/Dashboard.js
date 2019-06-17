import React, { Component } from 'react'
import  Header  from '../layout/Header'
import  Footer  from '../layout/Footer'
import '../bread.css'
import axios from 'axios'
import Maps from '../components/Maps'
import { Modal, Alert, Button, Row, Fade, Spinner, Table } from  'react-bootstrap';
import { FaPoll, FaFileInvoiceDollar, FaFire, FaTasks } from 'react-icons/fa'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tables from '../components/Tables';
import Modalcont from '../components/Modalcont'
import QueryService from '../services/QueryService';
import LineChart, {PieChart, CircleChart, RatingChart} from "../components/LineChart";
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
    let  prom = (acum / this.state.list.length).toFixed(2)

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
                        <>
                          <Spinner animation="grow" variant="light" role="status" />
                          <Spinner animation="grow" variant="light" role="status" />
                          <Spinner animation="grow" variant="light" role="status" />
                        </>
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
                        <>
                          <Spinner animation="grow" variant="light" role="status" />
                          <Spinner animation="grow" variant="light" role="status" />
                          <Spinner animation="grow" variant="light" role="status" />
                        </>
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
                        <>
                          <Spinner animation="grow" variant="light" role="status" />
                          <Spinner animation="grow" variant="light" role="status" />
                          <Spinner animation="grow" variant="light" role="status" />
                        </>
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
                      <>
                        <Spinner animation="grow" variant="light" role="status" />
                        <Spinner animation="grow" variant="light" role="status" />
                        <Spinner animation="grow" variant="light" role="status" />
                      </>
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
              <div className="card col-xl-5 col-sm-3 ml-3 mr-1">
                <div className="card-header">
                  <i className="fas fa-chart-area"></i>
                  Graficos de Actividad 
                </div>
                <div className="card-body">
                  <div >
              
                    <LineChart
                    textchart={'Test Graph'}
                    typechart={'bar'}
                    xdata={list.map(datarr =>
                      datarr.location
                      )}
                    ydata={list.map(datarr =>
                      datarr.quantity
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="card w-15 col-sm-3 ml-1 mr-1">
                <div className="card-header">
                  <i className="fas fa-chart-area"></i>
                  Graficos de Actividad 
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
                        textchart={"Circle"}
                    />
                  </div>
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>

              <div className="card w-15 col-sm-3 ml-1 mr-1">
                <div className="card-header">
                  <i className="fas fa-chart-area"></i>
                    Graficos de Actividad 
                </div>
                <div className="card-body">
                  <div >
              
                    <RatingChart
                      ydata={list.map(datarr =>
                      datarr.location
                      )}
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
                <div className="card-header">
                  <i className="fas fa-table"></i>
                    Map Display
                </div>
                <div className="card-body">
                  
                  <div className="row container">
                    { !hotLocation  ?

                      <>  
                        
                        <Spinner animation="grow" variant="light" role="status" />
                        <Spinner animation="grow" variant="light" role="status" />
                        <Spinner animation="grow" variant="light" role="status" />
                        
                      </>

                      :
                    <>
                    
                    <Maps
                      position={hotLocation}
                      zoom={2}
                      height={"300px"}
                      width={"1000px"}
                      loading={loading}
                    />
                    
                    </>
                    }
                    
                    <Table style={{overflow: 'auto', height: '20px'}}>
                      <thead>
                        <tr>
                          <th>xfsdfsd</th>
                          <th>3434534</th>
                        </tr>
                      </thead>
                      
                      <tbody >
                        <tr>
                          <td>mjmj</td>
                          <td>5656</td>
                        </tr>
                        <tr>
                          <td>mjmj</td>
                          <td>5656</td>
                        </tr>
                        <tr>
                          <td>mjmj</td>
                          <td>5656</td>
                        </tr>
                        <tr>
                          <td>mjmj</td>
                          <td>5656</td>
                        </tr>
                  
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

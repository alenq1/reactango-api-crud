import React, { useState, useEffect } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import SideBar from '../components/SideBar'
import { ModalLoc } from '../components/ModalLoc'
import Queryservice from '../services/QueryService'
import Open from '../ApiKeys'
import { Card, CardColumns, CardDeck, CardGroup, Spinner, Row, Button, Modal, OverlayTrigger } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from 'react-rating'
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti'
import axios from 'axios'
import { openWeatherApi } from '../ApiKeys'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const queryservice = new Queryservice()
const MySwal = withReactContent(Swal)


const renderTooltip = (images, name) => (
    
  <div
    
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: '10px 10px',
      color: 'white',
      borderRadius: 5
    
    }}>
    <img
      src={images === null ?
        'weather'
      :
        images
      }
        width='360'
        height='240'
    />
    {console.log(images, 'RUTA DEIMAGENM')}
    {name}
      {images}
  </div>
);


const Locations = (props) => {

    const [locationList, getLocs] = useState([])
    const [loading, isLoading] = useState(false)
    const[modalshow, handleHide] = useState(false)
    const[weather, showWeather] = useState({})
        const { validated } = 'false';
        const style = {
        height: '100px',
        width: '200px'

        }
        useEffect(() => {
            isLoading(true)
        //console.log(props.fields.location) 
        queryservice.getLocations()
         
        .then( result => {
            
            console.log(result.data, 'result de LOCATIIONS')
            getLocs(result.data)
            console.log(locationList, 'LOCATIONS AS STATE')
            isLoading(false)
          })
          .catch( error  => {
            getLocs([error.message])
            isLoading(false)    
          })
          
          async function fetchData(name) {
            
            await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${openWeatherApi}`)
            .then( result  => {
              console.log(result.data, 'RESULTADO DE WEATHER')
              showWeather({...weather,
                 result
              })
      
            })
            .catch(error => {
              console.log(error.request, 'RESULTADO DE ERROR')
              showWeather({...weather,
                error
             })
      
            })
            
            }
            // locationList.map(xxx => fetchData(xxx.name),
            // console.log(xxx.name, 'no hace')
            // )
                   
    }
        //console.log('It got rendered')
        
        ,
        // add empty array avoid infinite loop
        []
        )
    const Showed = (event) => {
        handleHide(!modalshow)
        }

    
    return (
        <>
        <Header brand={props.nameapp} alerts={MySwal}/>
      <div id="content-wrapper">
        <SideBar/>
        <div className="container-fluid mt-2" style={{paddingLeft: '80px'}}>
      <ol className="breadcrumb">
            <li className="breadcrumb-item">
            
              <a href="">Location</a>
            
              </li>
            
            <li className="breadcrumb-item active">List</li>
          </ol>
          <ModalLoc
          
          showed={modalshow}
          hide={Showed}
          />
          <Row className="justify-content-center m-4">
      <h1> </h1>
        <Button  
        onClick={Showed} variant="success" className="ml-4">
        Add New
        </Button>
      </Row>
          
          {loading ?

                <div style={{textAlign: 'center',
                margin: 'auto',
                padding: '200px'

                }}>

                <Spinner animation="grow" variant="light" role="status" />
                <Spinner animation="grow" variant="light" role="status" />
                <Spinner animation="grow" variant="light" role="status" />

                </div>
                        
          :
            <CardColumns>
          {    
          locationList.map(locations =>
           
           <Card key={locations.id} style={{flex: 1}}>
           
           <Card.Body className="h-100  ">
           <OverlayTrigger
                  placement="right-end"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip('data', locations.name)}
              >
           <Card.Img variant="top" src={'static/media/no-image-available-icon-6.jpg'} />
           </OverlayTrigger>
             <Card.Title>{locations.name}</Card.Title>
             <Card.Text>
             
             This card has supporting text below as a natural lead-in to additional
               content.{' '}This card has supporting text below as a natural lead-in to additional
               content.{' '}
             </Card.Text>
           </Card.Body>
           <Card.Footer>
             <small className="text-muted">
               <Rating 
               stop={10}
               step={2}
               initialRating={locations.rating}
               emptySymbol={<h3><TiStarOutline/></h3>}
               fullSymbol={<h3><TiStarFullOutline/></h3>}
               />
               </small>
           </Card.Footer>
         </Card> 
         

            )}
            </CardColumns>
            }
            
            
            
          </div>
          </div>
       <Footer/>
       </>
    )
}

export default Locations

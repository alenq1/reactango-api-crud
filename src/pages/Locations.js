import React, { useState, useEffect } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import SideBar from '../components/SideBar'
import Queryservice from '../services/QueryService'
import { Card, CardColumns, CardDeck, CardGroup, Spinner, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const queryservice = new Queryservice()
const MySwal = withReactContent(Swal)


const Locations = (props) => {

    const [locationList, getLocs] = useState([])
    const [loading, isLoading] = useState(false)
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
  
                   
    }
        //console.log('It got rendered')
        
        ,
        // add empty array avoid infinite loop
        []
        )

    
    return (
        <>
        <Header brand={props.nameapp} alerts={MySwal}/>
      <div id="content-wrapper">
        <SideBar/>
        <div className="container-fluid mt-2" style={{paddingLeft: '80px'}}>
      <ol className="breadcrumb">
            <li className="breadcrumb-item">
            <Link to="/dashboard">
              <a href="">Dashboard</a>
              </Link>  
              </li>
              <li className="breadcrumb-item">
              <Link to="/list">
              <a href="">List</a>
              </Link>  
              </li>
            <li className="breadcrumb-item active">Overview</li>
          </ol>
          <Row className="justify-content-center m-4">
      <h1>Location List </h1>
        <Button  
        onClick='' variant="success" className="ml-4">
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
           <Card.Img variant="top" src={'http://localhost:8000/media/media/no-image-available-icon-6.jpg'} />
             <Card.Title>{locations.name}</Card.Title>
             <Card.Text>
             
             This card has supporting text below as a natural lead-in to additional
               content.{' '}This card has supporting text below as a natural lead-in to additional
               content.{' '}
             </Card.Text>
           </Card.Body>
           <Card.Footer>
             <small className="text-muted">Last updated 3 mins ago</small>
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

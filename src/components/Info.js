import React, { useState, useEffect } from 'react'
import { Form, Col, InputGroup, Button, Table } from 'react-bootstrap';
import Maps from './Maps';
import axios from 'axios'


const Info = (props) => {
    
    
    const[coord, getMapLoc] = useState({lat: '', 
                                        long: '', 
                                        zoom: props.zoom});
    const { validated } = 'false';
    const style = {
      height: '100px',
      width: '200px'

    }
     useEffect(() => {
      console.log(props.fields.location) 
      const fetchData = async () => {
      await axios.post(`https://nominatim.openstreetmap.org/search?format=json&q=${props.fields.location}`)
      .then( result  => {
        console.log(result.data[0].lat, 'RESULTADO DE COORDENADA')
        getMapLoc({...coord,
           lat: result.data[0].lat,
            long: result.data[0].lon,
        })

      })
      .catch(error => {
        console.log(error, 'RESULTADO DE ERROR')
        getMapLoc({...coord,
          lat: props.lat,
           long: props.long,
       })

      })
      }
      //console.log('It got rendered')
      fetchData();
    },
    // add empty array avoid infinite loop
    []
    )
  
     
    return (

      <Table responsive="md"  className="table-borderless table-hover">
            
            <tr>
              <thead>
              <th>Name</th>
              </thead>              
              <td>{props.fields.name}</td>
              </tr>
              
           <tr>
           <thead>
           <th>Description</th>            
           </thead>
           <td>{props.fields.description}</td>  
           </tr>
           <tr>
           <thead>
              <th>Quantity</th>
              </thead>
              <td>{props.fields.quantity}</td>
          </tr> 
          <tr>
          <thead>
          <th>Price</th>              
          </thead>
          <td>{props.fields.price}</td>
          </tr>
          <tr>
          <thead>
           <th> Location</th>
           </thead>
           <td>{props.fields.location}</td>
           </tr>
          <tr>
            <td  colSpan="2">
            <Maps
            lat={coord.lat}
            long={coord.long}
            zoom={props.zoom}
            />
            </td>
        </tr>

    </Table>
      
    );
  
}

export { Info };
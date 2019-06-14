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

      <Table className="table-borderless table-hover table-striped text-center p-3" 
         style={{
          cell: "2px",
          borderSpacing: "5px",
         }} 
            >
        <tr >
            <td className="bg-dark text-white">Name</td>
            <td className="bg-white text-dark">{props.fields.name}</td>
        
        </tr>
        <tr>
           <td className="text-white">Description</td>            
           <td className="">{props.fields.description}</td>  
        </tr>
         
        <tr>
          <td className="text-white">Price</td>              
          <td className="">{props.fields.price}</td>
        </tr>
        <tr>
          <td className="bg-dark text-white"> Location</td>
          <td className="bg-white text-dark">{props.fields.location}</td>
        </tr>
        <tr>
            <td  colSpan="2">
            <Maps
            lat={coord.lat}
            long={coord.long}
            zoom={props.zoom}
            height={"250px"}
            width={"450px"}
            />
            </td>
        </tr>

    </Table>
      
    );
  
}

export { Info };
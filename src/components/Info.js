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
    
    
  
     
    return (

      <Table className="table-borderless table-hover table-striped text-center p-3" 
         style={{
          cell: "2px",
          borderSpacing: "5px",
         }} 
            >
        <tbody>
        <tr >
            <th className="bg-dark text-white">Name</th>
            <td className="bg-white text-dark">{props.fields.name}</td>
        
        </tr>
        <tr>
           <th className="text-white">Description</th>
           <td className="">{props.fields.description}</td>  
        </tr>
         
        <tr>
          <th className="text-white">Price</th>  
          <td className="">{props.fields.price}</td>
        </tr>
        <tr>
          <th className="bg-dark text-white"> Location</th>
          <td className="bg-white text-dark">{props.fields.location}</td>
        </tr>
        <tr>
            <td  colSpan="2">
            <Maps
            position={[props.fields.location]}
            zoom={props.zoom}
            height={"250px"}
            width={"450px"}
            />
            </td>
        </tr>
        </tbody>

    </Table>
      
    );
  
}

export { Info };
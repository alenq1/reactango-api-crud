import React from 'react'
import {Container, Row} from 'react-bootstrap'


const style={
 
  color: '#fff',
  background: '#00003E',
  background: '-webkit-linear-gradient(to right, #31BDE6, #00003E)',
  background: 'linear-gradient(to right, #31BDE6, #00003E)',
  textAlign: 'center'

}


const footer = (props) => {
  return (

      <div  className="py-4 bg-dark text-center">
      {props.message}
      </div>
    
  
  )
}

export default footer

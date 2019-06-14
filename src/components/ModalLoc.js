import React, { useState, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap'
import FormLoc from '../components/FormLoc'
import QueryService from '../services/QueryService'


const queryservice = new QueryService()

const style = {

  background: '#343a40',  
  color: 'whitesmoke',
  textShadow: '#282c34',
  
}

const stylein = {

  //background: '-webkit-linear-gradient(to right, #0b8793, #360033)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to right, #0b8793, #360033)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: 'whitesmoke',

}

const ModalLoc = (props) => {

    const[fieldloc, handlelistLoc] = useState({});
    const[message, setMessage] = useState('')
    const[data, sendData] = useState({})

    

    const handleChange = (event) => {
      
      handlelistLoc({...fieldloc, 
        
        [event.target.name]: event.target.value
        
      })
      console.log(fieldloc, "cambios en LOOOOOOOOOOOOOOO")
    }
    const NewLocation = (data) => {
    queryservice.createLocation(data)
        .then( result => {
          console.log(result, 'CREADO LOCATION')
           setMessage(...message, 'success')
           props.hide()
           //console.log(this.state.locations, 'Locations state con axios')
           
         })
         .catch( error  => {
          console.log(error.message, 'ERORR CREATE LOCATION')
          setMessage(...message, error.message)
         })

        }


    useEffect(() => {

      if (fieldloc == null || fieldloc === '') {
        return;
      }
      
      
        //console.log("PISADDOOOO")
        
  
  
      

    }, [data])

    


    return (
      <Modal show={props.showed} onHide={props.hide}>
      <Modal.Header style={style} closeButton>
        <Modal.Title>{props.modaltitle}</Modal.Title>
      </Modal.Header>
        <Modal.Body style={stylein}>
          
        
          
          <FormLoc 
          fields={fieldloc}
          handleChange={handleChange}
          name="name"
          />
        
        
        </Modal.Body>
        <Modal.Footer style={style}>
        <Button variant="success" onClick={() => NewLocation(fieldloc)}>Add</Button>
        <Button variant="info" onClick={props.hide}>Back</Button>
        </Modal.Footer>

      </Modal>
    )
}
export { ModalLoc }
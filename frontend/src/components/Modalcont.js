import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import  {FormCU} from './FormCU'
import QueryService from '../services/QueryService'


const queryservice = new QueryService()

const style = {

  background: '#343a40',  
  color: 'whitesmoke',
  textShadow: '#282c34',
  
}

const stylein = {

  background: '-webkit-linear-gradient(to right, #0b8793, #360033)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to right, #0b8793, #360033)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: 'whitesmoke',

}
export default class Modalcont extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      locations: [],
      fields: [],
      error: ''

       
    }

  }
  
  componentDidMount(){
    queryservice.getLocations()
  
      .then( result => {
         // console.log(result, 'result con axios')
          this.setState({
            locations: result.data
          })
          //console.log(this.state.locations, 'Locations state con axios')
          
        })
        .catch( error  => {
          this.setState({ error: error.message });
        })

    
  }


  render() {
  
    const {modaltitle, handleCreate, handleUpdate, fields } = this.props
    const agrega = <Button variant="success" onClick={() => handleCreate(fields)}>{modaltitle}</Button>
    const modifica = <Button variant="success" onClick={() => handleUpdate(fields)}>{modaltitle}</Button>
      
    
    return (
      <Modal show={this.props.show} onHide={() => this.props.handleHide()}>
      <Modal.Header style={style} closeButton>
        <Modal.Title>{this.props.modaltitle}</Modal.Title>
      </Modal.Header>
        <Modal.Body style={stylein}>
          <FormCU
          locations={this.state.locations}
          fields={this.props.fields}
          handleChange={this.props.handleChange}
          

          ></FormCU>
        </Modal.Body>
        <Modal.Footer style={style}>
          {modaltitle === 'Create' ? agrega : modifica}
        <Button variant="info" onClick={() => this.props.handleHide()}>Back</Button>
        </Modal.Footer>

      </Modal>
    )
  }
}
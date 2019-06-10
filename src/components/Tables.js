import React from 'react'
import { Table, Button, OverlayTrigger, Spinner } from 'react-bootstrap'
import {  FaRegEdit, FaEdit, FaTrashAlt, FaTrash, FaRegTrashAlt} from 'react-icons/fa'




const Tables = (props) => {

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

  const defaultImage = require('../layout/img/site/no-image-available-icon-6.jpg')

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
          defaultImage
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
  
  
  
  
  return (
    <Table className="table-borderless table-hover table-striped text-center mr-4 mt-4" style={style}>
        <thead className="bg-dark">
        
            <tr>
              <th>Preview</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>              
              <th>Description</th>            
              <th>
              Actions
              </th>
            </tr>
            
        </thead>
        <tbody>
          {  props.list.length  === 0 ?

            <tr >
              
              <td>There is no Products yet</td>
              
            </tr>  
            
            :
            
            props.list.map(product =>
            
            <tr key={product.id}>
              <OverlayTrigger
                  placement="right-end"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip(product.images, product.name)}
              >
              <td>
                <img
                    src={product.images === null ?
                    defaultImage
                  :
                    product.images
                    }
                    width='60'
                    height='40'
                />
                </td>
              </OverlayTrigger>
              <td onClick={() => props.handleOnClick(product)}>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.description}
              </td>            
              <td>
              <Button className="mr-2 " variant="warning" onClick={() => props.handleData(product)}>
                <FaEdit/>
                
                   </Button>
              <Button variant="danger" onClick={() => 
                
                props.handleDelete(product.id)}>
                  
                  
                  <FaTrashAlt/>
                  
                
              </Button>
              </td>
            </tr>
            )}
        </tbody>

    </Table>
  )
}

export default Tables
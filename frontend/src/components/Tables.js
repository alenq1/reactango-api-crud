import React from 'react'
import { Table, Button } from 'react-bootstrap'

const Tables = (props) => {
  return (
    <Table className="table-borderless table-hover table-striped text-center">
        <thead>
        
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
              <td><img
      src={product.images}
      width='45'
      height='30'
      /></td>
              <td onClick={() => props.handleOnClick(product)}>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>            
              <td>
              <Button variant="warning" onClick={() => props.handleData(product)}>edit</Button>
              <Button variant="danger" onClick={() => 
                
                
                props.handleDelete(product.id)
                
                
                
                }>delete</Button>
              </td>
            </tr>
            )}
        </tbody>

    </Table>
  )
}

export default Tables

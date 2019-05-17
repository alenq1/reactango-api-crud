import React from 'react'
import { Table, Button } from 'react-bootstrap'

const Tables = (props) => {
  return (
    <Table className="table  table-striped text-center">
        <thead>
        
            <tr>
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
          {props.list.map(product =>
            
            <tr key={product.id}>
              <td>{product.name}</td>
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

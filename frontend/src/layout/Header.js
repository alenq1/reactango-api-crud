import React from 'react'
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap'
import { Redirect, withRouter } from 'react-router-dom'


const style ={


}



const Header = (props) => {
  
  const user =sessionStorage.getItem('user')
  return (
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={style}>
    <Navbar.Brand href="#home">{props.brand}</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      
    </Nav>
    <Nav>
      {
      sessionStorage.tkaccess ? 
      
        <NavDropdown title={user} id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onSelect={function (){
          props.history.push("/")
          sessionStorage.removeItem('tkaccess')
          sessionStorage.removeItem('tkrefresh')
          sessionStorage.removeItem('user')
        }}> Logout
        
        </NavDropdown.Item>
      </NavDropdown>
      
               
        : 
        
        <Button onClick={(e) => props.history.push("/login")}>
          login
        </Button>
      }
    </Nav>
    
  </Navbar>
      
    
  )
}


export default withRouter(Header)

import React from 'react'
import { Nav, Navbar, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { Redirect, withRouter } from 'react-router-dom'


const stylea ={

}


const Header = (props) => {
  
  const user = sessionStorage.getItem('user')
  return (
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">{props.brand}</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      
    </Nav>
    <Nav>
      {
      sessionStorage.tkaccess ? 
      
        
        <DropdownButton alignRight
        title={user}
        id="dropdown-menu-align-right">

        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        
        <Dropdown.Item onSelect={function (){
          
          props.alerts.fire({
            title: 'Are you sure?',
            text: "Want logout??",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Log out!'
          }).then((result) => {
            if (result.value) {
              props.alerts.fire(
                'LoggedOut!',
                'Your exited from the app.',
                'info',
                sessionStorage.removeItem('tkaccess'),
                sessionStorage.removeItem('tkrefresh'),
                sessionStorage.removeItem('user'),
                props.history.push("/")
              )
            }
          })
          
          
          
          
          
        }}> Logout
        
        </Dropdown.Item>
      </DropdownButton>
      
               
        : 
        
        <Button onClick={(e) =>           
          
          props.history.push("/login")
        
        }>
          
          login
        </Button>
      }
    </Nav>
    
  </Navbar>
      
    
  )
}

export default withRouter(Header)

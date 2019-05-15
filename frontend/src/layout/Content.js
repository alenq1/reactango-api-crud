import React, { Component } from 'react'
import FormLogin from '../components/FormLogin';
import { Redirect, withRouter } from 'react-router-dom'
import { Card, Alert } from  'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons';
import  { fab }from '@fortawesome/free-brands-svg-icons';
import QueryService from '../services/QueryService';
import axios from 'axios';


const queryservice = new QueryService();

library.add(far, fab)

const title = 'Login'
const style = { 
        
    padding: '10px',
    margin: '10px 0',
    background: 'black',
    height: '50%',
    width: '50%'
   
    
        }


class Content extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
       validated: false,
       username: '',
       password: '',
       message: ''

    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }
  
  async handleLogin(event){
    
    const { username, password, message} = this.state
    
    if(!(username && password)){
      const displaymsg = <Alert variant='danger'>Rellene los campos</Alert>
      this.setState({ message: displaymsg })
       //console.log('inavlidoregresa')
       return;
    }
    //console.log('pasa ahora')
    await axios({
      method: 'post',
      url: 'http://localhost:8000/api-token-auth/',
      data: {
        'username': username,
        'password': password
      }
      })
    
      .then( result  => {

       // console.log(result, 'LOGIN EXITOSO RECIBE TOKEN')
        //this.setState({ logged: true})
        sessionStorage.setItem("tkaccess", result.data.access)
        sessionStorage.setItem("tkrefresh", result.data.refresh)
        sessionStorage.setItem("user", username)
        this.props.history.push("/list")
        })
        
      .catch(error => {
        //  console.log(error, 'LOOOIGn FALLIDO')
        const displaymsg = <Alert variant='danger'>Login Fallido</Alert>
          
          if(!error.response){
            const displaymsg = <Alert variant='danger'>{error.response}</Alert>  
          }
          else if (error.request){
            const displaymsg = <Alert variant='danger'>{error.request}</Alert>  
          }
          this.props.history.push("/login")
            
          this.setState({ message: displaymsg })
        });


    

    //event.preventDefault();  
    /* fetch('http://localhost:8000/api-token-auth/')
    .then(resp => 
      console.log(resp, 'RESPONSE GET')
      )
    .catch(error =>
      console.log(error, 'ERRRO GET')
      )
 */
      
      //queryservice.login(this.state.username, this.state.password)      
      
      //event.stopPropagation();
      //this.setState({ validated: true });
      
    }

/* 

    console.log(event, 'pasado evento')
    console.log(this.state.username, this.state.password, 'user y password')
    
 */
    //queryservice.login(this.state.username, this.state.password)
    //this.getLoc()



    /*
    const { username, password } = this.state
    console.log(username, password, 'vainas a pasar')
*/

  handleChange(event){
    let {name, value} = event.target
    this.setState({

        [name]: value
    })
    //console.log(this.state)

  }

  render() {
    const { validated, message } = this.state
    return (
        <div className="row border-info text-center justify-content-sm-center">
        <Card bg="dark" text="white" style={style} className="justify-content ">
            <Card.Header>
            <FontAwesomeIcon icon={['fab', 'apple']}  />
                {title}
                {message}
            </Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                  <FormLogin
                  validated={validated}
                  name={'username'}
                  username={this.state.username}
                  password={this.state.password}
                  namepassword={'password'}
                  handleChange={this.handleChange}
                  handleLogin={this.handleLogin}
                  />
            </Card.Body>
        </Card>
        </div>
    
    )
  }
}
export default withRouter(Content);
 

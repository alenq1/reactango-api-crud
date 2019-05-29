import React, { Component } from 'react'
import FormLogin from '../components/FormLogin';
import FormRegister from '../components/FormRegister';
import { Redirect, withRouter } from 'react-router-dom'
import { Card, Alert, Tab, Tabs } from  'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons';
import  { fab }from '@fortawesome/free-brands-svg-icons';
import QueryService from '../services/QueryService';
import axios from 'axios';



//const queryservice = new QueryService();
const loginurl = 'http://localhost:8000/api-token-auth/'
const registerurl = 'http://localhost:8000/api-register/'


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
       message: '',
       tab: 'login'

    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)

  }
  
  async handleLogin(event){
    
    const { username, password, message} = this.state
    
    if(!(username && password)){
      const displaymsg = <Alert variant='warning'>Rellene los campos</Alert>
      this.setState({ message: displaymsg })
       //console.log('inavlidoregresa')
       return;
    }
    //console.log('pasa ahora')
    await axios({
      method: 'post',
      url: loginurl,
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
        this.props.history.push("/dashboard")
        })
        
      .catch(error => {
        //console.log(error, error.request.response, 'Login Error')
            let  displaymsg;
            if(error.response){
              //console.log(error, error.request.response, 'error respuesta')
              displaymsg = <Alert variant='danger'>Login Failed</Alert>  
            }
            else if (error.request){
              //console.log(error, error.request.response, 'error peticion')
              displaymsg = <Alert variant='danger'>{error.message}</Alert>  
            }
            else{
              //console.log(error, error.request.response, 'error otros')
              displaymsg = <Alert variant='danger'>{error.message}</Alert>  
            }
            this.props.history.push("/login")
              
            this.setState({ message: displaymsg })
          });
      
    }


    async handleRegister(event){
    
      const { username, password, message} = this.state
      
      if(!(username && password)){
        const displaymsg = <Alert variant='warning'>Rellene los campos</Alert>
        this.setState({ message: displaymsg })
         //console.log('inavlidoregresa')
         return;
      }


      //console.log('pasa ahora')
      await axios({
        method: 'post',
        url: registerurl,
        data: {
          'username': username,
          'password': password
        }
        })
      
        .then( result  => {
  
          //console.log(result, 'REGISTRO SUCCESS')
          //this.setState({ logged: true})
          const displaymsg = <Alert variant='success'>Register Success!!</Alert>
          this.setState({ message: displaymsg })
          
          })
          
        .catch(error => {
            //console.log(error, error.request.response, 'Register Failed')
            let  displaymsg;
            if(error.response){
              //console.log(error, error.request.response, 'error respuesta')
              displaymsg = <Alert variant='danger'>{error.message}</Alert>  
            }
            else if (error.request){
              //console.log(error, error.request.response, 'error peticion')
              displaymsg = <Alert variant='danger'>{error.message}</Alert>  
            }
            else{
              //console.log(error, error.request.response, 'error otros')
              displaymsg = <Alert variant='danger'>{error.message}</Alert>  
            }
            this.props.history.push("/login")
              
            this.setState({ message: displaymsg })
          });
        
      }


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
                <Tabs
                    id="controlled-tab-example"
                    activeKey={this.state.tab}
                    onSelect={tab => this.setState({ tab })}
                >
                <Tab eventKey="login" title="login">
          
        
                  <FormLogin
                  validated={validated}
                  name={'username'}
                  username={this.state.username}
                  password={this.state.password}
                  namepassword={'password'}
                  handleChange={this.handleChange}
                  handleLogin={this.handleLogin}
                  />
                  </Tab>
                  <Tab eventKey="register" title="register">  
                  <FormRegister
                  validated={validated}
                  name={'username'}
                  username={this.state.username}
                  password={this.state.password}
                  namepassword={'password'}
                  handleChange={this.handleChange}
                  handleRegister={this.handleRegister}
                  />
                  </Tab>
                  </Tabs>
            </Card.Body>
        </Card>
        
        </div>
    
    )
  }
}
export default withRouter(Content);
 
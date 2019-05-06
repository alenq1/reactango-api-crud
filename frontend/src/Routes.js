import React, { Component } from 'react'
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from "react-router-dom";
import List from './pages/List'
import Login from './pages/Login'
import Home from './pages/Home'
import PrivRoute from './PrivRoute'


const hist = createBrowserHistory();

export default class Routes extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       authenticated: false
    }

  this.auth();
  }
  
  auth(){

  /* if (!sessionStorage.getItem('tkaccess')) { 
    console.log('SIN ACCESO')
    this.setState({ 
      authenticated: false
    })
    hist.push("/login"); 
  }

  else {
    
    console.log('AUTROZADO')
    this.setState({ 
      authenticated: true
    })
    hist.push("/list")

  }
 */
  }

  render() {
    return (
      <Router history={hist}>
        <Switch>
           <Route exact path="/login" component={Login} />
           <Route exact path="/" component={Home} />
           <PrivRoute exact path="/list" component={List} />
        </Switch>
    </Router>
      
    )
  }
}

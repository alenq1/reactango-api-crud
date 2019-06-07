import React from 'react'
import  Header  from '../layout/Header'
import  Footer  from '../layout/Footer'
import  CarouselHome  from '../components/CarouselHome';
import { Container, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FaPen } from "react-icons/fa"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const nameapp = 'Header'
const footermsg = 'Footer'
const style = { 
   
  textAlign: 'center',
  
  
  
      }

const footerstyle = { 
   
  
      }



const Home = (props) => {
  
    return (
        <>
      <Header brand={nameapp} alerts={MySwal}/>
        
        <CarouselHome>
        <Link to="/login">
            <Button>TEST</Button>
        </Link>      
        </CarouselHome>
        
        <div class="container-fluid">
          { /* IMPORTANT CLASS DEFINITION FOR FIT PAGE -------> CONTAINER FLUID */}

  
  <h1 class="my-6">Top Features
    <small></small>
  </h1>

  <div class="row">
    <div class="col-lg-3 col-sm-6 mb-3">
      <div class="card h-100">
        <a href="#"><img class="card-img-top" src={require('../layout/img/site/react.png')} alt=""/></a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">React app </a>
          </h4>
          <p class="card-text">SPA made in react as Front-End, Using libaries like, axios, react-boostrap, leaflet, echart,setc </p>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 mb-3">
      <div class="card h-100">
        <a href="#"><img class="card-img-top" src={require('../layout/img/site/drf.png')} alt=""/></a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">Django Rest Framework</a>
          </h4>
          <p class="card-text">DRF as backend API with modelviewsets, serializers, routes.</p>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 mb-3">
      <div class="card h-100">
        <a href="#"><img class="card-img-top" src={require('../layout/img/site/docker.png')} alt=""/></a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">Docker </a>
          </h4>
          <p class="card-text">For deploying both enviroments, and fast start</p>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 mb-3">
      <div class="card h-100">
        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">Other </a>
          </h4>
          <p class="card-text">For deploying both enviroments, and fast start</p>
        </div>
      </div>
    </div>
    
    
  </div>
  
  
  
  
  <hr class="featurette-divider"/>

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">Login/Register actions. <span class="text-muted">Using JWT.</span></h2>
        <p class="lead">Using JWT on the backend with access token, and refresh token for enforcing security</p>
      </div>
      <div class="col-md-5">
      <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" 
        width="500" height="250" xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice" focusable="false" role="img" 
        aria-label="Placeholder: 500x500">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#eee"></rect>
          <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
      </div>
    </div>

    <hr class="featurette-divider"/>

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">Dashboard and Graphics <span class="text-muted">And visual stuffs</span></h2>
        <p class="lead">Using bootstrap and other libaries for User Interface more friendly</p>
      </div>
      <div class="col-md-5 order-md-1">
        <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" 
        width="500" height="250" xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice" focusable="false" role="img" 
        aria-label="Placeholder: 500x500">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#eee"></rect>
          <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
      </div>
    </div>

    <hr class="featurette-divider"/>

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">Crud Operations <span class="text-muted">All in one app</span></h2>
        <p class="lead">Allow the most common actions for data manipulation (CRUD) in only onepage</p>
      </div>
      <div class="col-md-5">
      <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" 
        width="500" height="250" xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice" focusable="false" role="img" 
        aria-label="Placeholder: 500x500">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#eee"></rect>
          <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
      </div>
    </div>

    <hr class="featurette-divider"/>

    
    <div className="row">



    </div>
    
  

  
  
</div>
        
      <Footer message={footermsg}/>
      </>
    )
  
}
export default Home
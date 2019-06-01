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

  
  <h1 class="my-6">Page Heading
    <small>Secondary Text</small>
  </h1>

  <div class="row">
    <div class="col-lg-4 col-sm-6 mb-4">
      <div class="card h-100">
        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">Project One</a>
          </h4>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!</p>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-sm-6 mb-4">
      <div class="card h-100">
        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">Project Two</a>
          </h4>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-sm-6 mb-4">
      <div class="card h-100">
        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">Project Three</a>
          </h4>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>
        </div>
      </div>
    </div>
    
  </div>
  
  
  
  
  <hr class="featurette-divider"/>

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
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
        <h2 class="featurette-heading">Oh yeah, it’s that good. <span class="text-muted">See for yourself.</span></h2>
        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
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
        <h2 class="featurette-heading">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
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
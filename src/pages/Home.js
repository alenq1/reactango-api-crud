import React from 'react'
import  Header  from '../layout/Header'
import  Footer  from '../layout/Footer'
import  CarouselHome  from '../components/CarouselHome';
import { Container, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FaPen } from "react-icons/fa"
import Swal from 'sweetalert2'
import { FaKey, FaLock, FaUser, FaWrench } from 'react-icons/fa'
import { IoIosSpeedometer, IoMdAnalytics, IoIosJournal, IoIosAnalytics, IoIosInformationCircleOutline } from 'react-icons/io'
import { MdLibraryAdd, MdModeEdit, MdViewList, MdDeleteForever } from 'react-icons/md'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const nameapp = 'Header'
const footermsg = 'Footer'
const style = { 
   
  textAlign: 'center',
  
  
  
      }

const footerstyle = { 
   
  
      }

const cardcontent = [
  {
"image": require('../layout/img/site/react.png'),
"title": 'React app',
"text": 'SPA made in react as Front-End, Using libaries like, axios, react-boostrap, leaflet, echart,setc '
},
{
"image": require('../layout/img/site/drf.png'),
"title": 'Django Rest Framework',
"text": 'DRF as backend API with modelviewsets, serializers, routes.'
},
{
 "image": require('../layout/img/site/docker.png'),
 "title": 'Docker',
 "text": 'For deploying both enviroments, and fast start'
 },
 {
  "image": require('../layout/img/site/no-image-available-icon-6.jpg'),
  "title": 'Other',
  "text": 'Lorem ipsum'
  },
]

const dividercontent = [
  {"image": require('../layout/img/site/no-image-available-icon-6.jpg'),
  "title": 'Login/Register actions.',
  "title1":'Using JWT.',
  "text": 'Using JWT on the backend with access token, and refresh token for enforcing security'},

  {"image": require('../layout/img/site/no-image-available-icon-6.jpg'),
  "title": 'Dashboard and Graphics',
  "title1":'And visual stuffs',
  "text": 'Using bootstrap and other libaries for User Interface more friendly'},

  {"image": require('../layout/img/site/no-image-available-icon-6.jpg'),
  "title": 'Crud Operations <span className="text-muted">',
  "title1":'All in one Single Page without Reloading',
  "text": 'Allow the most common actions for data manipulation (CRUD) in only onepage'}

]


const Home = (props) => {
  
    return (
        <>
      <Header brand={nameapp} alerts={MySwal}/>
        
        <CarouselHome>
        <Link to="/login">
            <Button>TEST</Button>
        </Link>      
        </CarouselHome>
        
        <div className="container-fluid">
          { /* IMPORTANT CLASS DEFINITION FOR FIT PAGE -------> CONTAINER FLUID */}

  
  <h1 className="my-6">Top Features
    <small></small>
  </h1>

  <div className="row">
    { cardcontent.map( (content, index) =>
    <div className="col-lg-3 col-sm-6 mb-3" key={index}>
      <div className="card h-100">
        <a href="#"><img className="card-img-top" src={content.image} alt=""/></a>
        <div className="card-body">
          <h4 className="card-title">
            <a href="#">{content.title}</a>
          </h4>
          <p className="card-text">{content.text}</p>
        </div>
      </div>
    </div>
    )}
    
    
  </div>
  
  <hr className="featurette-divider"/>

    <div className="row featurette">
      <div className="col-md-7">
        <h2 className="featurette-heading">{dividercontent[0].title} <span className="text-muted">{dividercontent[0].title1}</span></h2>
        <p className="lead">{dividercontent[0].text}</p>
      </div>

      <div className="container justifiy-content-right">
      <div className="row">
        <h1>{<FaKey/>}</h1>
        <h1>{<FaLock/>}</h1>
     </div>
     <div className="row">
        <h1>{<FaUser/>}</h1>
        <h1>{<FaWrench/>}</h1>
      </div>
      </div>
    </div>

    <hr className="featurette-divider"/>

    <div className="row featurette">
      <div className="col-md-7 order-md-2">
        <h2 className="featurette-heading">{dividercontent[1].title}<span className="text-muted">{dividercontent[1].title1}</span></h2>
        <p className="lead">{dividercontent[1].text}</p>
      </div>
      <div className="col-md-5 order-md-1">
      <h1>{<IoIosInformationCircleOutline/>}</h1>
        <h1>{<IoIosJournal/>}</h1>
        <h1>{<IoIosSpeedometer/>}</h1>
        <h1>{<IoMdAnalytics/>}</h1>
      </div>
    </div>

    <hr className="featurette-divider"/>

    <div className="row featurette">
      <div className="col-md-7">
      <h2 className="featurette-heading">{dividercontent[2].title}<span className="text-muted">{dividercontent[2].title1}</span></h2>
        <p className="lead">{dividercontent[2].text}</p>
      </div>
      <div className="col-md-5">
      <h1>{<MdLibraryAdd/>}</h1>
        <h1>{<MdViewList/>}</h1>
        <h1>{<MdModeEdit/>}</h1>
        <h1>{<MdDeleteForever/>}</h1>
      
      </div>
    </div>

    <hr className="featurette-divider"/>

    
    <div className="row">



    </div>
    
</div>
        
      <Footer message={footermsg}/>
      </>
    )
  
}
export default Home
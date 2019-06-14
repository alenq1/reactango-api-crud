import React, { useState, useEffect } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import SideBar from '../components/SideBar'
import { ModalLoc } from '../components/ModalLoc'
import Queryservice from '../services/QueryService'
import '../bread.css'
import { Card, CardColumns, CardDeck, CardGroup, Spinner, Row, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from 'react-rating'
import axios from 'axios'
import { openWeatherApi, pixabayApi } from '../ApiKeys'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { TiStarFullOutline, TiStarOutline,
    TiWeatherCloudy,
    TiWeatherSunny,
    TiWeatherDownpour,
    TiWeatherNight,
    TiWeatherPartlySunny,
    TiWeatherShower,
    TiWeatherSnow,
    TiWeatherStormy,
    TiWeatherWindyCloudy,
    TiWeatherWindy

} from 'react-icons/ti'
import { FaRegPlusSquare } from 'react-icons/fa'


const queryservice = new Queryservice()
const MySwal = withReactContent(Swal)


const renderTooltip = ({main:{temp} , weather:[{main}]}) => (
// destructuring input for better render format
  
  <div
    
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: '10px 10px',
      color: 'white',
      borderRadius: 5
    
    }}>
      
    {main ?
    <>
      <h1>{main}</h1>
      <h1>{temp}</h1>
    </>
    :
    <>
      <Spinner animation="grow" variant="light" role="status" />
      <Spinner animation="grow" variant="light" role="status" />
      <Spinner animation="grow" variant="light" role="status" />
    </>
    
  }
    
     
    
    {console.log(temp, 'TEMPERATURA')}
    {console.log(main, 'TIEMPO')}
      
  </div>
);

const style = {

  color: 'black'
}


const Locations = (props) => {

    const [locationList, getLocs] = useState([])
    const [loading, isLoading] = useState(false)
    const[modalshow, handleHide] = useState(false)
    const[selecLoc, SelectedLoc] = useState('')
    const[weather, showWeather] = useState({main:{} , weather:[{}]})
    const[error, showError] = useState('')
    const images = []
    const[imagesList, setImages] = useState([])

    const { validated } = 'false';
    const style = {
        height: '100px',
        width: '200px'
        }

    async function fetchData(name) {
      
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${openWeatherApi}&units=metric`)
        .then( result  => {
          showWeather(result.data)
          console.log(result.data, 'RESULTADO DE WEATHER AS STATE')
        })
        .catch(error => {
          console.log(error.message, 'RESULTADO DE ERROR')
          showError(error.message)
      
        })
          
    }
    
    useEffect(() => {
      isLoading(true)
        //console.log(props.fields.location) 
      queryservice.getLocations()
         .then( async result => {
            console.log(result.data, 'result de LOCATIIONS')
            getLocs(result.data)
            console.log(locationList, 'LOCATIONS AS STATE')
            const vamosabusca = result.data
              console.log(vamosabusca[0], "VMAOABUSCANAME")
              for   (let nameimage of vamosabusca){
                await axios.get(`https://pixabay.com/api/?key=${pixabayApi}&q=${nameimage.name}`)
                //await axios.get(``)
                  .then( result  => {
            
                    //getLocs(...locationList, [{image:locationList.result.data.hits.imageURL}])
                    //console.log(result.data.hits[0].largeImageURL, 'RESULTADO DE IMAGEN PIXABAY AS STATE')
                    
                    //choose only one from ramdom picture result array
                    images.push(result.data.hits[Math.floor(Math.random() * 4)].largeImageURL)
                  // console.log(images, 'IMAGEN YA GUARDADAS PARa PRESENTAR')
                  })
                  .catch(error => {
                    console.log(error.message, 'RESULTADO DE ERROR')
                    showError(error.message)
                  })
              }
              setImages(images)
              isLoading(false)
         })
        .catch( error  => {
          showError([error.message])
          isLoading(false)    
        })
          
        
        
      }      
     // locationList.map(xxx => fetchData(xxx.name),
     // console.log(xxx.name, 'no hace')
     // )
    //console.log('It got rendered')    
      ,
        // add empty array avoid infinite loop
      []
    )
    
    const Showed = (event) => {
        handleHide(!modalshow)
        }
    const Selected = (name) => {
        SelectedLoc(name)
    }

    /////////////////////////const {main:{temp} , weather:[{main}]} = weather

    return (
        <>
        {console.log(imagesList, "AQUI ESTAN LISTAS PARA MOSTRAR")}
          <Header brand={props.nameapp} alerts={MySwal}/>
            <div id="content-wrapper">
              <SideBar/>
        
              <div className="container-fluid mt-2" style={{paddingLeft: '80px'}}>
                <ModalLoc
                  showed={modalshow}
                  hide={Showed}
                />
                <Row className="m-3">
                  <div class="cont_breadcrumbs_3">
                    <ul>  
                      <li>
                        <a href="#">Locations</a>
                      </li>
                      <li>
                        <a href="#" className="breadcrumb-item active">Rating & Weather</a>
                      </li>
                    </ul>
            
                  </div>
                  <Button  
                  onClick={Showed} variant="success" className="m-5">
                   <FaRegPlusSquare size="2em"/>   Add New
                  </Button>
                </Row>
          
                {loading ?

                <div style={{
                  textAlign: 'center',
                  margin: 'auto',
                  padding: '200px'
                }}>

                  <Spinner animation="grow" variant="light" role="status" />
                  <Spinner animation="grow" variant="light" role="status" />
                  <Spinner animation="grow" variant="light" role="status" />

                </div>
                        
                :
                <CardColumns>
                {    
                locationList.map((locations, index) =>
                 <> 
           
                <Card key={index} style={{flex: 1}}>
                  <Card.Body className="h-100 color-black " onClick={() =>
                    fetchData(locations.name) 
                  }>
                  <OverlayTrigger
                    placement="right-end"
                    delay={{ show: 250, hide: 400 }}
                    overlay={ 
                  
                      <Tooltip id={index}>
                        {
                          weather.isEmpty ?

                          <h1>No Data</h1>

                        :
                        <>
                          <h1>Temp {weather.main.temp} C</h1>
                          <h1>Weather {weather.weather[0].main === "Clouds" ? 
                            <TiWeatherCloudy/>
                            : weather.weather[0].main === "Thunderstorm" ?
                            <TiWeatherStormy/>
                            : weather.weather[0].main === "Drizzle" ?
                            <TiWeatherShower/>
                            : weather.weather[0].main === "Rain" ?
                            <TiWeatherDownpour/>
                            : weather.weather[0].main === "Snow" ?
                            <TiWeatherSnow/>
                            : weather.weather[0].main === "Clear" ?
                            <TiWeatherSunny/>
                            :
                            <p>NO DATA</p>
                          }
                          </h1>
                        </>
                        }  
                    
                      </Tooltip>
                    }
                  >
            
                    <Card.Img variant="top" 
                    src={ 
                          imagesList.length > 0 ? 
                          imagesList[index] 
                          : require('../layout/img/site/no-image-available-icon-6.jpg')} 
                    />

                  </OverlayTrigger>
                  <Card.Title className="text-dark"  >{locations.name}</Card.Title>
                  <Card.Text className="text-dark" >
             
                      This card has supporting text below as a natural lead-in to additional
                        content.{' '}This card has supporting text below as a natural lead-in to additional
                        content.{' '}
                  </Card.Text>
                </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  <Rating 
                    stop={10}
                    step={2}
                    initialRating={locations.rating}
                    emptySymbol={<h3><TiStarOutline/></h3>}
                    fullSymbol={<h3><TiStarFullOutline/></h3>}
                  />
               </small>
              </Card.Footer>
            </Card> 
         
          </>
            )}
        </CardColumns>
            }
            
           
      </div>
    </div>
    <Footer/>
       </>
    )
}

export default Locations

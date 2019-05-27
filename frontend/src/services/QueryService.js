import axios from 'axios';
import { createBrowserHistory } from 'history';
const apiurl = 'http://localhost:8000/api/v1/';
const logurl = 'http://localhost:8000/api-token-auth/'
const retokenurl = 'http://localhost:8000/api-token-refresh/'
const hist = createBrowserHistory();
const item = 'product'
let tkaccess = sessionStorage.getItem('tkaccess')
let tkrefresh = sessionStorage.getItem('tkrefresh')

//console.log(tkaccess, 'token de acceso a mandar')

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const originalRequest = error.config;
  if (!error.response) {
    console.log(error, 'ERROR PRIAMRIO AL PRINCIPIO')
    return Promise.reject(error)
  }
  if (error.response.status === 401 && sessionStorage.getItem('tkrefresh')) {
    // Hace la solicitud de refresco de tokens
    originalRequest._retry = true;
    console.log(error.response.data, 'tipo de  error 401')
    console.log(tkrefresh, tkaccess, 'tokens despues de 401')
    return axios.post(retokenurl, {
        "refresh": sessionStorage.getItem('tkrefresh')
      })
      .then((responseData) => {
        // actualiza la información de OAuth
        //////////////setTokens(responseData.data.access_token, responseData.data.refresh_token);
        console.log(tkrefresh, tkaccess, 'tokens EN SUPUESTO EXITO')
        console.log(responseData.data, 'respuest a consulta de refresh')
        sessionStorage.setItem('tkaccess', responseData.data.access)
        //sessionStorage.tkaccess = responseData.data.access                  
        //originalRequest.headers['Authorization'] = 'Bearer ' + sessionStorage.tkaccess;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('tkaccess');
        originalRequest.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('tkaccess');
        // re-intenta la solicitud original
        return axios(originalRequest);
      }).catch((error) => {
        console.log(tkrefresh, tkaccess, 'tokens CON NUEVO ERROR PARA SER BORRADOS')
        console.log(error.response, 'ERROR DE NUEVO EN PETICION')
        sessionStorage.removeItem("tkaccess")
        sessionStorage.removeItem("tkrefresh")
        sessionStorage.removeItem("user")
        hist.push("/login")


      });
  }
  if (error.response.status === 500) {
    console.log(error, 'ERROR 500 de Serrvidor')
    return Promise.reject(error)
  }
  if (error.response.status === 404) {
    console.log(error, 'ERROR 404 No se encontro')
    return Promise.reject(error)
  }
  if (error.response.status === 400) {
    console.log(error.response.data, 'ERROR 400 Mal request')
    return Promise.reject(error)
  }

  console.log(tkrefresh, tkaccess, 'tokens DEVUELTOS EN ULTIMA PARTE')
  console.log(error, 'ERROR DE PARA DEVOLVER')
  sessionStorage.removeItem("tkaccess")
  sessionStorage.removeItem("tkrefresh")
  sessionStorage.removeItem("user")
  return Promise.reject(error)
  hist.push("/login")

})


export default class QueryService {

  constructor() {}


  static axiosInstance = axios.create({
    timeout: 5000,
    headers: {
      //'Authorization': "JWT_TOKEN",
      'Authorization': `Bearer ${tkaccess}`,
      'Content-Type': 'application/json'
    }
  })


  async getLocations() {
    const url = `${apiurl}location/`;
    return await axios({
      method: 'GET',
      url: url,
      headers: {
        //'Authorization': "JWT_TOKEN",
        'Authorization': `Bearer ${tkaccess}`,
        'Content-Type': 'application/json'
      }
    })

  }





  async getProducts() {
    const url = `${apiurl}${item}/`;
    return await axios({
      method: 'GET',
      url: url,
      headers: {
        //'Authorization': "JWT_TOKEN",
        'Authorization': `Bearer ${tkaccess}`,
        'Content-Type': 'application/json'
      }
    })
  }


  async getProductsByURL(link) {
    const url = `${apiurl}${link}`;
    return await axios
      .get(url)
      .then(response => response.data)
      .catch(err => console.log(err));
  }
  async getProduct(pk) {
    const url = `${apiurl}${item}/${pk}/`;
    return await axios
      .get(url)

  }
  async deleteProduct(product) {
    const url = `${apiurl}${item}/${product}/`;
    return await axios
      .delete(url)
  }
  async createProduct(product) {
    const url = `${apiurl}${item}/`;
    //console.log(product, 'ESTE ES EL DATO QUE sE MANDa A agregarrrr  SERVER')
    return await axios
      .post(url, product)

  }
  async updateProduct(product) {
    const url = `${apiurl}${item}/${product.id}/`;
    //console.log(product, 'ESTE ES EL DATO QUE sE MANDa A modificarrrr  SERVER')
    return await axios
      .put(url, product)

  }

  async login(user, passwd) {
    console.log(user, passwd, 'PASA LOGIN DATOS')
    return await axios({
        method: 'get',
        url: 'http://192.168.0.2:8000/api-token-auth/',
        data: {
          'username': user,
          'password': passwd
        }
      })
      .then(result => {

        console.log(result, 'RESULT LOGIN AXIOS')
        //this.setState({ logged: true})
        sessionStorage.setItem("tkaccess", result.data.access)
        sessionStorage.setItem("tkrefresh", result.data.refresh)
      })
      .catch(err => console.log(err, 'LOOIGn FALLIDO'));

  }

  async getoken(user, token) {
    return await axios
      .post(retokenurl, token)

  }

}
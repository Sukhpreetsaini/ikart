import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import productscreen from './screens/productscreen'
import cartscreen from './screens/cartscreen'
import Loginscreen from './screens/loginscreen'
import Registerscreen from './screens/registerscreen'
import Adminscreen from './screens/adminscreen'
import Addproductscreen from './screens/addproductscreen'
import Editproductscreen from './screens/editproductscreen'
import { CookiesProvider } from "react-cookie";
import Cookies from 'universal-cookie';
import ShippingScreen from './screens/shippingscreen'
import PaymentScreen from './screens/paymentscreen'
import placeorderscreen from './screens/placeorderscreen'
import Orderscreen from './screens/ordersscreen'
import AdminOrderscreen from './screens/adminorderscreen'

const App = () => {
  const cookies = new Cookies();
  return (
    <CookiesProvider> 
    <Router>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Route path='/' component = {HomeScreen} exact></Route>
          <Route path='/product/:id' component = {productscreen}></Route>
          <Route path='/cart/:id?' component = {cartscreen}></Route>
          <Route path='/login' component = {Loginscreen}></Route>
          <Route path='/register' component = {Registerscreen}></Route>
          <Route path='/order' component = {cookies.get("userloggedin") ? (Orderscreen
            ):(
              Loginscreen
          )}></Route>
          <Route path='/admin' component = {cookies.get("admin") ? (Adminscreen
            ):(
              Loginscreen
          )}></Route>
          <Route path='/add' component = {cookies.get("admin") ? (Addproductscreen
            ):(
              Loginscreen
          )}></Route>
          <Route path='/edit/:id' component = {cookies.get("admin") ? (Editproductscreen
            ):(
              Loginscreen
          )}></Route>
          <Route path='/adminorder' component = {cookies.get("admin") ? (AdminOrderscreen
            ):(
              Loginscreen
          )}></Route>
          <Route path='/shipping' component = {cookies.get("userloggedin") ? (ShippingScreen
            ):(
              Loginscreen
          )}></Route>
          <Route path='/payment' component = {cookies.get("userloggedin") ? (PaymentScreen
            ):(
              Loginscreen
          )}></Route>
          <Route path='/placeorder' component = {cookies.get("userloggedin") ? (placeorderscreen
            ):(
              Loginscreen
          )}></Route>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
    </CookiesProvider>
  )
}

export default App

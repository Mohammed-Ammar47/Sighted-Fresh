import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Store from './pages/Store'
import Deals from './pages/Deals'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import Product from './pages/Product'
import Cart from './pages/Cart'

function App() {
  return (
    <>
    <Router>
    <Header />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/store' element={<Store />} />
    <Route path='/deals' element={<Deals />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/register' element={<Register />} />
    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/:productId' element={<Product />} />
    </Routes>
    </Router>
    </>
  )
}

export default App

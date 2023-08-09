import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Store from './pages/Store'
import Deals from './pages/Deals'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Product from './pages/Product'
import Cart from './pages/Cart'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import { ToastContainer } from "react-toastify";


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
    <Route path='/profile' element={<PrivateRoute /> } >
      <Route path='/profile' element={<Profile />} />
    </Route>
    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='/:productId' element={<Product />} />
    </Routes>
    </Router>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';

export default function SignIn() {
  const [formData , setFormData] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate()
  function onChange(e) {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  async function onSubmit(e) {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth , formData.email, formData.password)
      const user = userCredential.user
      if (user) {
        console.log('logged in');
      }
      navigate('/')
    } catch (error) {
      console.log(error);
    }    
  }
  return (
    <>
    <main className='  flex justify-center items-center   '>
    <div className='w-full flex flex-col  justify-center items-center  sm:mx-auto sm:w-full sm:max-w-sm mx-5 my-5 p-5 lg:mx-auto shadow-lg max-w-sm lg:max-w-3xl bg-[#F1F1F1]  mt-14 px-3 rounded-xl sm:rounded-3xl '>
    <h2 className='flex flex-col font-semibold text-2xl my-1 mb-2'>Sign In</h2>
    <form onSubmit={onSubmit} className='w-full mx-auto'>
    <div className=' flex flex-col  justify-center items-center'>
    <div className='flex flex-col w-full'>
    <label className=' text-base font-semibold  mb-1' >Email</label>
    <input id='email' type='email' onChange={onChange} value={formData.email} className=' px-3 mb-4 py-2 text-base md:text-xl lg:text-2xl text-slate-900  rounded-md bg-white  border-0 outline-none transition ease-in-out shadow-sm  ring-inset focus:ring-2 focus:ring-inset focus:ring-red-600   '/>
    </div>
    <div className='flex flex-col w-full'>
    <label className='flex text-base font-semibold justify-between mb-1' >
    <p>Password</p>
    <p><Link to={'/forgot-password'} className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out'>Forgot Password?</Link></p>
    </label>
    <input id='password' type='password' onChange={onChange} value={formData.password} className=' px-3 mb-4 py-2 text-base md:text-xl lg:text-2xl text-slate-900  rounded-md bg-white  border-0 outline-none transition ease-in-out shadow-sm  ring-inset focus:ring-2 focus:ring-inset focus:ring-red-600   '/>
    </div>
    </div>
    <button className='w-full justify-center items-center  flex-col bg-red-600 text-white px-7 py-3 text-sm md:text-xl font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800'>
      sign in
    </button>
    <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
       <p className="text-center text-sm font-semibold mx-4">OR</p>
    </div>
    <OAuth />
    </form>
    <p className='mt-5 mb-3 '>Don't have an account?<Link  to={"/register"} className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out'>Register</Link></p>
    </div>
    </main>
</>
  )
}

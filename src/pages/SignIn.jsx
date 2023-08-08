import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillFacebook , AiFillGoogleCircle,AiFillInstagram} from "react-icons/ai";

export default function SignIn() {
  return (
    <>
    <main className='  flex justify-center items-center   '>
    <div className='w-full flex flex-col  justify-center items-center  sm:mx-auto sm:w-full sm:max-w-sm mx-5 my-5 p-5 lg:mx-auto shadow-lg max-w-sm lg:max-w-3xl bg-[#F1F1F1]  mt-14 px-3 rounded-xl sm:rounded-3xl '>
    <h2 className='flex flex-col font-semibold text-2xl my-1 mb-2'>Sign In</h2>
    <form className='w-full mx-auto'>
    <div className=' flex flex-col  justify-center items-center'>
    <div className='flex flex-col w-full'>
    <label className=' text-base font-semibold  mb-1' >Email</label>
    <input className=' px-3 mb-4 py-2 text-base md:text-xl lg:text-2xl text-slate-900  rounded-md bg-white  border-0 outline-none transition ease-in-out shadow-sm  ring-inset focus:ring-2 focus:ring-inset focus:ring-red-600   '/>
    </div>
    <div className='flex flex-col w-full'>
    <label className='flex text-base font-semibold justify-between mb-1' >
    <p>Password</p>
    <p><Link to={'/forgot-password'} className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out'>Forgot Password?</Link></p>
    </label>
    <input className=' px-3 mb-4 py-2 text-base md:text-xl lg:text-2xl text-slate-900  rounded-md bg-white  border-0 outline-none transition ease-in-out shadow-sm  ring-inset focus:ring-2 focus:ring-inset focus:ring-red-600   '/>
    </div>
    </div>
    <button className='w-full justify-center items-center  flex-col bg-red-600 text-white px-7 py-3 text-sm md:text-xl font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800'>
      sign in
    </button>
    <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
       <p className="text-center text-sm font-semibold mx-4">OR</p>
    </div>
    <div className='w-full flex sm:flex-row justify-between items-center md:space-x-5   '>
    <button className='w-full  hidden md:flex justify-center items-center  flex-col bg-red-600 text-white px-5 lg:px-7 py-3 text-base lg:text-xl font-medium  rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800'>
      Google
    </button>
    <button className='w-full  hidden md:flex justify-center items-center  flex-col bg-red-600 text-white px-5 lg:px-7 py-3 text-base lg:text-xl font-medium  rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800'>
      Instagram
    </button>
    <button className='w-full  hidden md:flex justify-center items-center  flex-col bg-red-600 text-white px-5 lg:px-7 py-3 text-base lg:text-xl font-medium  rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800'>
      Facebook
    </button>
    <AiFillGoogleCircle className='w-full md:hidden text-4xl mx-6 text-red-600' />
    <AiFillInstagram className='w-full md:hidden text-4xl mx-6 text-red-600' />
    <AiFillFacebook className='w-full md:hidden text-4xl mx-6 text-red-600' />
    </div>
    </form>
    <p className='mt-5 mb-3 '>Don't have an account?<Link  to={"/register"} className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out'>Register</Link></p>
    </div>
    </main>
</>
  )
}

import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'

export default function ForgotPassword() {
  const [formData , setFormData] = useState({
    email:''
  })
  function onChange(e) {
    setFormData(e.target.value)
  }
  async function onSubmit(e) {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, formData.email)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <main className='  flex justify-center items-center   '>
    <div className='w-full flex flex-col  justify-center items-center  sm:mx-auto sm:w-full sm:max-w-sm mx-5 my-5 p-5 lg:mx-auto shadow-lg max-w-sm lg:max-w-3xl bg-[#F1F1F1]  mt-14 px-3 rounded-xl sm:rounded-3xl '>
    <h2 className='flex flex-col font-semibold text-2xl my-1 mb-2'>Forgot Password</h2>
    <p className='flex flex-col font-medium text-lg my-1 mb-2'>A link to reset your password will be sent to the email address</p>
    <form onSubmit={onSubmit} className='w-full mx-auto'>
    <div className=' flex flex-col  justify-center items-center'>
    <div className='flex flex-col w-full'>
    <label className=' text-base font-semibold  mb-1' >Email</label>
    <input onChange={onChange} id='email' type='email' value={formData.email} className=' px-3 mb-4 py-2 text-base md:text-xl lg:text-2xl text-slate-900  rounded-md bg-white  border-0 outline-none transition ease-in-out shadow-sm  ring-inset focus:ring-2 focus:ring-inset focus:ring-red-600   '/>
    </div>
    </div>
    <button type='submit' className='w-full justify-center items-center  flex-col bg-red-600 text-white px-7 py-3 text-sm md:text-xl font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800'>
      Send
    </button>
    </form>
    </div>
    </main>
</>
  )
}

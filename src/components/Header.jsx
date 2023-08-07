import React, { useState } from 'react'
import { GrClose , GrMenu} from "react-icons/gr";
import { PiUserCirclePlusBold , PiShoppingCartBold} from "react-icons/pi";

export default function Header() {
  const [open , setOpen] = useState(false)
  return (
    <header className=' flex justify-between items-center px-2 bg-[#F1F1F1]'>
    <img className='flex  h-7 md:h-10' src='https://api.logo.com/api/v2/images?logo=logo_31050228-a10f-4014-9f77-8779b7a20f5f&format=webp&margins=0&quality=60&width=500&background=transparent&u=1691277569' /> 
    <div onClick={() =>{setOpen(!open)}} className="text-2xl absolute right-2.5 top-3 cursor-pointer md:hidden  rounded-md hover:bg-gray-100 ">
          {open ? <GrClose /> : <GrMenu />}
        </div>
        <div className={` right-0 bg-[#F1F1F1] p-3 absolute sm:static sm:space-x-3 md:z-auto z-[5] w-full md:w-auto md:pl-0  transition-all duration-300 ease-in-out ${open ? 'top-9  ':'top-[-300px]'}` }>

    <ul className='flex flex-col sm:flex-row' >
      <li className='  items-center  h-10 rounded-full text-base md:text-lg font-semibold mx-5 my-2 pt-1.5 sm:pt-1 px-4 focus:outline-none focus:ring-2 bg-white text-[#E70000] hover:bg-[#E70000] hover:text-[#F1F1F1] focus:ring-white cursor-pointer'>Home</li>
      <li className='  items-center  h-10 rounded-full text-base md:text-lg font-semibold mx-5 my-2 pt-1.5 sm:pt-1 px-4 focus:outline-none focus:ring-2 bg-white text-[#E70000] hover:bg-[#E70000] hover:text-[#F1F1F1] focus:ring-white cursor-pointer'>Store</li>
      <li className=' items-center  h-10 rounded-full text-base md:text-lg font-semibold mx-5 my-2 pt-1.5 sm:pt-1 px-4 focus:outline-none focus:ring-2 bg-white text-[#E70000] hover:bg-[#E70000] hover:text-[#F1F1F1] focus:ring-white cursor-pointer'>Deals</li>
    </ul>
    </div>
    <ul className='flex px-3 mr-5 space-x-2  sm:space-x-5' >
      <li className=' flex items-center h-8 sm:h-10 rounded-full text-2xl md:text-lg font-semibold whitespace-nowrap px-1 sm:pt-0 sm:px-4 focus:outline-none focus:ring-2 bg-white text-[#E70000] hover:bg-[#E70000] hover:text-[#F1F1F1] focus:ring-white cursor-pointer'><p className='hidden sm:flex' >Cart </p> <PiShoppingCartBold  className='sm:hidden px-0'/>  </li>
      <li className=' flex items-center h-8 sm:h-10 rounded-full text-2xl md:text-lg font-semibold whitespace-nowrap px-1 sm:pt-0 sm:px-4 focus:outline-none focus:ring-2 bg-white text-[#E70000] hover:bg-[#E70000] hover:text-[#F1F1F1] focus:ring-white cursor-pointer'><p className='hidden sm:flex' >Register </p><PiUserCirclePlusBold  className='sm:hidden px-0' /></li>
    </ul>
    
    </header>
  )
}

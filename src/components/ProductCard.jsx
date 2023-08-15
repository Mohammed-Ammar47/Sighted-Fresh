import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({product , id}) {
  const navigate = useNavigate()
  return (
    <>
    <li  >
    <div className='bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow mx-7 mb-3 md:mx-5   duration-200 ease-in-out ' >
    <img onClick={() =>{navigate(`/store/category/${product.type}/${id}`) }} className='max-h-64 rounded-t-lg  hover:border-x-2 hover:border-t-2 hover:border-red-600' src={product.image} />
    <div className='w-full justify-center items-center  border-2 border-red-600 rounded-b-lg font-semibold'>
        <p className='px-3 py-1 truncate'>{product.name}</p>
        <p className='px-3 py-1'>{product.colors.length} </p>
        <p className='px-3 py-1'>${product.regularPrice}</p>
    <button className='w-full justify-center items-center  flex-col bg-red-600 text-white px-7 py-2 text-sm md:text-lg font-medium uppercase  shadow-md hover:bg-red-700  transition duration-200 ease-in-out active:bg-red-800'>Add to Cart</button>
    </div>
    </div>
    </li>
    </>
  )
}

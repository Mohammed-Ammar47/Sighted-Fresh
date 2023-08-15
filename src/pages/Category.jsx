import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../Firebase';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function Category() {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true);
    const param = useParams()

    useEffect(() => {
        try {
            async function fetchProducts() {
                const docRef = collection(db,'products')
                const q = query(docRef, where('type' , '==' , param.categoryName) , orderBy('timestamp' , 'desc'))
                const querySnapshot = await getDocs(q)
                const queriedProduct = []
                querySnapshot.forEach((doc) => {
                    return queriedProduct.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setProducts(queriedProduct)
                setLoading(false)
            }
            fetchProducts()
        } catch (error) {
            console.log(error);
        }
    }, [param.categoryName]);
    if (loading) {
        return <Spinner />
    }
  return (
    <>
        <div>
        <div className=' md:mx-12'>
<div className='flex flex-row justify-between text-xl font-semibold pt-4'> 
<nav >
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <li >
                <div className="flex items-center">
                  <Link to={"/store"} className="mr-2 text-sm font-medium text-gray-900 hover:text-red-800 hover:underline"><p>Store</p></Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            <li className="text-sm">
              <Link  className="font-medium text-gray-900 hover:text-red-800 hover:underline">
                <p>{param.categoryName}</p>
              </Link>
            </li>
          </ol>
        </nav>
</div> 
<ul className='sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mt-5 mb-5 '>
   {products.map((product) =>(
  <ProductCard key={product.id} id={product.id} product={product.data} />
   ))}
</ul>
</div>
        </div>
    </>
  )
}

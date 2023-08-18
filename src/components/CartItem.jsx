import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import Spinner from "./Spinner";
import { CiSquareRemove } from "react-icons/ci";

export default function CartItem({ id, item, onDelete }) {
  const [cartProduct, setCartProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const docRef = doc(db, "products", item.productId);
      const docSnap = await getDoc(docRef);
      const product = [docSnap.data()];
      setCartProduct(product[0]);
      setLoading(false);
    }
    fetchProducts();
  }, [item]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <article className="flex flex-col md:flex-row md:items-start space-x-6 p-2 items-center">
        <img
          src={item.productImage}
          alt=""
          className="flex-none rounded-md md:h-40 w-full md:w-28 bg-slate-100 object-cover"
        />

        <div className="min-w-0 flex flex-col relative w-full">
          <h2 className="font-semibold text-lg text-slate-900 truncate pr-4 md:pr-20">
            {cartProduct.name}
          </h2>
          <dl className=" flex space-x-2 md:space-x-0 md:flex-col flex-wrap text-lg leading-6 font-medium ">
            {/* Price */}
            <div className="flex  mt-2 font-semibold">
              <dt className="sr-only">price</dt>
              <dd className="px-2 ring-1 ring-slate-500 rounded ">
                ${cartProduct.regularPrice}
              </dd>
            </div>
            {/* Color */}
            <div className="flex  mt-2 font-semibold">
              <dt className="sr-only">color</dt>
              <dd className="flex items-center px-2 ring-1 ring-slate-500 rounded ">
                {item.color}
              </dd>
            </div>
            {/* Size */}
            <div className="flex  mt-2 font-semibold">
              <dt className="sr-only">size</dt>
              <dd className="flex items-center px-2 ring-1 uppercase ring-slate-500 rounded ">
                {item.size}
              </dd>
            </div>
            {/* Quantity */}
            <div className="flex  mt-2 font-semibold">
              <dt className="sr-only">qty</dt>
              <dd className="flex items-center px-2 uppercase ring-1 ring-slate-500 rounded ">
                {item.quantity}
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-row-reverse  md:justify-items-end md:flex-col mt-2 md:mt-0">
          <button
            onClick={() => onDelete(item.id)}
            className="px-1.5 text-5xl text-slate-900  font-semibold hover:text-red-600 "
          >
            <CiSquareRemove />
          </button>
          <p className="px-1.5 text-3xl  my-2.5 font-semibold rounded w-auto">
            ${cartProduct.regularPrice * item.quantity}
          </p>
        </div>
      </article>
    </>
  );
}

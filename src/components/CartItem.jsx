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
      <article className="flex flex-col sm:flex-row md:items-start space-x-3 p-4 items-center">
        <img
          src={item.productImage}
          alt=""
          className="flex-none rounded-md md:h-40 w-full md:w-28 bg-slate-100 object-cover shadow-xl"
        />

        <div className=" flex flex-col relative w-full text-lg text-custom-black">
          <h2 className="font-semibold  truncate pr-4 md:pr-20">
            {cartProduct.name}
          </h2>
          <dl className="my-1 flex space-x-2 md:space-x-0 md:flex-col flex-wrap leading-6 font-medium">
            {/* Price */}
            <div className="flex  my-1 font-normal">
              <dt className="sr-only">price</dt>
              <div className="flex flex-row">
                {cartProduct.discountRate === 0 ? (
                  <dd className="px-2 ring-1 ring-slate-500 rounded ">
                    ${cartProduct.regularPrice}
                  </dd>
                ) : (
                  <>
                    <dd className="mr-1 px-1 ring-1 ring-slate-500 rounded line-through">
                      ${cartProduct.regularPrice}
                    </dd>
                    <dd className="ml-1 px-1 ring-1 ring-slate-500 rounded ">
                      {" "}
                      ${""}
                      {Math.floor(
                        (cartProduct.regularPrice *
                          (1 - cartProduct.discountRate) *
                          100) /
                          100
                      )}
                    </dd>
                  </>
                )}
              </div>
            </div>
            {/* Color */}
            <div className="flex  my-1 font-semibold">
              <dt className="sr-only">color</dt>
              <dd className="flex items-center px-2 ring-1 ring-slate-500 rounded ">
                {item.color}
              </dd>
            </div>
            {/* Size */}
            <div className="flex  my-1 font-semibold">
              <dt className="sr-only">size</dt>
              <dd className="flex items-center px-2 ring-1 uppercase ring-slate-500 rounded ">
                {item.size}
              </dd>
            </div>
            {/* Quantity */}
            <div className="flex  my-1 font-semibold">
              <dt className="sr-only">qty</dt>
              <dd className="flex items-center px-2 uppercase ring-1 ring-slate-500 rounded ">
                {item.quantity}
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-row-reverse  md:justify-items-end md:flex-col mt-2 md:mt-0 font-family-Roboto">
          <button
            onClick={() => onDelete(item.id)}
            className="px-2 text-4xl text-custom-black  font-semibold hover:text-red-600 "
          >
            <CiSquareRemove />
          </button>

          <p className="px-1 text-2xl  my-2 font-medium rounded w-auto">
            $
            {Math.floor(
              (cartProduct.regularPrice *
                (1 - cartProduct.discountRate) *
                100) /
                100
            ) * item.quantity}
          </p>
        </div>
      </article>
    </>
  );
}

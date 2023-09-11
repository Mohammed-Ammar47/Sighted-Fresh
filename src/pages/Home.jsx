import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import LogoCarousel from "../components/LogoCarousel";
import SalesCarousel from "../components/SalesCarousel";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("timestamp", "desc"), limit(4));
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
          return products.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setLatestProducts(products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      {/* Section 1 */}
      <div
        className={`bg-[url(https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/david-lezcano-NfZiOJzZgcg-unsplash.jpg?alt=media&token=1b0ef250-db26-4c06-8a6d-451143989ce5)] flex items-center bg-cover  w-full h-screen px-32 ring-2 ring-red-600`}
      >
        <div
          className={`content-center text-white  text-center md:text-left lg:text-justify`}
        >
          <p className="text-4xl font-bold pb-4 font-family-Montserrat">
            Don't stress about the dress, <br /> We'll dress you to impress.
          </p>
          <p className="text-xl leading-10 font-medium pb-4 font-family-Convergence">
            Shop and find the perfect fit for you
          </p>
          <div className="flex flex-row space-x-4">
            <button
              onClick={() => {
                navigate("/store");
              }}
              className=" justify-center items-center rounded-full text-base lg:text-lg font-medium font-family-Roboto px-2.5 bg-white text-[#E70000] hover:bg-[#E70000] hover:text-[#F1F1F1] cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <div className="w-auto mx-32 my-24">
        <div className=" flex flex-col justify-center  p-8 rounded-2xl bg-[#F1F1F1]">
          <h2 className="text-center flex flex-col font-semibold text-lg sm:text-4xl font-family-Montserrat">
            Our Products
          </h2>

          <LogoCarousel />
        </div>
      </div>

      <div className="mx-32 my-24 bg-[#F1F1F1] rounded-2xl flex p-8">
        <div className="flex flex-col basis-2/5 ">
          <div>
            <p className="text-[28px] font-semibold font-family-Montserrat">
              Take this opportunity,
              <br />
              Check our latest special offers and discounts
            </p>
            <button
              onClick={() => {
                navigate("/deals");
              }}
              className="my-4 w-auto justify-center items-center rounded-full text-base lg:text-lg font-medium font-family-Roboto px-2.5 bg-white text-[#E70000] hover:bg-[#E70000] hover:text-[#F1F1F1] cursor-pointer"
            >
              Go to Deals
            </button>
          </div>
        </div>
        <SalesCarousel />
      </div>

      {/* Latest products */}

      <div className="sm:mx-32">
        <div className="flex flex-row justify-between text-[28px] font-semibold font-family-Montserrat border-b-2 pb-2 border-[#E70000]">
          <p className="text-custom-black">Latest products</p>
          <p className="text-red-600 ">
            <Link
              to={"/store"}
              className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
            >
              Show more
            </Link>
          </p>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 space-x-4 my-4">
          {latestProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              product={product.data}
            />
          ))}
        </ul>
      </div>

      {/* Trending products */}
    </>
  );
}

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
import { Link } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("timestamp", "desc"), limit(6));
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
      <div className="bg-[#D8D9DA] flex  flex-col md:flex-row  w-full h-full mb-5">
        <div className="md:basis-2/5 text-xl lg:text-3xl text-white font-bold justify-center text-center md:text-left lg:text-justify pt-10 px-7 xl:pt-28 lg:pt-20 lg:pl-16 ">
          <p>
            Don't stress about the dress, <br /> We'll dress you to impress.
          </p>
          <p className="text-base font-normal pb-3">
            Shop and find the perfect fit for you
          </p>
          <div className="flex flex-row lg:pr-7">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-full justify-center items-center  h-10 rounded-full text-base lg:text-lg font-semibold ml-5  mr-2 lg:ml-0 sm:pt-1 px-6 focus:outline-none focus:ring-2 bg-white text-[#E70000] hover:bg-[#E70000] hover:text-[#F1F1F1] focus:ring-white cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/store");
              }}
              className="w-full justify-center items-center  h-10 rounded-full text-base lg:text-lg font-semibold mr-5 ml-2 lg:mr-0  sm:pt-1 px-6 focus:outline-none focus:ring-2 bg-white text-[#E70000] hover:bg-[#E70000] hover:text-[#F1F1F1] focus:ring-white cursor-pointer"
            >
              Store
            </button>
          </div>
        </div>
        <div className="flex flex-row mt-3  md:basis-3/5 ">
          <img
            className="w-full  py-2"
            src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/SF1.png?alt=media&token=571d127e-f703-4d85-952b-8959642ec802"
          />
        </div>
      </div>
      <h2 className="text-center flex flex-col font-semibold text-lg lg:text-3xl">
        Our products
      </h2>
      <div className="px-2 py-6 my-4 mx-7 rounded-2xl bg-[#F1F1F1]">
        <LogoCarousel />
      </div>
      <div className="my-5">
        <SalesCarousel />
      </div>

      {/* Latest products */}

      <div className="md:mx-12">
        <div className="flex flex-row justify-between text-xl font-semibold">
          <p>Latest products</p>
          <p className="text-red-600 ">
            <Link
              to={"/store"}
              className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
            >
              Show more
            </Link>
          </p>
        </div>
        <ul className="sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  mt-5 mb-5 ">
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

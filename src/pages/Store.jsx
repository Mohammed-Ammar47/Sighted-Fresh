import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import Spinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AiOutlineSearch } from "react-icons/ai";

export default function Store() {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(null);
  const [formData, setFormData] = useState({
    searchInput: "",
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
          return products.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setAllProducts(products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  function onChange(e) {
    setFormData({ [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const docRef = collection(db, "products");
      const q = query(docRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        return products.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      const searchedProducts = products.filter((product) =>
        product.data.name
          .toLowerCase()
          .includes(formData.searchInput.toLowerCase())
      );
      setAllProducts(searchedProducts);

      console.log(searchedProducts);
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex justify-center items-center p-5 bg-white rounded-b-xl">
          <div className="relative w-96">
            <input
              name="searchInput"
              type="search"
              onChange={onChange}
              className="block p-2.5 w-full z-20 text-base font-medium text-gray-900 bg-gray-50 rounded-lg   border border-gray-300 focus:ring-1 focus:ring-red-700 focus:border-red-700 focus:outline-none "
              placeholder="Search..."
              value={formData.searchInput}
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-red-700 rounded-r-lg border border-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-600 "
            >
              <AiOutlineSearch className="text-xl" />
            </button>
          </div>
        </div>
      </form>
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
        <ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mt-5 mb-5 ">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              product={product.data}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

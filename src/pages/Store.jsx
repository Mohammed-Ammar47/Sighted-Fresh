import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState, Fragment } from "react";
import { db } from "../Firebase";
import Spinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { GrMenu } from "react-icons/gr";

// import Filter from "../components/Filter";

export default function Store() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(null);
  const [formData, setFormData] = useState({
    searchInput: "",
  });
  const [filter, setFilter] = useState([]);
  const categories = [
    { displayName: "Shirts", useName: "shirts" },
    { displayName: "Polo Shirts", useName: "polo-shirts" },
    { displayName: "T Shirts", useName: "t-shirts" },
    { displayName: "Pants", useName: "pants" },
    { displayName: "Shoes", useName: "shoes" },
  ];
  useEffect(() => {
    async function fetchProducts() {
      console.log(filter);

      try {
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          filter.length > 0 && where("type", "in", filter),
          orderBy("timestamp", "desc")
        );
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
  }, [filter]);

  function onChange(e) {
    setFormData({ [e.target.name]: e.target.value });
  }

  function filterProducts(e) {
    if (e.target.checked) {
      filter.push(e.target.value);
      setFilter((prevFiltered) => [...prevFiltered]);
    } else {
      const index = filter.indexOf(e.target.value);
      filter.splice(index, 1);
      setFilter((prevFiltered) => [...prevFiltered]);
    }
    console.log(filter);
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
      <aside
        class={`absolute sm:relative top-32 sm:top-0 left-0 z-40 w-60 h-screen transition-transform duration-300 ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        }  sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <button
          type="button"
          className="-right-11 absolute items-center p-2 mt-2 ml-3 text-sm bg-gray-50 -z-10 border-gray-50 text-gray-500 rounded-tr-lg rounded-br-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open sidebar</span>
          <AdjustmentsVerticalIcon
            className="w-8 h-8"
            onClick={() => {
              setOpenSidebar(!openSidebar);
            }}
          />
        </button>
        <div className="h-full px-3 py-4 overflow-y-auto bg-white ">
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 ">Category</h3>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-400 divide-y px-2 divide-slate-600 rounded-lg ">
              {categories.map((category, index) => (
                <li key={index} class="w-full   ">
                  <div class="flex items-center pl-1">
                    <input
                      id="check"
                      onChange={filterProducts}
                      type="checkbox"
                      value={category.useName}
                      name="category"
                      class="w-5 h-5 accent-inherit bg-current text-red-600 checked:bg-red-600 checked:text-red-600 border-gray-300 rounded focus:ring-red-50 focus:ring-2 "
                    />
                    <label class="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">
                      {category.displayName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>{" "}
          </div>
        </div>
      </aside>
      <div className="p-1 md:ml-4">
        <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg">
          <div className="">
            <ul className="grid grid-cols-2 md:grid-cols-3  ">
              {allProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  product={product.data}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

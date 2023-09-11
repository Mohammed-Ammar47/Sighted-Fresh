import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState, Fragment } from "react";
import { db } from "../Firebase";
import Spinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";

export default function Deals() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [inputs, setInputs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(null);
  const [filter, setFilter] = useState([]);
  const [sortBy, setSortBy] = useState(0);
  console.log(sortBy);
  const categories = [
    { displayName: "Shirts", useName: "shirts" },
    { displayName: "Polo Shirts", useName: "polo-shirts" },
    { displayName: "T Shirts", useName: "t-shirts" },
    { displayName: "Pants", useName: "pants" },
    { displayName: "Shoes", useName: "shoes" },
  ];
  const priceRanges = [
    { rangeId: 0, price: { min: 0, max: 10 } },
    { rangeId: 1, price: { min: 10, max: 20 } },
    { rangeId: 2, price: { min: 20, max: 30 } },
    { rangeId: 3, price: { min: 30, max: 40 } },
  ];
  const sortByOptions = [
    {
      optionId: 0,
      displayName: "Name (Oldest-Newest)",
      optionName: "timestamp",
    },
    {
      optionId: 1,
      displayName: "Name (Newest-Oldest)",
      optionName: "timestamp",
    },
    { optionId: 2, displayName: "Name (A-Z)", optionName: "name" },
    { optionId: 3, displayName: "Name (Z-A)", optionName: "name" },
    {
      optionId: 4,
      displayName: "Price (Low-High)",
      optionName: "regularPrice",
    },
    {
      optionId: 5,
      displayName: "Price (High-Low)",
      optionName: "regularPrice",
    },
  ];
  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          filter.length > 0 && where("type", "in", filter),
          orderBy(
            sortByOptions[sortBy].optionName,
            sortBy % 2 === 0 ? "asc" : "desc"
          )
        );
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
          return products.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        const discountedProducts = products.filter(
          (product) => !(product.data.discountRate === 0)
        );
        const filteredProducts = discountedProducts.filter(
          (product) =>
            !(
              product.data.regularPrice <=
                (inputs === null ? 0 : priceRanges[inputs].price.min) ||
              product.data.regularPrice >
                (inputs === null ? 50 : priceRanges[inputs].price.max)
            )
        );
        console.log(filteredProducts);
        setAllProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [filter, inputs, sortBy]);

  function filterProducts(e) {
    if (e.target.checked) {
      filter.push(e.target.value);
      setFilter((prevFiltered) => [...prevFiltered]);
    } else {
      const index = filter.indexOf(e.target.value);
      filter.splice(index, 1);
      setFilter((prevFiltered) => [...prevFiltered]);
    }
  }
  function filterPrice(e) {
    if (e.target.checked) {
      setInputs(e.target.value);
    } else {
      setInputs(null);
    }
  }
  function sortByFilter(e) {
    if (e.target.checked) {
      setSortBy(e.target.value);
    }
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex flex-row ">
        <aside
          class={`  md:relative top-32 sm:top-0 left-0 z-40 w-60 absolute transition-transform duration-300 ${
            openSidebar ? "translate-x-0" : "-translate-x-full"
          }  md:translate-x-0`}
          aria-label="Sidebar"
        >
          <button
            type="button"
            className="-right-11 absolute items-center p-2 mt-2 ml-3 text-sm bg-white ring-2 ring-red-600 -z-10 border-gray-50 text-gray-500 rounded-tr-lg rounded-br-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <span className="sr-only">Open sidebar</span>
            <AdjustmentsVerticalIcon
              className="w-8 h-8"
              onClick={() => {
                setOpenSidebar(!openSidebar);
              }}
            />
          </button>
          <div className=" px-3  overflow-y-auto bg-gray-50 border-2 border-r-[#E70000] border-b-[#E70000] rounded-br-lg  ">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-custom-black pt-4 ">
                Category
              </h3>
              <ul className="w-full md:w-48 text-base font-family-Roboto font-normal text-custom-black bg-white border border-gray-400 divide-y rounded-br-lg px-2 divide-slate-600 rounded-lg ">
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
                      <label class="w-full py-2 ml-2 ">
                        {category.displayName}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>{" "}
            </div>
            <div className="py-2">
              <h3 className="mb-2 text-lg font-semibold text-custom-black  ">
                Price
              </h3>
              <ul className="w-full md:w-48 text-base font-family-Roboto font-normal text-custom-black bg-white border border-gray-400 divide-y px-2 divide-slate-600 rounded-lg ">
                {priceRanges.map((priceRange, index) => (
                  <li key={index} class="w-full   ">
                    <div class="flex items-center pl-1">
                      <input
                        id="check"
                        onChange={filterPrice}
                        type="checkbox"
                        value={priceRange.rangeId}
                        name="priceRange"
                        class="w-5 h-5 accent-inherit bg-current text-red-600 checked:bg-red-600 checked:text-red-600 border-gray-300 rounded focus:ring-red-50 focus:ring-2 "
                      />
                      <label class="w-full py-3 ml-2  ">
                        ${priceRange.price.min} to ${priceRange.price.max}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pb-4">
              <h3 className=" text-lg font-semibold text-custom-black">
                Sort by
              </h3>
              <ul className="w-full md:w-48 text-base font-family-Roboto font-normal text-custom-black bg-white border border-gray-400 divide-y px-2 divide-slate-600 rounded-lg ">
                {sortByOptions.map((option, index) => (
                  <li key={index} class="w-full   ">
                    <div class="flex items-center pl-1">
                      <input
                        id="check"
                        onChange={sortByFilter}
                        type="radio"
                        value={option.optionId}
                        name="sortByOption"
                        // checked={option.optionId === sortBy}
                        className="w-5 h-5 accent-inherit bg-current text-red-600 checked:bg-red-600 checked:text-red-600 border-gray-300 rounded focus:ring-red-50 focus:ring-2 "
                      />
                      <label class="w-full py-3 ml-2 ">
                        {option.displayName}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <div className="sm:flex sm:flex-col mx-2 my-4 text-custom-black">
          <div>
            <p className="text-[28px]  font-family-Montserrat font-semibold text-start mx-2  ">
              Discounted products
            </p>
            <p className="text-lg font-normal text-custom-black font-family-Roboto text-start mx-2">
              {allProducts.length} items
            </p>
          </div>
          <div>
            <div className=" border-gray-200 ">
              <div>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
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
        </div>
      </div>
      ;
    </>
  );
}

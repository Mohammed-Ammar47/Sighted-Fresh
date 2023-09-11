import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, id }) {
  const navigate = useNavigate();
  return (
    <>
      <li>
        <div className="bg-white flex flex-col relative justify-between items-center shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow  duration-200 ease-in-out mx-2 my-2 ">
          {product.discountRate > 0 && (
            <div class="text-base font-family-Roboto  absolute top-3 -left-9 -rotate-45 font-bold  py-0.5 px-12 uppercase rounded text-white bg-[#CE1212]  last:mr-0 mr-1">
              -{product.discountRate * 100} %
            </div>
          )}
          <div
            onClick={() => {
              navigate(`/store/category/${product.type}/${id}`);
            }}
            className="h-48 md:h-64 rounded-t-lg  hover:border-x-2 hover:border-t-2 hover:border-red-600 md:w-full "
          >
            <img
              className=" rounded-t-md inset-0 w-full h-full object-cover md:object-cover"
              src={product.image[0]}
            />
          </div>
          <div className="w-full justify-center items-center text-custom-black border-2 border-red-600 rounded-b-lg text-lg">
            <p className="px-3 font-semibold font-family-Convergence pb-2 pt-3   truncate  ">
              {product.name}
            </p>
            <p className="px-3 font-normal font-family-Roboto">
              Available in{" "}
              {product.colors.length > 1
                ? `${product.colors.length} colors`
                : "one color"}{" "}
            </p>
            <div className="flex flex-row pb-3">
              {product.discountRate === 0 ? (
                <p className="px-3 font-family-Roboto font-medium">
                  ${product.regularPrice}
                </p>
              ) : (
                <>
                  <p className="px-3 line-through font-family-Roboto font-medium">
                    ${product.regularPrice}
                  </p>
                  <p className=" font-family-Roboto font-medium">
                    $
                    {Math.floor(
                      (product.regularPrice *
                        (1 - product.discountRate) *
                        100) /
                        100
                    )}
                  </p>
                </>
              )}
            </div>

            {/* <button className="w-full justify-center items-center  flex-col bg-red-600 text-white px-7 py-2 text-sm md:text-lg font-medium uppercase  shadow-md hover:bg-red-700  transition duration-200 ease-in-out active:bg-red-800">
              Add to Cart
            </button> */}
          </div>
        </div>
      </li>
    </>
  );
}

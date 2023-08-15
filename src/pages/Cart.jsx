import React from "react";
import CartItem from "../components/CartItem";

export default function Cart() {
  return (
    <>
      <div className="w-full flex flex-col  justify-center items-center bg-white my-5 lg:mx-auto shadow-lg max-w-xl lg:max-w-3xl divide-y divide-slate-100">
        <ul className="w-full divide-y divide-slate-100">
          <CartItem />
          {/* {movies.map((movie) => (
            <CartItem key={movie.id} movie={movie} />
          ))} */}
        </ul>
      </div>
    </>
  );
}

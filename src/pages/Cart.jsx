import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export default function Cart() {
  const auth = getAuth();
  const [CartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCartItems() {
      try {
        const docRef = collection(db, "cartItems");
        const q = query(docRef, where("userRef", "==", auth.currentUser.uid));
        const querySnap = await getDocs(q);
        const items = [];
        querySnap.forEach((doc) => {
          return items.push({ id: doc.id, data: doc.data() });
        });
        setCartItems(items);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCartItems();
  }, [auth.currentUser.uid]);

  async function onDelete(itemId) {
    if (window.confirm("are you sure you want to delete")) {
      await deleteDoc(doc(db, "cartItems", itemId));
      const updatedCart = CartItems.filter(
        (CartItem) => CartItem.id !== itemId
      );
      setCartItems(updatedCart);
      toast.success("item deleted");
    }
  }

  const sum = () => {
    let subTotal = 0;
    CartItems.forEach(
      (item) =>
        (subTotal +=
          item.data.quantity *
          Math.floor(
            (item.data.itemPrice * (1 - item.data.itemDiscount) * 100) / 100
          ))
    );
    return subTotal;
  };
  const ShippingCost = 15;
  // , CartItems);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <h2 className=" flex justify-center text-[28px] text-custom-black font-family-Montserrat font-semibold my-4 ">
        Shopping Cart
      </h2>
      <section className="flex flex-col sm:flex-row mx-4 sm:mx-32 lg:space-x-3 ">
        <div className="w-full flex flex-row  justify-center items-center border bg-white  lg:mx-auto rounded-lg shadow-lg max-w-xl lg:max-w-4xl divide-y divide-slate-100">
          {CartItems.length === 0 ? (
            <p className="text-xl font-semibold p-3">
              There are no items in the cart
            </p>
          ) : (
            <ul className="w-full divide-y divide-slate-700 p-2">
              {CartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  item={item.data}
                  onDelete={() => {
                    onDelete(item.id);
                  }}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="my-3 md:mt-6  md:my-5 h-full rounded-lg border bg-white p-4 shadow-md font-family-Roboto text-sm sm:text-lg text-custom-black md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p>Subtotal</p>
            <p>${sum()}</p>
          </div>
          <div className="flex justify-between ">
            <p>Shipping</p>
            <p>${ShippingCost}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="font-semibold">Total</p>
            <div>
              <p className="mb-2 font-semibold">${sum() + ShippingCost} USD</p>
              <p className="text-sm contrast-75 ">including VAT</p>
            </div>
          </div>
          <button className="my-2 w-full rounded-md bg-[#E70000] py-1.5 font-medium text-white hover:bg-[#C50000] transition duration-200 ease-in-out active:bg-red-800">
            Check Out
          </button>
        </div>
      </section>
    </>
  );
}

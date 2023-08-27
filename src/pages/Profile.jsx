import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  deleteField,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import Spinner from "../components/Spinner";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  function loggedOut() {
    auth.signOut();
    navigate("/");
  }

  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const productsRef = collection(db, "products");
  //       const q = query(
  //         productsRef,
  //         where("type", "in", ["polo-shirts", "t-shirts", "shirts"]),
  //         orderBy("timestamp", "desc")
  //       );
  //       const querySnapshot = await getDocs(q);
  //       const products = [];
  //       querySnapshot.forEach((doc) => {
  //         return products.push(doc.id);
  //       });
  //       console.log(products);
  //       async function sale() {
  //         try {
  //           products.forEach((id, index) => {
  //             updateDoc(doc(db, "products", id), {
  //               discountRate: 0.3,
  //             });
  //           });
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //       sale();
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchProducts();
  // }, []);

  if (loading) {
    return <Spinner />;
  }
  console.log(auth.currentUser);
  return (
    <>
      <main className="  flex justify-center items-center   ">
        <div className="w-full flex flex-col  justify-center items-center  sm:mx-auto sm:w-full sm:max-w-sm mx-5 my-5 p-5 lg:mx-auto shadow-lg max-w-sm lg:max-w-3xl bg-[#F1F1F1]  mt-14 px-3 rounded-xl sm:rounded-3xl ">
          <h2 className="flex flex-col font-semibold text-2xl my-1 mb-2">
            Profile
          </h2>

          <button
            onClick={loggedOut}
            className="w-full justify-center items-center  flex-col bg-red-600 text-white px-7 py-3 text-sm md:text-xl font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800"
          >
            sign out
          </button>
        </div>
      </main>
    </>
  );
}

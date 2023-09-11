import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export default function ProductPage() {
  const auth = getAuth();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const param = useParams();
  const [productImage, setProductImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [formData, setFormData] = useState({
    color: "",
    size: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "color") {
      setProductImage(product.image[e.target.id]);
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (quantity == 0) {
      toast.error("quantity should be at least 1");
      setLoading(false);
      return;
    }
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        navigate("/sign-in");
      }
    });
    const formDataCopy = {
      ...formData,
      quantity,
      itemPrice: product.regularPrice,
      itemDiscount: product.discountRate,
      productImage,
      productId: param.productId,
      userRef: auth.currentUser.uid,
    };
    const docRef = collection(db, "cartItems");
    await addDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("added successfully");
  }
  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, "products", param.productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [param.productId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="flex justify-center items-center">
        <div className="flex flex-col lg:flex-row sm:mx-32  my-7  rounded-lg px-8  justify-center border-2 border-red-600 items-center w-full bg-white">
          <div className="basis-1/3 lg:relative flex flex-col lg:w-80 lg:h-[27rem] shadow-2xl overflow-hidden rounded-lg lg:block ">
            <img
              className=" lg:absolute  inset-0 w-full h-full object-contain"
              src={productImage == null ? product.image[0] : productImage}
            />
          </div>
          <div className="basis-2/3 lg:relative p-8 ">
            {/* Product Form */}
            <form onSubmit={onSubmit} className="w-full h-full">
              <div>
                <h1 className="text-[28px] font-semibold text-custom-black font-family-Convergence pb-2">
                  {product.name}
                </h1>
              </div>
              <div className="flex flex-row text-lg font-medium pb-2">
                {product.discountRate === 0 ? (
                  <p className="pr-2  font-family-Roboto text-custom-black">
                    ${product.regularPrice}
                  </p>
                ) : (
                  <>
                    <p className="pr-2 line-through font-family-Roboto text-custom-black">
                      ${product.regularPrice}
                    </p>
                    <p className=" font-family-Roboto text-custom-black">
                      {" "}
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
              {/* Colors */}
              <div>
                <p className="text-lg font-semibold text-custom-black font-family-roboto pb-2">
                  Colors
                </p>
                <div className="flex space-x-3 text-lg pb-2">
                  {product.colors.map((color, index) => (
                    <label key={index}>
                      <input
                        id={index}
                        onChange={handleChange}
                        className="sr-only peer "
                        name="color"
                        type="radio"
                        value={color.name}
                        required
                      />
                      <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center  peer-checked:border-2 peer-checked:p-0 peer-checked:border-black peer-checked:bg-white cursor-pointer">
                        <span
                          className={`w-6 h-6 lg:w-9 lg:h-9 rounded-full shadow-gray-500 shadow-lg`}
                          style={{ backgroundColor: color.hex }}
                        ></span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/* Sizes */}
              <div>
                <p className="text-lg font-semibold text-custom-black font-family-roboto pb-2">
                  Sizes
                </p>
                <div className="flex space-x-3 text-lg lg:text-lg pb-2">
                  {product.sizes.map((size, index) => (
                    <label key={index}>
                      <input
                        onChange={handleChange}
                        className="sr-only peer"
                        name="size"
                        type="radio"
                        value={size}
                        required
                      />
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg flex items-center uppercase justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-red-600 peer-checked:text-white cursor-pointer">
                        {size}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/* Number of units */}
              <div>
                <label className="text-lg font-semibold text-custom-black font-family-roboto pb-2">
                  Quantity
                </label>
                <div className="flex flex-row h-8 rounded-lg  w-28 lg:w-32 bg-transparent mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity(quantity == 0 ? quantity : quantity - 1);
                    }}
                    className=" bg-[#E70000] text-white  hover:bg-[#C50000] font-semibold h-full w-12 rounded-l cursor-pointer outline-none"
                  >
                    <span className="m-auto text-lg font-normal">−</span>
                  </button>
                  <input
                    type="number"
                    onChange={handleChange}
                    className="outline-none focus:outline-none border-2 border-red-600 text-center w-full bg-white font-semibold text-lg hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 appearance-none "
                    name="unitCount"
                    value={quantity}
                  />
                  <button
                    type="button"
                    onChange={handleChange}
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                    className=" bg-[#E70000] text-white  hover:bg-[#C50000] font-semibold h-full w-12 rounded-r cursor-pointer outline-none"
                  >
                    <span className="m-auto text-lg font-normal">+</span>
                  </button>
                </div>
              </div>
              <button
                className=" justify-center items-center px-2.5  flex-col bg-[#E70000] text-white  text-sm md:text-lg font-medium  rounded shadow-md hover:bg-[#C50000] transition duration-200 ease-in-out active:bg-red-800 font-family-Roboto"
                type="submit"
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

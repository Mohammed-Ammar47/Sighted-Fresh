import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
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
  const [colorId, setColorId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [formData, setFormData] = useState({
    color: "",
    size: "",
  });
  console.log(auth.currentUser);
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name == "color") {
      setColorId(e.target.id);
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
  console.log(auth.currentUser);
  return (
    <>
      <section className="flex justify-center items-center">
        <div className="flex flex-col lg:flex-row mx-3  my-7 p-2 rounded-lg  justify-center border-2 border-red-600 items-center lg:w-[800px] bg-white">
          <div className="basis-1/3 lg:relative flex flex-col lg:w-80 lg:h-[27rem]  overflow-hidden rounded-lg lg:block ">
            <img
              className=" lg:absolute  inset-0 w-full h-full object-contain"
              src={productImage == null ? product.image[0] : productImage}
            />
          </div>
          <div className="basis-2/3 px-1 py-1">
            {/* Product Form */}

            <form onSubmit={onSubmit} className="w-full py-1 px-3">
              <div>
                <h1 className="text-xl font-semibold py-1">{product.name}</h1>
              </div>
              <div>
                <p className="text-xl font-normal py-2">
                  ${product.regularPrice}
                </p>
              </div>
              {/* Colors */}
              <div>
                <p className="text-xl font-semibold py-2">Colors</p>
                <div className="flex space-x-3 text-xl">
                  {product.colors.map((color, index) => (
                    <label key={index}>
                      <input
                        id={index}
                        onChange={handleChange}
                        className="sr-only peer"
                        name="color"
                        type="radio"
                        value={color.name}
                        required
                      />
                      <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center  peer-checked:border-2 peer-checked:p-0 peer-checked:border-black peer-checked:bg-white cursor-pointer">
                        <span
                          className={`w-6 h-6 lg:w-9 lg:h-9 rounded-full `}
                          style={{ backgroundColor: color.hex }}
                        ></span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/* Sizes */}
              <div>
                <p className="text-xl font-semibold py-2">Sizes</p>
                <div className="flex space-x-3 text-lg lg:text-xl">
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
                      <div className="w-6 h-6 lg:w-9 lg:h-9 rounded-lg flex items-center uppercase justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-red-600 peer-checked:text-white cursor-pointer">
                        {size}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/* Number of units */}
              <div>
                <label className="w-full text-xl lg:text-2xl font-semibold py-2">
                  Quantity
                </label>
                <div className="flex flex-row h-10 rounded-lg my-3 w-28 lg:w-36 bg-transparent mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity(quantity == 0 ? quantity : quantity - 1);
                    }}
                    className=" bg-red-600 text-white  hover:bg-red-700 font-semibold h-full w-20 rounded-l cursor-pointer outline-none"
                  >
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    type="number"
                    onChange={handleChange}
                    className="outline-none focus:outline-none border-2 border-red-600 text-center w-full bg-white font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  "
                    name="unitCount"
                    value={quantity}
                  />
                  <button
                    type="button"
                    onChange={handleChange}
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                    className=" bg-red-600 text-white  hover:bg-red-700 font-semibold h-full w-20 rounded-r cursor-pointer"
                  >
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
              <button
                className="w-full justify-center items-center  flex-col bg-red-600 text-white px-7 py-3 text-sm md:text-xl font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800"
                type="submit"
              >
                add to cart
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

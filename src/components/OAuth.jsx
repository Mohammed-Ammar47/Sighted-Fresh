import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import { AiFillFacebook , AiFillGoogleCircle,AiFillTwitterCircle} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { toast } from 'react-toastify';

export default function OAuth() {
    const navigate = useNavigate()
    async function signInWithGoogle() {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider();
            const credentails = await signInWithPopup(auth , provider)
            const user = credentails.user
            const docRef = doc(db , 'users', user.uid)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                await setDoc(docRef , {
                    fullName: user.displayName,
                    email:user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    async function signInWithTwitter() {
        try {
            const auth = getAuth()
            const provider = new TwitterAuthProvider();
            const credentails = await signInWithPopup(auth , provider)
            const user = credentails.user
            const docRef = doc(db , 'users', user.uid)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                await setDoc(docRef , {
                    fullName: user.displayName,
                    email:user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    async function signInWithFacebook() {
        try {
            const auth = getAuth()
            const provider = new FacebookAuthProvider();
            const credentails = await signInWithPopup(auth , provider)
            const user = credentails.user
            const docRef = doc(db , 'users', user.uid)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                await setDoc(docRef , {
                    fullName: user.displayName,
                    email:user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <><div className='w-full flex sm:flex-row justify-between items-center md:space-x-5   '>
    <button onClick={signInWithGoogle} className='w-full  hidden md:flex justify-center items-center  flex-col bg-red-600 text-white px-5 lg:px-7 py-3 text-base lg:text-xl font-medium  rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800'>
      Google
    </button>
    <button onClick={signInWithTwitter} className='w-full  hidden md:flex justify-center items-center  flex-col bg-red-600 text-white px-5 lg:px-7 py-3 text-base lg:text-xl font-medium  rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800'>
      Twitter
    </button>
    <button onClick={signInWithFacebook} className='w-full  hidden md:flex justify-center items-center  flex-col bg-red-600 text-white px-5 lg:px-7 py-3 text-base lg:text-xl font-medium  rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out active:bg-red-800'>
      Facebook
    </button>
    <AiFillGoogleCircle onClick={signInWithGoogle} className='w-full md:hidden text-4xl mx-6 text-red-600' />
    <AiFillTwitterCircle onClick={signInWithTwitter} className='w-full md:hidden text-4xl mx-6 text-red-600' />
    <AiFillFacebook onClick={signInWithFacebook} className='w-full md:hidden text-4xl mx-6 text-red-600' />
    </div></>
  )
}

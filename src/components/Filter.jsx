// import React from "react";
// import { CheckIcon } from "@heroicons/react/24/outline";

// export default function Filter() {
//   return (
//     <>
//       <h3 class="mb-4 font-semibold text-gray-900 ">Sort</h3>
//       <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
//         {categories.map((category) => (
//           <li class="w-full border-b border-gray-200 rounded-t-lg ">
//             <div class="flex items-center pl-3">
//               <input
//                 id="radio"
//                 type="radio"
//                 value="Shirts"
//                 name="category"
//                 class="w-5 h-5 accent-inherit bg-current text-red-600 checked:bg-red-600 checked:text-red-600 border-gray-300 rounded focus:ring-red-50 focus:ring-2 "
//               />
//               <label class="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">
//                 {category}
//               </label>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }
// <Transition.Root show={openL} as={Fragment}>
//   <Dialog as="div" className="relative z-10" onClose={setOpenL}>
//     <Transition.Child
//       as={Fragment}
//       enter="ease-in-out duration-500"
//       enterFrom="opacity-0"
//       enterTo="opacity-100"
//       leave="ease-in-out duration-500"
//       leaveFrom="opacity-100"
//       leaveTo="opacity-0"
//     >
//       <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//     </Transition.Child>

//     <div className="fixed inset-0 overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//           <Transition.Child
//             as={Fragment}
//             enter="transform transition ease-in-out duration-500 sm:duration-700"
//             enterFrom="translate-x-full"
//             enterTo="translate-x-0"
//             leave="transform transition ease-in-out duration-500 sm:duration-700"
//             leaveFrom="translate-x-0"
//             leaveTo="translate-x-full"
//           >
//             <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-in-out duration-500"
//                 enterFrom="opacity-0"
//                 enterTo="opacity-100"
//                 leave="ease-in-out duration-500"
//                 leaveFrom="opacity-100"
//                 leaveTo="opacity-0"
//               >
//                 <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
//                   <button
//                     type="button"
//                     className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
//                     onClick={() => setOpenL(false)}
//                   >
//                     <span className="absolute -inset-2.5" />
//                     <span className="sr-only">Close panel</span>
//                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>
//               </Transition.Child>
//               <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
//                 <div className="px-4 sm:px-6">
//                   <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
//                     Panel title
//                   </Dialog.Title>
//                 </div>
//                 <div className="relative mt-6 flex-1 px-4 sm:px-6">
//                   {/* Your content */}
//                   <div>
//                     <h3 class="mb-4 font-semibold text-gray-900 ">Category</h3>
//                     <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
//                       {categories.map((category, index) => (
//                         <li
//                           key={index}
//                           class="w-full border-b border-gray-200 rounded-t-lg "
//                         >
//                           <div class="flex items-center pl-3">
//                             <input
//                               id="check"
//                               onChange={filterProducts}
//                               type="checkbox"
//                               value={category.useName}
//                               name="category"
//                               class="w-5 h-5 accent-inherit bg-current text-red-600 checked:bg-red-600 checked:text-red-600 border-gray-300 rounded focus:ring-red-50 focus:ring-2 "
//                             />
//                             <label class="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">
//                               {category.displayName}
//                             </label>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>{" "}
//                   </div>
//                   {/* <Filter /> */}
//                 </div>
//               </div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </div>
//     </div>
//   </Dialog>
// </Transition.Root>;

{
  /* <div className="w-full md:w-48 bg-white shadow-md py-7 px-3 rounded-lg ">
                <InputRange
                  id="InputRange"
                  maxValue={50}
                  minValue={0}
                  value={inputs?.price}
                  onChange={filterPrice}
                />
              </div> */
}

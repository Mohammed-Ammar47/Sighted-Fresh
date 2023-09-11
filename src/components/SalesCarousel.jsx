import React from "react";

export default function SalesCarousel() {
  return (
    <>
      {/*<!-- Component: Carousel with controls outside --> */}
      <div className=" basis-3/5 ">
        {/*    <!-- Slides --> */}
        <div>
          <ul className="flex flex-row justify-between space-x-4 p-0">
            <li>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/sale%20banners%2FSale%20banner%2040%25%20design%20(1).png?alt=media&token=08c3080f-df85-44eb-896e-5472189de6ac"
                className="m-auto rounded-2xl   object-cover "
              />
            </li>
            <li>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/sale%20banners%2FSale%20banner%2050%25%20design.png?alt=media&token=026e02af-1fe2-4ddd-ad0e-f1105c227a48"
                className="m-auto rounded-2xl   object-cover "
              />
            </li>
          </ul>
        </div>
      </div>
      {/*<!-- End Carousel with controls outside --> */}
    </>
  );
}

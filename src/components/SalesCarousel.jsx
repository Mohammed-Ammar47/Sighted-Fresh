import React, { useEffect } from "react"
import Glide from "@glidejs/glide"

export default function SalesCarousel() {
  useEffect(() => {
    const slider = new Glide(".glide-04", {
      type: "carousel",
      focusAt: "center",
      perView: 1,
      autoplay: 3500,
      animationDuration: 700,
      gap: 12,
      classNames: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1024: {
          perView: 1,
        },
        640: {
          perView: 1,
        },
      },
    }).mount()

    return () => {
      slider.destroy()
    }
  }, [])

  return (
    <>
      {/*<!-- Component: Carousel with controls outside --> */}
      <div className="glide-04 relative w-full ">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            <li>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/sale%20banners%2Fsale%20banner%2050%25.jpg?alt=media&token=776e679c-41b3-492f-a3b3-5c8d46b7d568"
                className="m-auto max-h-full w-full max-w-full h-64  md:h-96  lg-h-[550px] "
              />
            </li>
            
          </ul>
        </div> 
      </div>
      {/*<!-- End Carousel with controls outside --> */}
    </>
  )
}
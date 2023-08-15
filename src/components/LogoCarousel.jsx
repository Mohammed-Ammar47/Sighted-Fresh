import React, { useEffect } from 'react'
import Glide from "@glidejs/glide"

export default function LogoCarousel() {
    useEffect(() => {
        const slider = new Glide(".glide-09", {
          type: "carousel",
          autoplay: 1,
          animationDuration: 4500,
          animationTimingFunc: "linear",
          perView: 3,
          classes: {
            nav: {
              active: "[&>*]:bg-wuiSlate-700",
            },
          },
          breakpoints: {
            1024: {
              perView: 2,
            },
            640: {
              perView: 1,
              gap: 36,
            },
          },
        }).mount()
    
        return () => {
          slider.destroy()
        }
      }, [])
    
      return (
        <>
          {/*<!-- Component: Testimonial carousel --> */}
          <div className="glide-09 relative w-full  overflow-hidden block">
            {/* <!-- Slides --> */}
            <div data-glide-el="track">
              <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden  p-0">
                <li>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fcap.png?alt=media&token=0763fb81-ca71-4ded-8a15-212cc2c90abc"
                    className="m-auto h-20 max-h-full w-auto max-w-full"
                  />
                </li>
                <li>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fcloth.png?alt=media&token=a42ed983-d911-4a93-84bf-16d68d95c5cb"
                    className="m-auto h-20 max-h-full w-auto max-w-full"
                  />
                </li>
                <li>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fjacket.png?alt=media&token=5480fede-de7c-426a-8479-82596fc854e1"
                    className="m-auto h-20 max-h-full w-auto max-w-full"
                  />
                </li>
                <li>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fjeans.png?alt=media&token=08926428-e82f-434f-9648-8b34df70e583"
                    className="m-auto h-20 max-h-full w-auto max-w-full"
                  />
                </li>
                <li>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fsneakers.png?alt=media&token=5b1ca977-29a2-4b5d-9110-b3818208952c"
                    className="m-auto h-20 max-h-full w-auto max-w-full"
                  />
                </li>
                <li>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Ftshirt.png?alt=media&token=ce39bc53-69d5-436b-9585-4f22b632d0bd"
                    className="m-auto h-20 max-h-full w-auto max-w-full"
                  />
                </li>
                <li>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fwatch.png?alt=media&token=090d5229-76c0-43b1-ad6d-ea7283f35239"
                    className="m-auto h-20 max-h-full w-auto max-w-full"
                  />
                </li>
              </ul>
            </div>
          </div>
          {/*<!-- End Testimonial carousel --> */}
        </>
      )
}

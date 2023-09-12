import React, { useEffect } from "react";

export default function LogoCarousel() {
  const logos = [
    `https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fcap.png?alt=media&token=0763fb81-ca71-4ded-8a15-212cc2c90abc`,
    `https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fcloth.png?alt=media&token=a42ed983-d911-4a93-84bf-16d68d95c5cb`,
    `https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fjacket.png?alt=media&token=5480fede-de7c-426a-8479-82596fc854e1`,
    `https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fjeans.png?alt=media&token=08926428-e82f-434f-9648-8b34df70e583`,
    `https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fsneakers.png?alt=media&token=5b1ca977-29a2-4b5d-9110-b3818208952c`,
    `https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Ftshirt.png?alt=media&token=ce39bc53-69d5-436b-9585-4f22b632d0bd`,
    `https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/icons%2Fwatch.png?alt=media&token=090d5229-76c0-43b1-ad6d-ea7283f35239`,
  ];
  return (
    <>
      {/*<!-- Component: Testimonial carousel --> */}
      <div>
        <ul className="items-center justify-center flex w-full space-x-8 flex-wrap  p-0 m-0 space-y-8 ">
          {logos.map((logo) => (
            <li>
              <img src={logo} className="m-auto h-14 sm:h-20 " />
            </li>
          ))}
        </ul>
      </div>
      {/*<!-- End Testimonial carousel --> */}
    </>
  );
}

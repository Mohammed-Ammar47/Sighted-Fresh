import React from "react";

export default function CartItem() {
  return (
    <>
      <article className="flex items-start space-x-6 p-6">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/sighted-fresh.appspot.com/o/Products%2Fpants%2Fcotton%20Wholesale%20fashion%20harem%20pants%20men%2FUTB8nlxMnf2JXKJkSanrq6y3lVXac.jpg_960x960.jpg?alt=media&token=5c5845a0-45e1-4a56-b91b-55d05edd9182"
          alt=""
          width="60"
          height="88"
          className="flex-none rounded-md bg-slate-100"
        />
        <div className="min-w-0 relative flex-auto">
          <h2 className="font-semibold text-slate-900 truncate pr-20">name</h2>
          <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div className="absolute top-0 right-0 flex items-center space-x-1">
              <dt className="text-sky-500">
                <span className="sr-only">Star rating</span>
                <svg width="16" height="20" fill="currentColor">
                  <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                </svg>
              </dt>
              <dd>55</dd>
            </div>
            <div>
              <dt className="sr-only">Rating</dt>
              <dd className="px-1.5 ring-1 ring-slate-200 rounded">
                stars rating
              </dd>
            </div>
            <div className="ml-2">
              <dt className="sr-only">Year</dt>
              <dd>2022</dd>
            </div>
            <div>
              <dt className="sr-only">Genre</dt>
              <dd className="flex items-center">
                <svg
                  width="2"
                  height="2"
                  fill="currentColor"
                  className="mx-2 text-slate-300"
                  aria-hidden="true"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                action
              </dd>
            </div>
            <div>
              <dt className="sr-only">Runtime</dt>
              <dd className="flex items-center">
                <svg
                  width="2"
                  height="2"
                  fill="currentColor"
                  className="mx-2 text-slate-300"
                  aria-hidden="true"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                123
              </dd>
            </div>
            <div className="flex-none w-full mt-2 font-normal">
              <dt className="sr-only">Cast</dt>
              <dd className="text-slate-400">h</dd>
            </div>
          </dl>
        </div>
      </article>
    </>
  );
}

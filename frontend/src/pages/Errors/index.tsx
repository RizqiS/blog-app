import { Link, useRouteError } from "react-router-dom";

export default function ErrorPages() {
  const errors: any = useRouteError();

  return (
    <div className="flex min-h-screen flex-col gap-y-6 items-center justify-center">
      <h1 className="text-center text-5xl">
        {errors.status} | {errors.statusText}
      </h1>
      <img
        src="https://preview.redd.it/dtljzwihuh861.jpg?auto=webp&s=e4b3f61d71f33d047e5acc1f4214a4e295cfb5bb"
        className="w-1/2 rounded-lg h-96 bg-cover "
        alt="error"
      />
      <p className=" text-3xl">
        {errors.error.message} <span className="mx-3">|</span>
        <Link to={"/"} className="text-slate-100 bg-pink-600 px-3 py-1 rounded-md">
          Back to home
        </Link>
      </p>
    </div>
  );
}

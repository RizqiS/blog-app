import { Form, Link, useActionData } from "react-router-dom";
import Input from "../UI/Input";

type TFormAuth = {
  title: string;
  check: string;
};

type TFormErrorValidation = {
  errors: { email: string };
  message: string;
};

export default function FormAuth({ title, check }: TFormAuth) {
  const resActionError: any = useActionData();
  const errorValidation = resActionError as TFormErrorValidation;

  return (
    <section className="w-full md:max-w-3xl mx-auto mt-12 border py-6">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-6 font-semibold">{title}</h2>
        <Form method="post" className="w-full px-6 md:px-0 md:w-1/2">
          <Input
            option="input"
            text="Email"
            label={{ htmlFor: "email" }}
            input={{ type: "email", name: "email", required: true }}
          />
          <Input
            option="input"
            text="Password"
            label={{ htmlFor: "password" }}
            input={{ type: "password", name: "password", required: true }}
          />
          <div className="flex items-center justify-between">
            <Link
              to={`/auth?mode=${check === "login" ? "signup" : "login"}`}
              className="text-slate-800 hover:text-slate-700"
            >
              {check === "login" ? "Don't have an account? " : "Already have an account? "}
            </Link>
            <button
              type="submit"
              className="mt-3 bg-slate-800 text-white px-3 py-1.5 rounded-lg mb-3 hover:bg-slate-700 transition duration-150"
            >
              {check === "login" ? "Login" : "Signup"}
            </button>
          </div>
        </Form>
        {errorValidation && errorValidation.errors && (
          <ul className="mt-6">
            {Object.values(errorValidation.errors).map((error, index) => (
              <li key={index} className="text-red-500">
                * {error}
              </li>
            ))}
          </ul>
        )}
        {errorValidation && errorValidation.message && <p className="text-red-500">* {errorValidation.message}</p>}
      </div>
    </section>
  );
}

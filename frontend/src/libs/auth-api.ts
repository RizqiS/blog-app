import { ActionFunctionArgs, json, redirect } from "react-router-dom";

const url = import.meta.env.VITE_BACEND_URL as string;
export async function actionAuthentication({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") as string;

  const fd = await request.formData();
  const user = {
    email: fd.get("email") as string,
    password: fd.get("password") as string,
  };

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }

  const resAuth = await fetch(`${url}/auth/${mode}`, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (resAuth.status === 422 || resAuth.status === 401) {
    return resAuth;
  }

  if (!resAuth.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  /* do something token here */
  const { token } = await resAuth.json();
  localStorage.setItem("token", token);

  return redirect("/");
}

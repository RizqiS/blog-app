import { ActionFunctionArgs, redirect } from "react-router-dom";

export function logoutAction({ request }: ActionFunctionArgs) {
  localStorage.removeItem("token");
  return redirect("/");
}

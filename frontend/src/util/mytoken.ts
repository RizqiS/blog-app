import { redirect } from "react-router-dom";

export function getToken() {
  return (localStorage.getItem("token") as string) || "";
}

export function loaderToken() {
  return getToken();
}

export function loaderCheckAuth() {
  const token = getToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}

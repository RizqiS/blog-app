export function getToken() {
  return (localStorage.getItem("token") as string) || "";
}

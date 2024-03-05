import { useSearchParams } from "react-router-dom";
import FormAuth from "../../components/EventBlog/FormAuth";
export default function Authentication() {
  const [searchParams] = useSearchParams();
  const sp = searchParams.get("mode") as string;
  return (
    <>
      {sp === "login" && <FormAuth title="Login Here" check={sp} />}
      {sp === "signup" && <FormAuth title="Signup Here" check={sp} />}
    </>
  );
}

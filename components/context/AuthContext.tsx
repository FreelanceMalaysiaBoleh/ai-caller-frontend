
import { removeToken } from "@/redux/authSlice";
import { getAgents } from "@/services/AgentServices";
import { useGetToken } from "@/services/AuthServices";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthContext = ({ children }: { children: React.ReactNode }) => {

  const token = useGetToken();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {

    const checkAuth = async () => {
      const res = await getAgents(token);
      console.log("Auth", res)
      if (!res.success) {
        dispatch(removeToken());
        router.push("/login");
      }
    }

    if (router.asPath.includes("login") || router.asPath.includes("sign-up")) {
      console.log("has sign-up")
      if (token) {
        router.push("/")
      }
    } else {
      console.log("no sign-up")
      if (!token) {
        router.push("/login")
      }
    }

    if (!(router.asPath.includes("login") || router.asPath.includes("sign-up"))) {
      checkAuth();
    }
  }, [token])


  return children
}

export default AuthContext
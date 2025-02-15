
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

      if (!res.success) {
        dispatch(removeToken());
        router.push("/login");
      }
    }

    if (router.asPath.includes("login")) {
      if (token) {
        router.push("/")
      }
    } else {
      if (!token) {
        router.push("/login")
      }
    }

    checkAuth();
  }, [token])


  return children
}

export default AuthContext
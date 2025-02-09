
import { useGetToken } from "@/services/AuthServices";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthContext = ({ children }: { children: React.ReactNode }) => {

  const token = useGetToken();
  const router = useRouter();

  useEffect(() => {

    if (router.asPath.includes("login")) {
      if (token) {
        router.push("/")
      }
    } else {
      if (!token) {
        router.push("/login")
      }
    }
  }, [token])


  return children
}

export default AuthContext
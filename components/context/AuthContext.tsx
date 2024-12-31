import { getToken } from "@/services/AuthServices";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthContext = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if(router.asPath.includes("login")){
      if(token){
        router.push("/")
      }
    }else{
      if(!token){
        router.push("/login")
      }
    }
  }, [])


  return children
}

export default AuthContext
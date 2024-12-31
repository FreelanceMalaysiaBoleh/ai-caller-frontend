import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "antd";
import { useState } from "react";
import { login, saveToken } from "@/services/AuthServices";
import { useRouter } from "next/router";

// Validation schema for username and password
const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: {username: string, password: string}) => {

    login(data).then((token) => {
      saveToken(token);
      router.push("/");
    }).catch(e => {
      setError(`${e}`)
      console.log(e);
    })
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "100%",
          border: "1px solid white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div>
            <p style={{ color: "white", marginBottom: 5 }}>Username</p>
            <input
              type="text"
              id="username"
              {...register("username")}
              placeholder='name'
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#3E3E3E',
                color: "white"
              }}
            />
            {errors.username && <p style={{ color: "red", marginTop: 3 }}>{errors.username.message}</p>}
          </div>

          <div style={{ marginBottom: 15 }}>
            <p style={{ color: "white", marginBottom: 5, marginTop: 5 }}>Password</p>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder='name'
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#3E3E3E',
                color: "white"
              }}
            />
            {errors.password && <p style={{ color: "red", marginTop: 3 }}>{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            style={{
              marginLeft: '5px',
              padding: '5px 10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: isHovered ? "#FF89B2" : "#F73587",
              color: 'white',
              cursor: 'pointer',

            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Login
          </button>
          {
            error
              ?
              <p style={{ color: "red" }}>{error}</p>
              :
              <></>
          }
        </form>
      </div>
    </Layout>
  );
};

export default LoginForm;
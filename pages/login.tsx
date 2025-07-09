import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "antd";
import { useState } from "react";
import { login } from "@/services/AuthServices";
import { useRouter } from "next/router";
import Image from "next/image";
import GedeekIcon from "@/public/images/GEDEEK_BIG.png"
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/authSlice";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import logo from "../public/images/logo.png"

// Validation schema for username and password
const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();
  const size = useScreenSize();

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

  const onSubmit = async (data: { username: string, password: string }) => {
    console.log("login")
    login(data).then((token) => {
      dispatch(setToken(token));
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
          display: "flex",
          flexDirection: "row",
          alignItems: size == "small" ? "start" : "center",
          justifyContent: "center",
        }}
      >
        {
          size == "large" || size == "medium"
            ?
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: 'center'
            }}>
              <Image src={GedeekIcon.src} alt="mongo icon" height={76} width={400} />
            </div>
            :
            <></>
        }

        <div style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>

          {
            size == "small"
              ?
              <div style={{ marginTop: 50, marginBottom: 45 }}>
                <Image
                  src={logo}
                  width={120}
                  height={23}
                  alt={"logo"}
                />
              </div>
              :
              <></>
          }


          <h2 style={{ fontSize: responsiveValue(size, "20px", "34px", "34px") as string, marginBottom: "10px" }}>Login to Your Account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form" style={{ width: responsiveValue(size, "90%", "80%", "50%") as string }}>
            <div style={{
              backgroundColor: "#3e3e3e",
              padding: responsiveValue(size, "25px 15px 100px", "30px 30px", "30px 30px") as string,

              borderRadius: "10px"
            }}>

              <FormInput
                label="Email"
                field="username"
                subtext="Use your verified email to login"
                register={register as never}
                errors={errors}
              />

              <FormInput
                label="Password"
                field="password"
                subtext="You can reset your password always."
                password={true}
                register={register as never}
                errors={errors}
              />

              <p style={{ color: "white", textDecoration: "underline", fontSize: "12px", marginTop: "15px" }}>Forgot your password?</p>

              {
                size == "small"
                  ?
                  <></>
                  :
                  <div style={{ paddingTop: "200px", width: "100%", display: "flex", alignItems: "center", justifyContent: 'center' }}>
                    <button
                      type="submit"
                      style={{
                        marginLeft: '5px',
                        padding: '15px 70px',
                        borderRadius: '5px',
                        border: 'none',
                        background: isHovered
                          ? "linear-gradient(to right, #FF89B2, #7AA3F8)"
                          : "linear-gradient(to right, #F73587, #7AA3F8)",
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: "14px",
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      Login
                    </button>
                  </div>
              }



              {
                error
                  ?
                  <p style={{ color: "red" }}>{error}</p>
                  :
                  <></>
              }

            </div>

            {
              size == "small"
                ?
                <div style={{ paddingTop: "20px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                  <button
                    type="submit"
                    style={{
                      marginLeft: '5px',
                      padding: '15px 70px',
                      borderRadius: '5px',
                      border: 'none',
                      background: isHovered
                        ? "linear-gradient(to right, #FF89B2, #7AA3F8)"
                        : "linear-gradient(to right, #F73587, #7AA3F8)",
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: "14px",
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Login
                  </button>

                  <p style={{
                    fontSize: 12,
                    marginTop: 15,
                  }}>Login with OTP</p>
                </div>
                :
                <></>
            }
          </form>
        </div>
      </div>
    </Layout >
  );
};

export default LoginForm;


export interface LoginFormFields {
  username: string,
  password: string
}

export const FormInput = ({
  label,
  field,
  subtext,
  register,
  password = false,
  errors
}: {
  label: string,
  field: "username" | "password",
  password?: boolean,
  subtext: string,
  register: UseFormRegister<LoginFormFields>,
  errors: FieldErrors<LoginFormFields>
}) => {

  return (
    <div style={{ marginBottom: "20px" }}>
      <p id="medium">{label}</p>
      <p id="small" style={{ color: "#A5A5A5" }}>{subtext}</p>
      <input
        type={password ? "password" : "text"}
        {...register(field as never)}
        style={{
          marginTop: "10px",
          height: "46px",
          padding: "8px",
          border: "1px solid #646464",
          borderRadius: "5px",
          backgroundColor: "#262626",
          width: "100%",
          color: "white",
        }}
      />

      {errors[field]?.message &&
        <p style={{ color: "red", margin: 0 }}>
          {errors[field]?.message}
        </p>
      }
    </div>
  )
}
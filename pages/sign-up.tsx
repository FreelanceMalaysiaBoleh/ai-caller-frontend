import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "antd";
import { useState } from "react";
import { register as registerUser } from "@/services/AuthServices";
import { useRouter } from "next/router";
import Image from "next/image";
import GedeekIcon from "@/public/images/GEDEEK_BIG.png"
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import logo from "../public/images/logo.png"

// Validation schema for sign up form
const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  mobile_number: yup
    .string()
    .matches(/^\+\d{1,15}$/, "Mobile number must start with + and contain only digits")
    .required("Mobile number is required"),
});

const SignUpForm = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const size = useScreenSize();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobile_number: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: { name: string, email: string, password: string, mobile_number: string }) => {
    console.log("signing up")
    setError("");
    setSuccess("");

    try {
      const result = await registerUser(data);

      console.log("results: ", result);
      // Check if registration was successful
      router.push("/login");
    } catch (e: any) {
      setError(e.message || "Registration failed. Please try again.");
      console.log(e);
    }
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


          <h2 style={{ fontSize: responsiveValue(size, "20px", "34px", "34px") as string, marginBottom: "10px" }}>Create Your Account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="signup-form" style={{ width: responsiveValue(size, "90%", "80%", "50%") as string }}>
            <div style={{
              backgroundColor: "#3e3e3e",
              padding: responsiveValue(size, "25px 15px 50px", "30px 30px", "30px 30px") as string,
              borderRadius: "10px"
            }}>

              {/* Back to Login button at the top */}
              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "20px"
              }}>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: 0
                  }}
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Back to Login
                </button>
              </div>

              <FormInput
                label="Full Name"
                field="name"
                subtext="Enter your full name"
                register={register as never}
                errors={errors}
              />

              <FormInput
                label="Email"
                field="email"
                subtext="Use a valid email address"
                register={register as never}
                errors={errors}
              />

              <FormInput
                label="Password"
                field="password"
                subtext="Password must be at least 6 characters"
                password={true}
                register={register as never}
                errors={errors}
              />

              <FormInput
                label="Mobile Number"
                field="mobile_number"
                subtext="Enter your mobile number with country code (e.g., +60182111070)"
                register={register as never}
                errors={errors}
              />

              {
                size == "small"
                  ?
                  <></>
                  :
                  <div style={{ paddingTop: "50px", width: "100%", display: "flex", alignItems: "center", justifyContent: 'center' }}>
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
                      Sign Up
                    </button>
                  </div>
              }

              {
                success
                  ?
                  <p style={{ color: "green", marginTop: "15px" }}>{success}</p>
                  :
                  <></>
              }

              {
                error
                  ?
                  <p style={{ color: "red", marginTop: "15px" }}>{error}</p>
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
                    Sign Up
                  </button>
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

export default SignUpForm;


export interface SignUpFormFields {
  name: string,
  email: string,
  password: string,
  mobile_number: string
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
  field: "name" | "email" | "password" | "mobile_number",
  password?: boolean,
  subtext: string,
  register: UseFormRegister<SignUpFormFields>,
  errors: FieldErrors<SignUpFormFields>
}) => {

  const [mobileValue, setMobileValue] = useState("+");

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Always ensure the value starts with +
    if (value.startsWith("+")) {
      setMobileValue(value);
    } else {
      setMobileValue("+" + value);
    }
  };

  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    // Prevent deletion of the + sign
    if ((e.key === "Backspace" || e.key === "Delete") && target.selectionStart === 1) {
      e.preventDefault();
    }

    // Prevent cursor from going before the + sign
    if (e.key === "ArrowLeft" && target.selectionStart === 1) {
      e.preventDefault();
    }
  };

  const handleMobileClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    // Prevent cursor from being placed before the + sign
    if (target.selectionStart === 0) {
      target.setSelectionRange(1, 1);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <p id="medium">{label}</p>
      <p id="small" style={{ color: "#A5A5A5" }}>{subtext}</p>

      {field === "mobile_number" ? (
        <input
          type="text"
          {...register(field as never)}
          value={mobileValue}
          onChange={handleMobileChange}
          onKeyDown={handleMobileKeyDown}
          onClick={handleMobileClick}
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
          placeholder="+60182111070"
        />
      ) : (
        <input
          type={password ? "password" : (field === "email" ? "email" : "text")}
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
      )}

      {errors[field]?.message &&
        <p style={{ color: "red", margin: 0 }}>
          {errors[field]?.message}
        </p>
      }
    </div>
  )
}
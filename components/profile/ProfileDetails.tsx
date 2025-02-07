// import { ChangeEvent, useState } from "react";
// import AvatarDefault from "../../public/images/avatar_default.png";
import { FieldErrors, FormProvider, UseFormRegister } from "react-hook-form";
import useProfileForm, { profileDetailsFields, ProfileDetailsFormType } from "@/hooks/profile/useProfileForm";
// import { Switch } from "antd";
import { FaCheckCircle } from "react-icons/fa";

const ProfileDetails = () => {
  const { register, errors, form, handleSubmitForm } = useProfileForm();
  // const [emailPasswordCheck, setEmailPasswordCheck] = useState(false);
  // const [mobileCheck, setMobileCheck] = useState(false);
  // const [emailOTPCheck, setEmailOTPCheck] = useState(false);


  // const handleChange = (check: "email_password" | "mobile" | "email_otp") => {
  //   setEmailPasswordCheck((val) => {
  //     if (check == "email_password" && !val) {
  //       return true
  //     }

  //     return false
  //   });
  //   setMobileCheck((val) => {
  //     if (check == "mobile" && !val) {
  //       return true
  //     }

  //     return false
  //   });
  //   setEmailOTPCheck((val) => {
  //     if (check == "email_otp" && !val) {
  //       return true
  //     }

  //     return false
  //   });
  // }

  return (
    <>
      <div style={{ marginBottom: 65 }}></div>
      <h1>Profile Detail</h1>
      <div style={{ marginBottom: "10px" }}></div>
      <p>Update, verify your details</p>

      <div style={{ marginBottom: "10px" }}></div>
      <div style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#3E3E3E",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: "10px 20px"
      }}>
        {/* <ProfileImageUpload /> */}

        <div style={{ marginTop: "30px", width: "100%" }}>
          <FormProvider {...form}>
            <form onSubmit={handleSubmitForm}>
              <div>
                <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
                  <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
                    <FormInput
                      label={"Mobile Number"}
                      placeholder="+60XXXXXXX"
                      field={"mobile_number"}
                      register={register as never}
                      errors={errors}
                    />

                    <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                      <FormInput
                        label={"Send Port"}
                        placeholder="account name"
                        field={"send_port"}
                        verifiedTag={true}
                        verified={true}
                        register={register as never}
                        errors={errors}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <FormInput
                        label={"Receive Port"}
                        placeholder="account name"
                        field={"receive_port"}
                        verifiedTag={true}
                        verified={false}
                        register={register as never}
                        errors={errors}
                      />
                    </div>
{/* 
                    <div style={{ marginBottom: "15px" }}>
                      <FormInput
                        label={"Company/Corporate/Legal Name"}
                        placeholder="account name"
                        field={"company_name"}
                        register={register as never}
                        errors={errors}
                      />
                    </div> */}
                  </div>
                  {/* <div style={{ width: "50%" }}>
                    <FormInput
                      label={"Password"}
                      placeholder="account name"
                      field={"password"}
                      password={true}
                      register={register as never}
                      errors={errors}
                    />
                  </div> */}
                </div>

                {/* <p style={{ fontSize: "12px", color: "#B8B8B8", marginBottom: "5px" }}>Login Methods</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyItems: "center", marginBottom: "10px" }}>
                    <Switch
                      checked={emailPasswordCheck}
                      onChange={() => handleChange("email_password")}
                      style={{
                        width: "24px",
                        backgroundColor: emailPasswordCheck ? "#F73587" : "#A0A0A0",
                      }}
                    />
                    <p style={{ fontSize: "12px", marginLeft: "10px" }}>Email & Password</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyItems: "center", marginBottom: "10px" }}>
                    <Switch
                      checked={mobileCheck}
                      onChange={() => handleChange("mobile")}
                      style={{
                        width: "24px",
                        backgroundColor: mobileCheck ? "#F73587" : "#A0A0A0",
                      }}
                    />
                    <p style={{ fontSize: "12px", marginLeft: "10px" }}>via Mobile Number</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyItems: "center", marginBottom: "10px" }}>
                    <Switch
                      checked={emailOTPCheck}
                      onChange={() => handleChange("email_otp")}
                      style={{
                        width: "24px",
                        backgroundColor: emailOTPCheck ? "#F73587" : "#A0A0A0",
                      }}
                    />
                    <p style={{ fontSize: "12px", marginLeft: "10px" }}>Email with OTP</p>
                  </div>
                </div> */}

                <div style={{ width: "100%", display: "flex", marginTop: "40px" }}>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 30px",
                      backgroundColor: "#797979",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <p id="biggersmall">Cancel</p>
                  </button>

                  <button
                    type="submit"
                    style={{
                      padding: "10px 30px",
                      backgroundColor: "#F73587",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginLeft: "auto"
                    }}
                  >
                    <p id="biggersmall">Save</p>
                  </button>
                </div>

              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}

export default ProfileDetails;

const FormInput = ({
  label,
  field,
  placeholder,
  register,
  errors,
  password = false,
  verified = false,
  verifiedTag = false
}: {
  label: string,
  verifiedTag?: boolean,
  verified?: boolean,
  placeholder: string
  password?: boolean,
  field: profileDetailsFields,
  register: UseFormRegister<ProfileDetailsFormType>,
  errors: FieldErrors<ProfileDetailsFormType>
}) => {

  return (
    <div style={{ width: "100%" }}>
      <p style={{ fontSize: "12px", color: "#B8B8B8", marginBottom: "5px" }}>{label}</p>
      <div style={{
        borderBottom: "1px solid #909090",
        paddingBottom: "5px"
      }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type={password ? "password" : "text"}
            {...register(field as never)}
            style={{
              all: "unset",
              width: "70%",
              height: "auto",
              color: "white",
              fontSize: "14px",
            }}
            placeholder={placeholder}
          />
          {
            verifiedTag
              ?
              verified
                ?
                <div style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}>
                  <FaCheckCircle size={15} color="#25BB00" />
                  <p style={{ fontSize: "10px", marginLeft: "5px", color: "#25BB00" }}>Verified</p>
                </div>
                :
                <div style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}>
                  <FaCheckCircle size={15} color="#AFBB00" />
                  <p style={{ fontSize: "10px", marginLeft: "5px", color: "#AFBB00" }}>Not Verified</p>
                </div>
              :
              <></>
          }

        </div>
        {errors[field]?.message &&
          <p style={{ color: "red", margin: 0 }}>
            {errors[field]?.message}
          </p>
        }
      </div>
    </div>
  )
}

// const ProfileImageUpload = () => {
//   const [avatar, setAvatar] = useState<string>(AvatarDefault.src);
//   const [fileName, setFileName] = useState<string>("");

//   const formatChecker = (format: string, formats: Array<string>) => {
//     return formats.includes(format);
//   }

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const file = e.target.files?.[0]; // Safely access the first file

//     if (file && formatChecker(file.type, ["image/jpeg", "image/png"])) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatar(reader.result as string);
//         setFileName(file.name);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       alert("Please upload a valid PNG or JPG file.");
//     }
//   };

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//         }}
//       >
//         <div
//           style={{
//             width: "45px",
//             height: "45px",
//             borderRadius: "50%",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#3e3e3e",
//             marginRight: "7px",
//           }}
//         >
//           <img
//             src={avatar}
//             alt="Avatar"
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />
//         </div>



//         {/* File Input Button */}
//         <label
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             borderBottom: "solid 1px",
//             borderColor: "#626262",
//             color: "#fff",
//             cursor: "pointer",
//             fontSize: "16px"
//           }}
//         >
//           {fileName ? fileName : "Choose File"}
//           <input
//             type="file"
//             accept={"image/jpeg, image/png"}
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//           />
//         </label>
//       </div>
//       <p id="small" style={{ marginLeft: 10, color: "#C9C9C9" }}>
//         logo
//       </p>
//     </div>
//   );
// };
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "antd";
import { useState } from "react";
import { requestOTP, verifyOTP } from "@/services/AuthServices";
import { useRouter } from "next/router";
import Image from "next/image";
import GedeekIcon from "@/public/images/GEDEEK_BIG.png"
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/authSlice";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import logo from "../../public/images/logo.png"

// Validation schema for email
const otpSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
});

const OTPLoginForm = () => {

    const [isHovered, setIsHovered] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const router = useRouter();
    const size = useScreenSize();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
        },
        resolver: yupResolver(otpSchema),
    });

    const onSubmit = async (data: { email: string }) => {
        console.log("requesting OTP")
        setError("");
        setSuccess("");

        try {
            const result = await requestOTP(data.email);
            setSuccess(`${result.message} (Expires in ${result.expires_in_minutes} minutes)`);
            setEmailValue(data.email);
            setShowOtpInput(true);
        } catch (e) {
            setError(`${e}`)
            console.log(e);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otpCode.trim()) {
            setError("Please enter the OTP code");
            return;
        }

        setIsVerifying(true);
        setError("");
        setSuccess("");

        try {
            const result = await verifyOTP(emailValue, otpCode);

            // Check if the verification was successful
            if (result.success && result.access_token) {
                dispatch(setToken(result.access_token));
                router.push("/");
            } else {
                setError("OTP verification failed. Please try again.");
            }
        } catch (e: unknown) {
            setError((e as { message: string }).message || "OTP verification failed. Please try again.");
            console.log(e);
        } finally {
            setIsVerifying(false);
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


                    <h2 style={{ fontSize: responsiveValue(size, "20px", "34px", "34px") as string, marginBottom: "10px" }}>Login with OTP</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="login-form" style={{ width: responsiveValue(size, "90%", "80%", "50%") as string }}>
                        <div style={{
                            backgroundColor: "#3e3e3e",
                            padding: responsiveValue(size, "25px 15px 100px", "30px 30px", "30px 30px") as string,
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
                                        router.push("/auth/login");
                                    }}
                                >
                                    Back to Login
                                </button>
                            </div>

                            <FormInput
                                label="Email"
                                field="email"
                                subtext="Enter your verified email to receive OTP"
                                register={register as never}
                                errors={errors}
                                disabled={showOtpInput}
                            />

                            {/* OTP Input - shown after successful OTP request */}
                            {showOtpInput && (
                                <div style={{ marginTop: "20px" }}>
                                    <p id="medium" style={{ color: "white" }}>Enter OTP Code</p>
                                    <p id="small" style={{ color: "#A5A5A5" }}>Enter the 6-digit code sent to your email</p>
                                    <input
                                        type="text"
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value)}
                                        placeholder="123456"
                                        maxLength={6}
                                        style={{
                                            marginTop: "10px",
                                            height: "46px",
                                            padding: "8px",
                                            border: "1px solid #646464",
                                            borderRadius: "5px",
                                            backgroundColor: "#262626",
                                            width: "100%",
                                            color: "white",
                                            textAlign: "center",
                                            fontSize: "18px",
                                            letterSpacing: "2px"
                                        }}
                                    />
                                </div>
                            )}

                            {
                                size == "small"
                                    ?
                                    <></>
                                    :
                                    <div style={{ paddingTop: showOtpInput ? "20px" : "200px", width: "100%", display: "flex", alignItems: "center", justifyContent: 'center' }}>
                                        {!showOtpInput ? (
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
                                                Send OTP
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleVerifyOTP}
                                                disabled={isVerifying}
                                                style={{
                                                    marginLeft: '5px',
                                                    padding: '15px 70px',
                                                    borderRadius: '5px',
                                                    border: 'none',
                                                    background: isVerifying
                                                        ? "#666666"
                                                        : isHovered
                                                            ? "linear-gradient(to right, #FF89B2, #7AA3F8)"
                                                            : "linear-gradient(to right, #F73587, #7AA3F8)",
                                                    color: 'white',
                                                    cursor: isVerifying ? 'not-allowed' : 'pointer',
                                                    fontSize: "14px",
                                                }}
                                                onMouseEnter={() => !isVerifying && setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}
                                            >
                                                {isVerifying ? "Verifying..." : "Verify OTP"}
                                            </button>
                                        )}
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
                                    {!showOtpInput ? (
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
                                            Send OTP
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleVerifyOTP}
                                            disabled={isVerifying}
                                            style={{
                                                marginLeft: '5px',
                                                padding: '15px 70px',
                                                borderRadius: '5px',
                                                border: 'none',
                                                background: isVerifying
                                                    ? "#666666"
                                                    : isHovered
                                                        ? "linear-gradient(to right, #FF89B2, #7AA3F8)"
                                                        : "linear-gradient(to right, #F73587, #7AA3F8)",
                                                color: 'white',
                                                cursor: isVerifying ? 'not-allowed' : 'pointer',
                                                fontSize: "14px",
                                            }}
                                            onMouseEnter={() => !isVerifying && setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >
                                            {isVerifying ? "Verifying..." : "Verify OTP"}
                                        </button>
                                    )}
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

export default OTPLoginForm;


export interface OTPLoginFormFields {
    email: string
}

export const FormInput = ({
    label,
    field,
    subtext,
    register,
    errors,
    disabled = false
}: {
    label: string,
    field: "email",
    subtext: string,
    register: UseFormRegister<OTPLoginFormFields>,
    errors: FieldErrors<OTPLoginFormFields>,
    disabled?: boolean
}) => {

    return (
        <div style={{ marginBottom: "20px" }}>
            <p id="medium">{label}</p>
            <p id="small" style={{ color: "#A5A5A5" }}>{subtext}</p>
            <input
                type="email"
                {...register(field as never)}
                disabled={disabled}
                style={{
                    marginTop: "10px",
                    height: "46px",
                    padding: "8px",
                    border: "1px solid #646464",
                    borderRadius: "5px",
                    backgroundColor: disabled ? "#1a1a1a" : "#262626",
                    width: "100%",
                    color: disabled ? "#888888" : "white",
                    cursor: disabled ? "not-allowed" : "auto",
                    opacity: disabled ? 0.7 : 1
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
import { FieldErrors, UseFormRegister, UseFormReturn } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import { AgentFormTypes, FormInput, FormSelect } from "./AgentForm";

const Page1 = ({
    register,
    errors,
    setPage
}: {
    form: UseFormReturn<AgentFormTypes, unknown, undefined>,
    handleSubmitForm: () => void,
    register: UseFormRegister<AgentFormTypes>,
    errors: FieldErrors<AgentFormTypes>,
    setPage: (index: number) => void

}) => {
    return (
        <>
            <p id="medium" style={{ marginTop: "30px" }}>Agent avatar</p>
            <p id="small">Upload an avatar for your agent</p>
            <ImageUpload />
            <div style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "60px"
            }}>
                <div style={{
                    flex: 1,
                    marginRight: "25px"
                }}>
                    <FormInput
                        label="Name"
                        field="name"
                        subtext="What name will you assistant go by"
                        register={register as never}
                        errors={errors}
                    />
                </div>
                <div style={{
                    flex: 1
                }}>
                    <FormSelect
                        label="Language"
                        field="language"
                        subtext="Select the language your agent will mostly use"
                        register={register}
                        errors={errors}
                        options={["Auto", "English", "Spanish", "Arabic"]}
                    />
                </div>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "row",
            }}>
                <div style={{
                    flex: 1,
                    marginRight: "25px"
                }}>
                    <FormSelect
                        label="Voice"
                        field="voice"
                        subtext="Select what voice your agent will use"
                        register={register}
                        errors={errors}
                        options={["Professional Male", "Professional Female"]}
                    />
                </div>
                <div style={{
                    flex: 1
                }}>
                    <FormInput
                        label="Phone Number"
                        field="phoneno"
                        subtext="Select what phone number for inbound/outbound calls"
                        register={register as never}
                        errors={errors}
                    />
                </div>
            </div>

            <div style={{
                marginTop: "60px",
                display: "flex",
                width: "100%"
            }}>
                {/* <button
                            type="submit"
                            style={{
                                marginLeft: "auto",
                                padding: "10px 30px",
                                backgroundColor: "#F73587",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            <p id="biggersmall">Next</p>
                        </button> */}
                <button
                    type="button"
                    style={{
                        marginLeft: "auto",
                        padding: "10px 30px",
                        backgroundColor: "#F73587",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setPage(2);
                    }}
                >
                    <p id="biggersmall">Next</p>
                </button>
            </div>
        </>
    )
}

export default Page1;
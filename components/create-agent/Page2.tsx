import { FieldErrors, UseFormRegister, UseFormReturn } from "react-hook-form";
import { AgentFormTypes, FormInput, FormSelect } from "./AgentForm";

const Page2 = ({
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
                        label="Agent Type"
                        field="agent_type"
                        subtext="Select what this agent do for you"
                        register={register as never}
                        errors={errors}
                    />
                </div>
                <div style={{
                    flex: 1
                }}>
                    <FormSelect
                        label="Tone"
                        field="tone"
                        subtext="Select the tone of your agent"
                        register={register}
                        errors={errors}
                        options={["Professional", "Casual"]}
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
                        label="Goal"
                        field="goal"
                        subtext="Tell your agent what is his/her goal"
                        register={register}
                        errors={errors}
                        options={["Support customers", "Provide information"]}
                    />
                </div>
                <div style={{
                    flex: 1
                }}>
                     <FormSelect
                        label="Select Blueprint Flow"
                        field="blueprint_flow"
                        subtext="Select what customized behavior or create one later."
                        register={register}
                        errors={errors}
                        options={["Omantel Agent 1", "Omantel Agent 2"]}
                    />
                </div>
            </div>

            <div style={{
                marginTop: "160px",
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
                        padding: "10px 30px",
                        backgroundColor: "#F73587",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setPage(1);
                    }}
                >
                    <p id="biggersmall">Back</p>
                </button>
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
                        setPage(3);
                    }}
                >
                    <p id="biggersmall">Next</p>
                </button>
            </div>
        </>
    )
}

export default Page2;
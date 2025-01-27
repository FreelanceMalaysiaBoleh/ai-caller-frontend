import { FieldErrors, FormProvider, useForm, UseFormRegister } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import Page1 from "./Page1";
import Page2 from "./Page2";
import { addFilefields, AddFileTypes } from "@/hooks/data-management/useAddFileModal";
import Page3 from "./Page3";
import { createNewAgent } from "@/services/AgentServices";
import { useRouter } from "next/router";

export interface AgentFormTypes {
    name: string;
    language: string;
    voice: string;
    phone_number: string;
    agent_type: string,
    tone: string,
    goal: string,
    blueprint_flow: string,
}

export type fields = "name" | "language" | "voice" | "phone_number" | "agent_type" | "tone" | "goal" | "blueprint_flow";

const AgentForm = ({ page, setPage }: { page: number, setPage: (index: number) => void }) => {

    const router = useRouter();

    const agentSchema = yup
        .object({
            name: yup.string().required(),
            language: yup.string().required(),
            voice: yup.string().required(),
            phone_number: yup.string().required(),
            agent_type: yup.string().required(),
            tone: yup.string().required(),
            goal: yup.string().required(),
            blueprint_flow: yup.string().required(),
        })

    const form = useForm({
        defaultValues: {
            name: "",
            language: "Auto",
            voice: "",
            phone_number: "",
            agent_type: "",
            tone: "",
            goal: "",
            blueprint_flow: "",
        } as AgentFormTypes,
        resolver: yupResolver(agentSchema)
    })


    const {
        handleSubmit,
        register,
        formState: { errors },
    } = form

    const handleSubmitForm = handleSubmit(async (values) => {
        const result = await createNewAgent(values);

        if (result.success) {
            window.alert("Agent created successfully")
            router.push("/")
            return;
        }

        window.alert(`Error: ${result.error}`)
        return;
    })


    return (
        <>
            <div >
                <FormProvider {...form}>
                    <form onSubmit={handleSubmitForm}>
                        <div style={{
                            display: page == 1 ? "block" : "none"
                        }}>
                            <Page1
                                form={form}
                                handleSubmitForm={handleSubmitForm}
                                register={register}
                                errors={errors}
                                setPage={setPage}
                            />
                        </div>
                        <div style={{
                            display: page == 2 ? "block" : "none"
                        }}>
                            <Page2
                                form={form}
                                handleSubmitForm={handleSubmitForm}
                                register={register}
                                errors={errors}
                                setPage={setPage}
                            />
                        </div>
                        <div style={{
                            display: page == 3 ? "block" : "none"
                        }}>
                            <Page3 errors={errors} />
                        </div>

                        {/* <button type="submit">Press me! </button> */}
                    </form>
                </FormProvider>
            </div>
        </>
    )
}

export type AllFields = fields | addFilefields;

export const FormInput = ({
    label,
    field,
    subtext,
    register,
    errors
}: {
    label: string,
    field: AllFields,
    subtext: string,
    register: UseFormRegister<keyof (AgentFormTypes | AddFileTypes)>,
    errors: FieldErrors<AgentFormTypes>
}) => {

    return (
        <div style={{ marginBottom: "20px" }}>
            <p id="medium">{label}</p>
            <p id="small">{subtext}</p>
            <input
                type="text"
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

            {errors[field as fields]?.message &&
                <p style={{ color: "red", margin: 0 }}>
                    {(errors[field as fields]?.message)?.replaceAll("_", " ")}
                </p>
            }
        </div>
    )
}

export const FormSelect = ({
    label,
    field,
    subtext,
    register,
    errors,
    options,
}: {
    label: string;
    field: fields;
    subtext: string;
    register: UseFormRegister<AgentFormTypes>;
    errors: FieldErrors<AgentFormTypes>;
    options: string[];
}) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <p id="medium">{label}</p>
            <p id="small">{subtext}</p>

            {/* Select Dropdown */}
            <select
                {...register(field)}
                style={{
                    marginTop: "10px",
                    height: "46px",
                    padding: "8px",
                    border: "1px solid #646464",
                    borderRadius: "5px",
                    backgroundColor: "#262626",
                    color: "white",
                    width: "100%",
                }}
            >
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            {/* Error Message */}
            {errors[field]?.message && (
                <p style={{ color: "red", margin: 0 }}>{errors[field]?.message}</p>
            )}
        </div>
    );
};

export default AgentForm;



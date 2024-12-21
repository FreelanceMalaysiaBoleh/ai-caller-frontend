import { FieldErrors, FormProvider, useForm, UseFormRegister } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import Page1 from "./Page1";
import Page2 from "./Page2";

export interface AgentFormTypes {
    name: string;
    language: string;
    voice: string;
    phoneno: string;
    type: string,
    tone: string,
    goal: string,
    blueprint: string,
}

export type fields = "name" | "language" | "voice" | "phoneno" | "type" | "tone" | "goal" | "blueprint";

const AgentForm = ({ page, setPage }: { page: number, setPage: (index: number) => void }) => {



    const agentSchema = yup
        .object({
            name: yup.string().required(),
            language: yup.string().required(),
            voice: yup.string().required(),
            phoneno: yup.string().required(),
            type: yup.string().required(),
            tone: yup.string().required(),
            goal: yup.string().required(),
            blueprint: yup.string().required(),
        })

    const form = useForm({
        defaultValues: {
            name: "",
            language: "Auto",
            voice: "",
            phoneno: "",
            type: "",
            tone: "",
            goal: "",
            blueprint: "",
        },
        resolver: yupResolver(agentSchema)
    })


    const {
        handleSubmit,
        register,
        formState: { errors },
    } = form

    const handleSubmitForm = handleSubmit((values) => {
        console.log("your values: ", values);
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


                    </form>
                </FormProvider>
            </div>
        </>
    )
}

export const FormInput = ({
    label,
    field,
    subtext,
    register,
    errors
}: {
    label: string,
    field: fields,
    subtext: string,
    register: UseFormRegister<AgentFormTypes>,
    errors: FieldErrors<AgentFormTypes>
}) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <p id="medium">{label}</p>
            <p id="small">{subtext}</p>
            <input
                type="text"
                {...register(field)}
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
            {errors[field]?.message && (
                <p style={{ color: "red", margin: 0 }}>{errors[field]?.message}</p>
            )}
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



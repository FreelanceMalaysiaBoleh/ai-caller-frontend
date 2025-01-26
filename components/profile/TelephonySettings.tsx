import { FormProvider, UseFormRegister } from "react-hook-form";
import useTelephoneForm, { TelephoningFormType } from "@/hooks/profile/useTelephoneForm";
import TelephonyCell from "./TelephonyCell";
import { FaPlus } from "react-icons/fa6";
import { BsExclamationCircleFill } from "react-icons/bs";

const TelephonySettings = () => {
  const {
    register,
    errors,
    form,
    fields,
    handleAddTelephone,
    handleRemoveTelephone,
    handleSubmitForm,
  } = useTelephoneForm();

  return (
    <>
      <div style={{ marginBottom: 65 }}></div>
      <h1>Telephony Settings</h1>
      <div style={{ marginBottom: "10px" }}></div>
      <p>Add phone numbers and connect external phone number.</p>

      <div style={{ marginBottom: "10px" }}></div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmitForm}>
          <div>
            {fields.map((field, index) => (
              <TelephonyCell
                key={field.id} // `field.id` is provided by `useFieldArray`
                index={index}
                register={register}
                errors={errors as TelephoneFieldErrors}
                handleRemoveTelephone={handleRemoveTelephone}
              />
            ))}

            <div style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}>
              <button
                type="button"
                onClick={handleAddTelephone}
                style={{
                  marginTop: "10px",
                  padding: "10px 15px",
                  backgroundColor: "#6E96E1",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10
                }}
              >
                <FaPlus size={20} />Add Phone
              </button>
            </div>


          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default TelephonySettings;

export type TelephoneFieldErrors = {
  telephones?: {
    [index: number]: {
      [field: string]: {
        message?: string;
      };
    };
  };
};


interface FormInputProps {
  label: string;
  field: string;
  placeholder: string;
  index: number;
  register: UseFormRegister<TelephoningFormType>;
  errors: TelephoneFieldErrors;
  password?: boolean;
  verified?: boolean;
  verifiedTag?: boolean;
}

type fieldTypes = "telephones" | `telephones.${number}` | `telephones.${number}.name` | `telephones.${number}.phoneNumber` | `telephones.${number}.domain` | `telephones.${number}.sipUsername` | `telephones.${number}.sipPassword` | `telephones.${number}.sipPort`; 

export const FormInput = ({
  label,
  field,
  placeholder,
  index,
  register,
  errors,
  password = false,
}: FormInputProps) => {
  const fieldName: fieldTypes = `telephones.${index}.${field}` as fieldTypes;

  return (
    <div style={{ width: "100%" }}>
      <p style={{ fontSize: "12px", color: "#B8B8B8", marginBottom: "5px" }}>{label}</p>
      <div
        style={{
          borderBottom: "1px solid #909090",
          paddingBottom: "5px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type={password ? "password" : "text"}
            {...register(fieldName)}
            style={{
              all: "unset",
              width: "70%",
              height: "auto",
              color: "white",
              fontSize: "14px",
            }}
            placeholder={placeholder}
          />

          <div style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}>
            <BsExclamationCircleFill size={15} color="#8f8f8f" />
          </div>

        </div>
        {errors?.telephones?.[index]?.[field]?.message && (
          <p style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>
            {errors.telephones[index][field].message as string}
          </p>
        )}
      </div>
    </div>
  );
};

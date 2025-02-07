import React, { Dispatch, SetStateAction, MouseEvent, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { FieldErrors, FormProvider, UseFormRegister } from "react-hook-form";
import useAddConnectionModal, { addConnectionfields, DatabaseConnectionType } from "@/hooks/data-management/useAddConnectionModal";
import { Switch } from "antd";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddConnectionModal = ({ open, setOpen }: ModalProps) => {
  const closeModal = () => setOpen(false);

  const { register, errors, form, handleSubmitForm, setValue, isLoading } = useAddConnectionModal();

  const [checked, setChecked] = useState(false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);

    setValue("is_cloud_db", checked);
    console.log("Switch state:", checked);
  };

  // Prevent closing the modal when clicking inside the content
  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // Reusable style objects
  const overlayStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    width: "650px",
    backgroundColor: "#3e3e3e",
    borderRadius: "10px",
    padding: 20
  };


  return (
    <div>
      {open && (
        <div onClick={closeModal} style={overlayStyle}>
          <div onClick={handleContentClick} style={modalStyle}>
            <div style={{
              display: 'flex',
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #909090",
              paddingBottom: "15px",
              width: "100%"
            }}>

              <div style={{
                flexGrow: 1
              }}>
                <div style={{
                  border: "2px solid #FFFFFF",
                  borderRadius: "5px",
                  backgroundColor: "#555555",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "3px",
                  height: "35px",
                  width: "35px",
                  cursor: "pointer"
                }}
                  onClick={() => {
                    closeModal()
                  }}
                >
                  <TbArrowBackUp size={100} color="#FFF" style={{ marginRight: "10px" }} />
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center', // Centers this item in the available space
                flexGrow: 1, // Allows this item to take the available space and center it
              }}>
                <h2 style={{ color: "#A7A7A7", fontSize: "18px", textAlign: "center" }}>New Connection</h2>
              </div>
              <div style={{
                flexGrow: 1,
              }}>

              </div>
            </div>

            <FormProvider {...form}>
              <form onSubmit={handleSubmitForm}>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px"
                }}>
                  <div style={{
                    flex: 1,
                    marginRight: "25px"
                  }}>
                    <FormInput
                      label="Connection name"
                      field="connection_name"
                      subtext='Name of the connection'
                      register={register as never}
                      errors={errors}
                    />
                  </div>
                  <div style={{
                    flex: 1
                  }}>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    style={{
                      backgroundColor: checked ? "#F73587" : "#A0A0A0",
                    }}
                  />
                  <p id="small" style={{ color: "#A5A5A5", marginLeft: "10px" }}>Is cloud db?</p>
                </div>
                {errors["is_cloud_db"]?.message &&
                  <p style={{ color: "red", margin: 0 }}>
                    {errors["is_cloud_db"]?.message}
                  </p>
                }

                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px"
                }}>
                  <div style={{
                    flex: 1,
                    marginRight: "25px"
                  }}>
                    <FormInput
                      label="Host"
                      field="host"
                      subtext='Add the host of the connection to connect to it'
                      register={register as never}
                      errors={errors}
                    />
                  </div>
                  <div style={{
                    flex: 1,
                  }}>
                    <FormInput
                      label="Port"
                      field="port"
                      subtext='Add the port of the connection to connect to it'
                      register={register as never}
                      errors={errors}
                    />
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px"
                }}>
                  <div style={{
                    flex: 1,
                  }}>
                    <FormInput
                      label="Database Name"
                      field="database_name"
                      subtext='The name of your database'
                      register={register as never}
                      errors={errors}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start", marginTop: "30px" }}>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      padding: "10px 30px",
                      backgroundColor: "#F73587",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <p id="biggersmall">Save & Connect</p>
                  </button>
                </div>F
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddConnectionModal;

export const FormInput = ({
  label,
  field,
  subtext,
  register,
  errors
}: {
  label: string,
  field: addConnectionfields,
  subtext: string,
  register: UseFormRegister<DatabaseConnectionType>,
  errors: FieldErrors<DatabaseConnectionType>
}) => {

  return (
    <div style={{ marginBottom: "20px" }}>
      <p id="medium">{label}</p>
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
      <p id="small" style={{ marginTop: 7, color: "#A5A5A5" }}>{subtext}</p>

      {errors[field]?.message &&
        <p style={{ color: "red", margin: 0 }}>
          {errors[field]?.message}
        </p>
      }
    </div>
  )
}
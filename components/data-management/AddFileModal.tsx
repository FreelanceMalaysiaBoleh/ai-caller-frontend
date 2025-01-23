import React, { Dispatch, SetStateAction, MouseEvent } from "react";
import { RiFileAddFill } from "react-icons/ri";
import { TbArrowBackUp } from "react-icons/tb";
import ImageUpload from "../create-agent/ImageUpload";
import { FieldErrors, FormProvider, UseFormRegister } from "react-hook-form";
import useAddFileModal, { addFilefields, AddFileTypes } from "@/hooks/data-management/useAddFileModal";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddFileModal = ({ open, setOpen }: ModalProps) => {
  const closeModal = () => setOpen(false);

  const { register, errors, form, handleSubmitForm } = useAddFileModal();

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
    width: "950px",
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
                <RiFileAddFill size={30} color="#FFF" style={{ marginRight: "10px" }} />
                <h2 style={{ color: "#A7A7A7", fontSize: "18px", textAlign: "center" }}>Upload file and fill the details</h2>
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
                      label="File Description"
                      field="file_desc"
                      subtext='A short description of the file content (e.g., "Product Catalog for Q1 2024").'
                      register={register as never}
                      errors={errors}
                    />
                  </div>
                  <div style={{
                    flex: 1
                  }}>
                    <FormInput
                      label="Topic"
                      field="topic"
                      subtext='Example topics: "Product Information," "Sales Reports," "Training Materials," etc. This allows categorization for better search and retrieval.'
                      register={register as never}
                      errors={errors}
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
                    <FormInput
                      label="Tags"
                      field="tags"
                      subtext='Keywords or labels for additional categorization (e.g., "Inventory, Sales, Products").'
                      register={register as never}
                      errors={errors}
                    />
                  </div>
                  <div style={{
                    flex: 1
                  }}>
                    <ImageUpload styleType={2} customLabel="No file uploaded yet" />
                  </div>
                </div>
              </form>
            </FormProvider>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 30px",
                  backgroundColor: "#F73587",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <p id="biggersmall">Save</p>
              </button>

              <p id="biggersmall" style={{ marginLeft: 15, color: "#A5A5A5" }}>File is ready to deploy</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFileModal;

export const FormInput = ({
  label,
  field,
  subtext,
  register,
  errors
}: {
  label: string,
  field: addFilefields,
  subtext: string,
  register: UseFormRegister<AddFileTypes>,
  errors: FieldErrors<AddFileTypes>
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
import React, { Dispatch, SetStateAction, MouseEvent, useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { FieldErrors, FormProvider, UseFormRegister } from "react-hook-form";
import useAddItemModal, { ItemType } from "@/hooks/data-management/useAddItemModal";
import { FaTrash } from "react-icons/fa";


interface ModalProps {
    open: boolean;
    databaseId: string | null;
    item?: Record<string, unknown>;
    collectionName: string | null;
    setOpen: Dispatch<SetStateAction<boolean>>;
    refreshData: () => void
}

const AddItemModal = ({ open, setOpen, databaseId, collectionName, item, refreshData }: ModalProps) => {
    const closeModal = () => setOpen(false);

    const [dbid, setDbid] = useState<string | null>(null);
    const [colName, setColName] = useState<string | null>(null);
    const [itemObj, setItemObj] = useState<Record<string, unknown> | undefined>(item);

    useEffect(() => {
        setDbid(databaseId);
        setColName(collectionName);
        setItemObj(item);
    }, [databaseId, collectionName, item])

    const { register, errors, fields, append, remove, form, handleSubmitForm } = useAddItemModal(dbid, colName, itemObj, refreshData, closeModal);

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
        width: "480px",
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
                                justifyContent: 'center',
                                flexGrow: 1,
                            }}>
                                <h2 style={{ color: "#A7A7A7", fontSize: "18px", textAlign: "center" }}>{itemObj ? "Update" : "New"} Item - {collectionName}</h2>
                            </div>
                            <div style={{
                                flexGrow: 1,
                            }}>

                            </div>
                        </div>

                        <FormProvider {...form}>
                            <form onSubmit={handleSubmitForm}>
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "100%",
                                            gap: "10px",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <FormInput
                                            label="Key"
                                            index={index}
                                            field={`key`}
                                            register={register as never}
                                            errors={errors}
                                        />
                                        <FormInput
                                            label="Value"
                                            index={index}
                                            field={`value`}
                                            register={register as never}
                                            errors={errors}
                                        />

                                        <FaTrash size={40} color="white" onClick={() => remove(index)} />
                                    </div>
                                ))}

                                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                    <button
                                        type="button"
                                        onClick={() => append({ key: "", value: "" })}
                                        style={{
                                            padding: "10px 30px",
                                            backgroundColor: "#797979",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <p id="biggersmall">+ Add Field</p>
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
                                        }}
                                    >
                                        <p id="biggersmall">Save</p>
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddItemModal;

type formFieldType = "fields" | `fields.${number}` | `fields.${number}.key` | `fields.${number}.value`

export const FormInput = ({
    label,
    index,
    field,
    register,
    errors,
}: {
    label: string;
    index: number;
    field: keyof ItemType["fields"][number];
    register: UseFormRegister<ItemType>,
    errors: FieldErrors<ItemType>
}) => {

    const formField = `fields.${index}.${field}` as formFieldType
    return (
        <div style={{ marginBottom: "20px", width: "100%" }}>
            <p id="medium">{label}</p>
            <input
                type="text"
                {...register(formField)}
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
            {errors?.fields?.[index]?.[field]?.message && (
                <p style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>
                    {errors.fields[index][field].message as string}
                </p>
            )}
        </div>
    );
};
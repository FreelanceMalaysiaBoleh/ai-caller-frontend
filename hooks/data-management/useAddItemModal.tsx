import { useGetToken } from '@/services/AuthServices';
import { createNewItem, updateItem } from '@/services/DatabaseServices';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from "yup";

export interface ItemType {
    fields: {
        key: string,
        value: unknown
    }[]
}

function convertArrayToObject(items: ItemType["fields"]): Record<string, unknown> {
    return items.reduce((acc, { key, value }) => {
        acc[key] = value; // Assign key-value pair to object
        return acc;
    }, {} as Record<string, unknown>);
}

function convertObjectToArray(obj: Record<string, unknown>): ItemType["fields"] {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
}

const useAddItemModal = (databaseId: string | null, collection_name: string | null, item: Record<string, unknown> | undefined) => {

    const [isLoading, setIsLoading] = useState(false);
    const token = useGetToken();

    const documentSchema = yup
        .object({
            fields: yup.array(yup.object({
                key: yup.string().required("Please enter a key"),
                value: yup.mixed().required("Please enter a value")
            })),
        })

    const form = useForm({
        defaultValues: {
            fields: [{ key: "", value: "" }],
        },
        resolver: yupResolver(documentSchema)
    })

    const {
        handleSubmit,
        register,
        setValue,
        control,
        formState: { errors },
    } = form




    useEffect(() => {
        if (item) {
            setValue("fields", convertObjectToArray(item) as { key: string, value: string }[])
        } else {
            setValue("fields", [{ key: "", value: "" }])
        }
    }, [item])



    const { fields, append, remove } = useFieldArray({ control, name: "fields" });

    const handleSubmitForm = handleSubmit(async (values) => {

        if ((values.fields || []).length < 1) {
            window.alert("Please provide at least 1 key and value");
            return
        }

        const dataObject = convertArrayToObject(values.fields || []);

        setIsLoading(true);

        if (!databaseId) {
            setIsLoading(false);
            window.alert("Database Id not provied");
            return
        }

        let results: { success: boolean; data?: any; error?: string } = { success: false, error: "" }

        if (item) {
            console.log(dataObject, (item as { _id: string })._id, collection_name)
            results = await updateItem(dataObject, databaseId!, collection_name || "", (item as { _id: string })._id, token);
        } else {
            results = await createNewItem(dataObject, databaseId!, collection_name || "", token);
        }


        if (results.success) {
            window.alert(`Item ${item ? "updated" : "added"} successfully`)
            setIsLoading(false);
            window.location.reload();
            return
        }

        setIsLoading(false);
        window.alert(results.error)
    })


    return { register, errors, form, handleSubmitForm, setValue, isLoading, fields, append, remove };
};

export default useAddItemModal;
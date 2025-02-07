import { createNewCollection, createNewConnection } from '@/services/DatabaseServices';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

export interface CollectionType {
  collection_name: string;
}

export type addCollectionField = "collection_name";

const useAddCollectionModal = (databaseId: string | null) => {

  const [isLoading, setIsLoading] = useState(false);

  const documentSchema = yup
    .object({
      collection_name: yup.string().required(),
    })

  const form = useForm({
    defaultValues: {
      collection_name: "",
    },
    resolver: yupResolver(documentSchema)
  })

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = form

  const handleSubmitForm = handleSubmit(async (values) => {
    setIsLoading(true);

    if (!databaseId) {
      setIsLoading(false);
      window.alert("Database Id not provied");
      return
    }

    const results = await createNewCollection(databaseId!, values);

    if (results.success) {
      window.alert("Collection added successfully")
      setIsLoading(false);
      window.location.reload();
      return
    }

    setIsLoading(false);
    window.alert(results.error)
  })


  return { register, errors, form, handleSubmitForm, setValue, isLoading };
};

export default useAddCollectionModal;
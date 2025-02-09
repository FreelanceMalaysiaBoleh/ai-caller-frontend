import { useGetToken } from '@/services/AuthServices';
import { createFile } from '@/services/FileServices';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

export interface AddFileTypes {
  file_desc: string,
  topic: string,
  tags: string,
}


export type addFilefields = "file_desc" | "topic" | "tags";

const useAddFileModal = (file?: File) => {

  const [isLoading, setIsloading] = useState(false);
  const token = useGetToken();
  const documentSchema = yup
    .object({
      file_desc: yup.string().required(),
      topic: yup.string().required(),
      tags: yup.string().required(),
    })

  const form = useForm({
    defaultValues: {
      file_desc: "",
      topic: "",
      tags: "",
    },
    resolver: yupResolver(documentSchema)
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form

  const handleSubmitForm = handleSubmit(async (values) => {
    setIsloading(true);
    if (!file) {
      window.alert("Please upload a file");
      setIsloading(false);
      return
    }

    const results = await createFile({ ...values, file: file }, token);

    if (results.success) {
      window.alert("File created successfully")
      setIsloading(false);
      window.location.reload();
      return
    }

    setIsloading(false);
    window.alert(results.error)
  })


  return { register, errors, form, handleSubmitForm, isLoading };
};

export default useAddFileModal;
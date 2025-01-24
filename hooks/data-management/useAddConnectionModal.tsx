import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

export interface AddFileTypes {
  file_desc: string,
  topic: string,
  tags: string,
  file_url: string,
}


export type addFilefields = "file_desc" | "topic" | "tags" | "file_url";

const useAddConnectionModal = () => {

  const documentSchema = yup
    .object({
      file_desc: yup.string().required(),
      topic: yup.string().required(),
      tags: yup.string().required(),
      file_url: yup.string().required(),
    })

  const form = useForm({
    defaultValues: {
      file_desc: "",
      topic: "",
      tags: "",
      file_url: "",
    },
    resolver: yupResolver(documentSchema)
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form

  const handleSubmitForm = handleSubmit((values) => {
    console.log("your values: ", values);
  })


  return { register, errors, form, handleSubmitForm };
};

export default useAddConnectionModal;
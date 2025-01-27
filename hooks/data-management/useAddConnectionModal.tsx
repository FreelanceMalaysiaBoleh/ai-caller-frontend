import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

export interface DatabaseConnectionType {
  connection_name: string;
  database_type: "mongodb";
  is_cloud_db: boolean;
  host?: string;
  port?: number;
  database_name?: string;
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
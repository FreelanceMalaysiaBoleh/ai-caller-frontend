import { useGetToken } from '@/services/AuthServices';
import { createNewConnection } from '@/services/DatabaseServices';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

export interface DatabaseConnectionType {
  connection_name: string;
  database_type: string;
  is_cloud_db: boolean;
  host: string;
  port: number;
  database_name: string;
}

export type addConnectionfields = "connection_name" | "database_type" | "is_cloud_db" | "host" | "port" | "database_name";

const useAddConnectionModal = () => {

  const [isLoading, setIsLoading] = useState(false);
  const token = useGetToken();

  const documentSchema = yup
    .object({
      connection_name: yup.string().required(),
      database_type: yup.string().required(),
      is_cloud_db: yup.boolean().required(),
      host: yup.string().required(),
      port: yup.number().required(),
      database_name: yup.string().required(),
    })

  const form = useForm({
    defaultValues: {
      connection_name: "",
      database_type: "mongodb",
      is_cloud_db: false,
      host: "",
      port: undefined,
      database_name: "",
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

    const results = await createNewConnection(values, token);

    if (results.success) {
      window.alert("Connection created successfully")
      setIsLoading(false);
      window.location.reload();
      return
    }

    setIsLoading(false);
    window.alert(results.error)
  })


  return { register, errors, form, handleSubmitForm, setValue, isLoading };
};

export default useAddConnectionModal;
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

export interface ProfileDetailsFormType {
  name: string,
  password: string,
  phoneno: string,
  email: string,
  company_name: string
}


export type profileDetailsFields = "name" | "password" | "phoneno" | "email" | "company_name";

const useProfileForm = () => {

  const documentSchema = yup
    .object({
      name: yup.string().required(),
      password: yup.string(),
      phoneno: yup.string().required(),
      email: yup.string().required(),
      company_name: yup.string().required(),
    })

  const form = useForm({
    defaultValues: {
      name: "",
      password: "",
      phoneno: "",
      email: "",
      company_name: "",
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

export default useProfileForm;
import { createUserSettings, getUserSettings, updateUserSettings } from '@/services/SettingServives';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

export interface ProfileDetailsFormType {
  mobile_number: string,
  send_port: string,
  receive_port: string

  user_id?: string,
  created_at?: string, 
  updated_at?: string
}


export type profileDetailsFields = "mobile_number" | "send_port" | "receive_port";

const useProfileForm = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const documentSchema = yup.object({
    mobile_number: yup.string().required(),
    send_port: yup.string().required(),
    receive_port: yup.string().required()
  });

  const form = useForm({
    defaultValues: {
      mobile_number: "",
      send_port: "",
      receive_port: "",
    },
    resolver: yupResolver(documentSchema),
  });

  const { handleSubmit, register, reset, formState: { errors }, } = form;

  useEffect(() => {
    const fetchUserSettings = async () => {
      const response = await getUserSettings();

      if (response.success && response.data) {
        console.log(response.data)
        reset(response.data);
        setEdit(true);
      }
    };

    fetchUserSettings();
  }, [reset]);

  const handleSubmitForm = handleSubmit(async (values) => {
    setIsLoading(true);

    let results: { success: boolean; data?: any; error?: string } = { success: false }

    if (edit) {
      results = await updateUserSettings(values);
    } else {
      results = await createUserSettings(values);
    }


    if (results.success) {
      window.alert(`User settings ${edit ? "updated" : "set"} successfully`)
      setIsLoading(false);
      window.location.reload();
      return
    }

    setIsLoading(false);
    window.alert(results.error)
  })

  return { register, errors, form, handleSubmitForm };
};

export default useProfileForm;
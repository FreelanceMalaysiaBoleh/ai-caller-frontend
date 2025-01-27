import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export interface TelephoneType {
  name: string;
  phoneNumber: string;
  domain: string;
  sipUsername: string;
  sipPassword: string;
  sipPort: string;
}

export interface TelephoningFormType {
  telephones: TelephoneType[];
}

const useTelephoneForm = () => {
  const documentSchema = yup.object({
    telephones: yup.array(
      yup.object({
        name: yup.string().required("Telephone name is required"),
        phoneNumber: yup.string().required("Phone number is required"),
        domain: yup.string().required("Domain is required"),
        sipUsername: yup.string().required("SIP username is required"),
        sipPassword: yup.string().required("SIP password is required"),
        sipPort: yup.string().required("SIP port is required"),
      })
    )
      .required("At least one telephone is required")
      .min(1, "At least one telephone is required"),
  });

  const form = useForm<TelephoningFormType>({
    defaultValues: {
      telephones: [
        {
          name: "",
          phoneNumber: "",
          domain: "",
          sipUsername: "",
          sipPassword: "",
          sipPort: "",
        },
      ],
    },
    resolver: yupResolver(documentSchema),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "telephones",
  });

  const handleAddTelephone = () => {
    append({
      name: "",
      phoneNumber: "",
      domain: "",
      sipUsername: "",
      sipPassword: "",
      sipPort: "",
    });
  };

  const handleRemoveTelephone = (index: number) => {
    remove(index);
  };

  const handleSubmitForm = handleSubmit((values) => {
    console.log("Submitted values: ", values);
  });

  return {
    register,
    errors,
    form,
    fields,
    handleAddTelephone,
    handleRemoveTelephone,
    handleSubmitForm,
  };
};

export default useTelephoneForm;
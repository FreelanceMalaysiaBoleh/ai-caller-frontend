import { UseFormRegister } from "react-hook-form";
import { FormInput, TelephoneFieldErrors } from "./TelephonySettings";
import { BsFloppy } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { TelephoningFormType } from "@/hooks/profile/useTelephoneForm";


const TelephonyCell = ({
  register,
  errors,
  index,
  handleRemoveTelephone
}: {
  index: number,
  handleRemoveTelephone: (index: number) => void;
  register: UseFormRegister<TelephoningFormType>,
  errors: TelephoneFieldErrors;
}) => {

  return (
    <div style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#3E3E3E",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      padding: "15px 25px",
      marginBottom: "25px"
    }}>

      <div style={{ width: "100%" }}>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "35%", marginRight: 40 }}>
            <h2 style={{ fontSize: "16px", marginBottom: "20px" }}>Basic Details:</h2>
            <FormInput
              label={"Display Name"}
              index={index}
              placeholder="name"
              field={"name"}
              register={register as never}
              errors={errors}
            />
            <div style={{ marginBottom: "15px" }}></div>
            <FormInput
              label={"Phone Number"}
              index={index}
              placeholder="+018 777 8148"
              field={"phoneNumber"}
              register={register as never}
              errors={errors}
            />
            <div style={{ marginBottom: "40px" }}></div>

            <h2 style={{ fontSize: "16px", marginBottom: "20px" }}>Connection States: <span style={{ color: "#25BB00" }}>Connected</span></h2>
          </div>

          <div style={{ width: "55%", marginRight: 10 }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "16px", marginRight: "auto" }}>SIP Configuration:</h2>
              <BsFloppy size={20} color="white" />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <FormInput
                label={"Server Domain"}
                index={index}
                placeholder="sip.domain.com/192.168.1.10"
                field={"domain"}
                register={register as never}
                errors={errors}
              />
              <div style={{ marginLeft: "20px" }}></div>
              <FormInput
                label={"SIP Username"}
                index={index}
                placeholder="user123"
                field={"sipUsername"}
                register={register as never}
                errors={errors}
              />
            </div>

            <div style={{ marginBottom: "15px" }}></div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <FormInput
                label={"SIP Password"}
                placeholder="name"
                index={index}
                password={true}
                field={"sipPassword"}
                register={register as never}
                errors={errors}
              />
              <div style={{ marginLeft: "20px" }}></div>
              <FormInput
                label={"SIP Port"}
                index={index}
                placeholder="Default: 5060"
                field={"sipPort"}
                register={register as never}
                errors={errors}
              />
            </div>
            <div style={{ marginBottom: "40px" }}></div>
          </div>

          <div style={{ cursor: "pointer", height: 25 }}>
            <FaTrash size={20} color="white" onClick={() => { handleRemoveTelephone(index) }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TelephonyCell;
import { FieldErrors } from "react-hook-form";
import { AgentFormTypes } from "./AgentForm";

const getErrorMessage = (errors: FieldErrors<AgentFormTypes>): string => {
  const errorFields = Object.keys(errors);

  if (errorFields.length > 0) {
    const fieldList = errorFields.join(", ");
    return `${fieldList} ${errorFields.length > 1 ? "are" : "is"} required. Please go back and fill in those fields.`.replaceAll("_", " ");
  }

  return "";
};

const Page3 = ({ errors }: {
  errors: FieldErrors<AgentFormTypes>
}) => {

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "350px", padding: "100px 0px 0px 0px" }}>
      {
        errors && Object.keys(errors).length > 0
          ?
          <div>
            <h2 style={{ fontSize: "30px" }}>Information incomplete, please go back to fill in the required fields</h2>
            <p style={{fontSize: "25px", marginTop: "10px"}}>{getErrorMessage(errors)}</p>
          </div>
          :
          <h2 style={{ fontSize: "30px" }}>Please make sure all required fields are provided. Click on &quot;Complete&quot; to create your new AI agent</h2>
      }

      <div style={{
        marginTop: "auto",
        display: "flex",
        width: "100%"
      }}>
        <button
          type="submit"
          style={{
            marginLeft: "auto",
            padding: "10px 30px",
            backgroundColor: "#F73587",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <p id="biggersmall">Complete</p>
        </button>
      </div>
    </div>
  )
}

export default Page3;
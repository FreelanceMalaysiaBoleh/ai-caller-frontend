import { FileData } from "@/hooks/data-management/useGetAllFiles";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineEdit } from "react-icons/ai";


const DataTable = ({ files, checkedFiles, setCheckFiles }: { files: FileData[], checkedFiles: string[], setCheckFiles: Dispatch<SetStateAction<string[]>> }) => {

  const handleCheckboxChange = (key: string) => {
    setCheckFiles((prev) =>
      prev.includes(key) ? prev.filter((row) => row !== key) : [...prev, key]
    )
  };

  return (
    <table
      style={{
        width: "100%",
        background: "#3e3e3e",
        borderCollapse: "collapse",
        color: "#ffffff",
      }}
    >
      <thead>
        <tr style={{ borderBottom: "1px solid #C2C2C2" }}>
          <th
            style={{
              textAlign: "left",
              padding: "8px",
              background: "#3e3e3e",
              borderBottom: "none",
              width: "5%",
            }}
          >
          </th>
          <th
            style={{
              textAlign: "left",
              padding: "8px",
              background: "#3e3e3e",
              borderBottom: "none",
              width: "20%",
            }}
          >
            <h2 style={{ margin: 0 }}>File Name</h2>
          </th>
          <th
            style={{
              textAlign: "left",
              padding: "8px",
              background: "#3e3e3e",
              borderBottom: "none",
              width: "20%",
            }}
          >
            <h2 style={{ margin: 0 }}>Content Description</h2>
          </th>
          <th
            style={{
              textAlign: "left",
              padding: "8px",
              background: "#3e3e3e",
              borderBottom: "none",
              width: "20%",
            }}
          >
            <h2 style={{ margin: 0 }}>Keywords or Labels</h2>
          </th>
          <th
            style={{
              textAlign: "left",
              padding: "8px",
              background: "#3e3e3e",
              borderBottom: "none",
              width: "10%",
            }}
          >
            <h2 style={{ margin: 0 }}>Topic</h2>
          </th>
          <th
            style={{
              textAlign: "center",
              padding: "8px",
              background: "#3e3e3e",
              width: "10%",
            }}
          >
            <h2 style={{ margin: 0 }}>States</h2>
          </th>
          <th
            style={{

              padding: "8px",
              background: "#3e3e3e",
              borderBottom: "none",
              width: "5%",
            }}
          >
          </th>
        </tr>
      </thead>
      {/* Table Body */}
      <tbody>
        {files.map((data) => (
          <tr key={data._id} style={{ borderBottom: "1px solid #C2C2C2" }}>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
              }}
            >
              <input
                type="checkbox"
                checked={checkedFiles.includes(data._id)}
                onChange={() => handleCheckboxChange(data._id)}
              />
            </td>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
              }}
            >
              <p style={{ margin: 0, fontSize: "16px" }}>{data.file_name}</p>
            </td>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
              }}
            >
              <p style={{ margin: 0, fontSize: "16px" }}>{data.file_path}</p>
            </td>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
              }}
            >
              <p style={{ margin: 0, fontSize: "16px" }}>{data.keywords.join(", ").replaceAll("[", "").replaceAll("]", "").replaceAll('"', "")}</p>
            </td>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
              }}
            >
              <p style={{ margin: 0, fontSize: "16px" }}>{data.topic}</p>
            </td>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: "limegreen",
                  borderRadius: "50%",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></div>
            </td>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
              }}
            >
              <AiOutlineEdit size={20} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
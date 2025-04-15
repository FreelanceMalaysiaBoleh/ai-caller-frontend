import { FileData } from "@/hooks/data-management/useGetAllFiles";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineEdit } from "react-icons/ai";


const MobileDataTable = ({ files, checkedFiles, setCheckFiles }: { files: FileData[], checkedFiles: string[], setCheckFiles: Dispatch<SetStateAction<string[]>> }) => {

  const handleCheckboxChange = (key: string) => {
    setCheckFiles((prev) =>
      prev.includes(key) ? prev.filter((row) => row !== key) : [...prev, key]
    )
  };

  return (
    <table
      style={{
        borderCollapse: "collapse",
        backgroundColor: "transparent",
        width: "100%"
      }}
    >
      {/* Table Body */}
      <tbody style={{
        backgroundColor: "transparent"
      }}>
        {files.map((data) => (
          <tr key={data._id} style={{ borderBottom: "1px solid #C2C2C2", backgroundColor: "transparent" }}>
            <td
              style={{
                padding: "8px",
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
                borderBottom: "none",
              }}
            >
              <p style={{ margin: 0, fontSize: "12px" }}>{data.file_name}</p>
            </td>
        
            <td
              style={{
                padding: "8px",
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
                borderBottom: "none",
              }}
            >
              <AiOutlineEdit size={20} color={"white"} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MobileDataTable;
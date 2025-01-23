import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";


const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const dataSource = [
    {
      key: 1,
      fileName: "Sample File 1",
      contentDescription: "Description 1",
      keywords: "Keyword1, Keyword2",
      topic: "Topic A",
      state: "Draft",
    },
    {
      key: 2,
      fileName: "Sample File 2",
      contentDescription: "Description 2",
      keywords: "Keyword3, Keyword4",
      topic: "Topic B",
      state: "Published",
    },
  ];

  const handleCheckboxChange = (key: number) => {
    setSelectedRows((prev) =>
      prev.includes(key) ? prev.filter((row) => row !== key) : [...prev, key]
    );
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
        {dataSource.map((data) => (
          <tr key={data.key} style={{ borderBottom: "1px solid #C2C2C2" }}>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
              }}
            >
              <input
                type="checkbox"
                checked={selectedRows.includes(data.key)}
                onChange={() => handleCheckboxChange(data.key)}
              />
            </td>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
              }}
            >
              <p style={{ margin: 0, fontSize: "16px" }}>{data.fileName}</p>
            </td>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
              }}
            >
              <p style={{ margin: 0, fontSize: "16px" }}>{data.contentDescription}</p>
            </td>
            <td
              style={{
                padding: "8px",
                background: "#3e3e3e",
                borderBottom: "none",
              }}
            >
              <p style={{ margin: 0, fontSize: "16px" }}>{data.keywords}</p>
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
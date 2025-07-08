import { useRef } from "react";
import ReactDOM from "react-dom";
import NodeDropdown from "../NodeDropdown";

type DatabaseConnection = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
};

type AuthenticatorData = {
  database: {
    type: string;
    connection: DatabaseConnection;
    table: string;
    verification_fields: { [key: string]: string };
  };
  verification_fields: string[];
};

const databaseTypeOptions = [
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'mongodb', label: 'MongoDB' },
];

const DatabaseConfigModal = ({
  onClose,
  authData,
  onDatabaseTypeChange,
  onConnectionFieldChange,
  onTableChange,
}: {
  onClose: () => void;
  authData: AuthenticatorData;
  onDatabaseTypeChange: (value: string) => void;
  onConnectionFieldChange: (field: keyof DatabaseConnection, value: string | number) => void;
  onTableChange: (value: string) => void;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          width: "400px",
          maxHeight: "80%",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "18px", margin: 0, color: "black" }}>Database Configuration</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              color: "black",
            }}
          >
            ✖
          </button>
        </div>

        {/* Database Type */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: 'black', display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            Database Type
          </label>
          <NodeDropdown
            value={authData.database.type}
            placeholder="Select Database Type"
            options={databaseTypeOptions}
            onSelect={onDatabaseTypeChange}
          />
        </div>

        {/* Host */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Host"
            value={authData.database.connection.host}
            onChange={(e) => onConnectionFieldChange('host', e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #ddd",
              color: "black"
            }}
          />
        </div>

        {/* Port */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="number"
            placeholder="Port"
            value={authData.database.connection.port}
            onChange={(e) => onConnectionFieldChange('port', parseInt(e.target.value) || 0)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #ddd",
              color: "black"
            }}
          />
        </div>

        {/* Database Name */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Database Name"
            value={authData.database.connection.database}
            onChange={(e) => onConnectionFieldChange('database', e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #ddd",
              color: "black"
            }}
          />
        </div>

        {/* Username */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Username"
            value={authData.database.connection.username}
            onChange={(e) => onConnectionFieldChange('username', e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #ddd",
              color: "black"
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Password"
            value={authData.database.connection.password}
            onChange={(e) => onConnectionFieldChange('password', e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #ddd",
              color: "black"
            }}
          />
        </div>

        {/* Table Name */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Table Name"
            value={authData.database.table}
            onChange={(e) => onTableChange(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #ddd",
              color: "black"
            }}
          />
        </div>

        {/* Modal Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#007C34',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Save
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              backgroundColor: 'white',
              color: 'black',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default DatabaseConfigModal;
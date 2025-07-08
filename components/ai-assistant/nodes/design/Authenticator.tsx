import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeHead from '../NodeHead';
import DatabaseConfigModal from '../DatabaseConfigModal';

type VerificationField = {
  key: string;
  value: string;
};

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

//key: .authenticator
const AuthenticatorNode: React.FC<NodeProps> = ({ id, data, type }) => {
  const [isConnectedSource, setIsConnectedSource] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  
  // Initialize state from existing data or defaults
  const initializeData = (): AuthenticatorData => {
    if (data.database) {
      return data as AuthenticatorData;
    }
    return {
      database: {
        type: '',
        connection: {
          host: '',
          port: 3306,
          database: '',
          username: '',
          password: ''
        },
        table: '',
        verification_fields: {}
      },
      verification_fields: []
    };
  };

  const [authData, setAuthData] = useState<AuthenticatorData>(initializeData());
  
  // Dynamic fields for verification
  const initializeFields = (): VerificationField[] => {
    if (data.database?.verification_fields) {
      return Object.entries(data.database.verification_fields).map(([key, value]) => ({
        key,
        value: value as string
      }));
    }
    return [{ key: '', value: '' }];
  };

  const [verificationFields, setVerificationFields] = useState<VerificationField[]>(initializeFields());

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleConnectSource = useCallback(
    (params: Connection) => {
      if (params.source === id || params.target === id) {
        setIsConnectedSource(true);
      }
    },
    [id]
  );

  // Handle modal form changes
  const handleDatabaseTypeChange = (value: string) => {
    const updatedData = {
      ...authData,
      database: {
        ...authData.database,
        type: value
      }
    };
    setAuthData(updatedData);
    Object.assign(data, updatedData);
  };

  const handleConnectionFieldChange = (field: keyof DatabaseConnection, value: string | number) => {
    const updatedData = {
      ...authData,
      database: {
        ...authData.database,
        connection: {
          ...authData.database.connection,
          [field]: value
        }
      }
    };
    setAuthData(updatedData);
    Object.assign(data, updatedData);
  };

  const handleTableChange = (value: string) => {
    const updatedData = {
      ...authData,
      database: {
        ...authData.database,
        table: value
      }
    };
    setAuthData(updatedData);
    Object.assign(data, updatedData);
  };

  // Handle dynamic verification fields
  const handleAddVerificationField = () => {
    setVerificationFields([...verificationFields, { key: '', value: '' }]);
  };

  const handleVerificationFieldChange = (index: number, field: keyof VerificationField, value: string) => {
    const updatedFields = verificationFields.map((fieldItem, idx) =>
      idx === index ? { ...fieldItem, [field]: value } : fieldItem
    );
    setVerificationFields(updatedFields);

    // Update the data object
    const verificationFieldsObj: { [key: string]: string } = {};
    const verificationFieldsArray: string[] = [];

    updatedFields.forEach(field => {
      if (field.key && field.value) {
        verificationFieldsObj[field.key] = field.value;
        verificationFieldsArray.push(field.key);
      }
    });

    const updatedData = {
      ...authData,
      database: {
        ...authData.database,
        verification_fields: verificationFieldsObj
      },
      verification_fields: verificationFieldsArray
    };

    setAuthData(updatedData);
    Object.assign(data, updatedData);
  };

  const handleRemoveVerificationField = (index: number) => {
    const updatedFields = verificationFields.filter((_, idx) => idx !== index);
    setVerificationFields(updatedFields);

    // Update the data object
    const verificationFieldsObj: { [key: string]: string } = {};
    const verificationFieldsArray: string[] = [];

    updatedFields.forEach(field => {
      if (field.key && field.value) {
        verificationFieldsObj[field.key] = field.value;
        verificationFieldsArray.push(field.key);
      }
    });

    const updatedData = {
      ...authData,
      database: {
        ...authData.database,
        verification_fields: verificationFieldsObj
      },
      verification_fields: verificationFieldsArray
    };

    setAuthData(updatedData);
    Object.assign(data, updatedData);
  };

  const getDisplayText = () => {
    if (authData.database.type && authData.database.table) {
      return `${authData.database.type} - ${authData.database.table}`;
    }
    if (authData.database.type) {
      return authData.database.type;
    }
    return "Not configured";
  };

  return (
    <div
      style={{
        borderRadius: '10px',
        width: "320px",
        paddingBottom: "15px",
        backgroundColor: '#5B5B5B',
        boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
        position: 'relative',
      }}
    >
      <NodeHead id={id} title={'Authenticator'} nodeType={type} color='#FF6B35' />
      
      <div style={{
        paddingTop: 10,
        paddingLeft: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
      }}>
        <TargetConnector isConnected={data.isConnectedTarget} />
        <div style={{ marginRight: "auto", marginLeft: 20, width: "90%" }}>
          
          {/* Database Configuration Display */}
          <div style={{ marginBottom: 15 }}>
            <p style={{ fontSize: "14px", marginBottom: 5 }}>Database Config:</p>
            <p style={{ fontSize: "12px", color: "#CCCCCC" }}>{getDisplayText()}</p>
          </div>

          {/* Configure Database Button */}
          <button
            type="button"
            style={{
              marginBottom: "15px",
              padding: "8px 20px",
              border: "1px solid white",
              backgroundColor: "#5B5B5B",
              borderRadius: "5px",
              cursor: "pointer",
              color: "white"
            }}
            onClick={() => setOpenModal(true)}
          >
            Configure Database
          </button>

          {/* Dynamic Verification Fields */}
          <div>
            <p style={{ fontSize: "14px", marginBottom: 10 }}>Verification Fields:</p>
            {verificationFields.map((field, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  gap: "5px",
                  alignItems: 'center'
                }}
              >
                <input
                  type="text"
                  placeholder="Key"
                  value={field.key}
                  onChange={(e) => handleVerificationFieldChange(index, 'key', e.target.value)}
                  style={{
                    width: "40%",
                    padding: '5px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#2B2B2B',
                    color: 'white',
                    fontSize: '12px'
                  }}
                />

                <input
                  type="text"
                  placeholder="Value"
                  value={field.value}
                  onChange={(e) => handleVerificationFieldChange(index, 'value', e.target.value)}
                  style={{
                    width: "40%",
                    padding: '5px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#2B2B2B',
                    color: 'white',
                    fontSize: '12px'
                  }}
                />

                {verificationFields.length > 1 && (
                  <button
                    onClick={() => handleRemoveVerificationField(index)}
                    style={{
                      padding: '5px 8px',
                      borderRadius: '5px',
                      border: 'none',
                      backgroundColor: '#FF4D4D',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={handleAddVerificationField}
              style={{
                padding: '5px 10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#007C34',
                color: 'white',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Add Field
            </button>
          </div>
        </div>
        
        <SourceConnector isConnected={data.isConnectedSource || isConnectedSource} />
      </div>

      {/* Handles */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: "60%" }}
        onConnect={handleConnectSource}
      />

      <Handle
        type="target"
        style={{ top: "60%" }}
        position={Position.Left}
      />

      {/* Modal */}
      {openModal && (
        <DatabaseConfigModal
          onClose={closeModal}
          authData={authData}
          onDatabaseTypeChange={handleDatabaseTypeChange}
          onConnectionFieldChange={handleConnectionFieldChange}
          onTableChange={handleTableChange}
        />
      )}
    </div>
  );
};

export default AuthenticatorNode;
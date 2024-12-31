import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeDropdown from '../../NodeDropdown';

const typeOptions = [
  { value: 'MySQL', label: 'MySQL' },
  { value: 'MongoDb', label: 'MongoDb' },
  { value: 'PostgresDb', label: 'PostgresDb' },
];

//key: .dbConnection
const DBConnection: React.FC<NodeProps> = ({ id, data }) => {
  // State to manage editable fields
  const [type, setType] = useState(data.databaseType || "");
  const [username, setUsername] = useState(data.db_username ||  "");
  const [password, setPassword] = useState(data.db_password || "");
  const [url, setUrl] = useState(data.db_url || "");
  const [isConnectedSource, setIsConnectedSource] = useState(false);

  const handleConnectSource = useCallback(
    (params: Connection) => {
      // Check if the current node is involved in the connection
      if (params.source === id || params.target === id) {
        setIsConnectedSource(true); // Set as connected
      }
    },
    [id]
  );

  // Handle label change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    // Update the node's data (this will be reflected in the state)
    data.db_userName = e.target.value;
  };

  // Handle description change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    data.db_password = e.target.value;
  };

  // Handle description change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    data.db_url = e.target.value;
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    data.databaseType = value;
  };

  return (
    <div
      style={{
        width: "238px",
        borderRadius: '10px',
        paddingBottom: "15px",
        backgroundColor: '#5B5B5B',
        boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}
    >

      <div style={{
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        backgroundColor: "#7C0002",
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
      }}>
        <p style={{ fontSize: "14px" }}>DB Connection</p>
      </div>
      {/* Editable Label */}
      <div style={{
        paddingTop: 10,
        paddingLeft: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
      }}>
        <TargetConnector isConnected={data.isConnectedTarget} />
        <div style={{ marginRight: "auto", marginLeft: 5, width: "90%" }}>
          <div style={{ width: "100%", marginBottom: '10px' }}>
            <NodeDropdown
              value={type}
              placeholder="Select Database Type"
              options={typeOptions}
              onSelect={(value) => handleTypeChange(value)}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder='db name'
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#2B2B2B',
                color: "white"
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              value={password}
              placeholder='db passwrd'
              onChange={handlePasswordChange}
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#2B2B2B',
                color: "white"
              }}
            />
          </div>

          <div>
            <input
              type="text"
              value={url}
              placeholder='db url'
              onChange={handleUrlChange}
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#2B2B2B',
                color: "white"
              }}
            />
          </div>
        </div>

        <SourceConnector isConnected={isConnectedSource} />
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          top: "50px"
        }}
        onConnect={handleConnectSource}
      />

      <Handle
        type="target"
        style={{
          top: "50px"
        }}
        position={Position.Left}
      />
    </div>
  );
};

export default DBConnection;
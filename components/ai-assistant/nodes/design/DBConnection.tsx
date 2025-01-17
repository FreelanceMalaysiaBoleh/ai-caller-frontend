import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeDropdown from '../../NodeDropdown';
import NodeHead from '../NodeHead';

const typeOptions = [
  { value: 'MySQL', label: 'MySQL' },
  { value: 'MongoDb', label: 'MongoDb' },
  { value: 'PostgresDb', label: 'PostgresDb' },
];

//key: .dbConnection
const DBConnection: React.FC<NodeProps> = ({ id, data }) => {
  // State to manage editable fields
  const [type, setType] = useState(data.databaseType || "");
  const [username, setUsername] = useState(data.db_user ||  "");
  const [dbname, setDbname] = useState(data.db_name ||  "");
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
    data.db_user = e.target.value;
  };
  
  const handleDbNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDbname(e.target.value);
    // Update the node's data (this will be reflected in the state)
    data.db_name = e.target.value;
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

      <NodeHead id={id} title={'DB Connection'} nodeType={type} color='#7C0002' />
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
              value={dbname}
              onChange={handleDbNameChange}
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
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder='db user'
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
import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeDropdown from '../../NodeDropdown';

type FunctionEntry = {
  key: string;
  desc: string;
  type: string;
};

const options = [
  { value: 'str', label: 'string' },
  { value: 'num', label: 'number' },
  { value: 'bool', label: 'boolean' },
];

const methodOptions = [
  { value: 'POST', label: 'POST' },
  { value: 'GET', label: 'GET' },
  { value: 'DELETE', label: 'DELETE' },
];

//key: .apiExecutor
const APIExecutor: React.FC<NodeProps> = ({ id, data }) => {
  // State to manage editable fields
  const [endpoint, setEndpoint] = useState(data.endpoint || "");
  const [method, setMethod] = useState(data.method || "");
  let defaultFields = [{ key: '', desc: '', type: '' }];

  if (data.args) {
    const args: { [key: string]: string } = data.args;

    defaultFields = Object.entries(args).map(([key, value]) => ({
      key,
      type: value.split(" (")[0],  // Extract the type before the first "("
      desc: value.split(" (")[1].replace(")", "")  // Extract the description after "(" and remove trailing ")"
    }));
  }

  const [fields, setFields] = useState<FunctionEntry[]>(defaultFields);
  const [isConnectedSource, setIsConnectedSource] = useState(false);

  const handleAddField = () => {
    const updatedFields = [...fields, { key: '', desc: '', type: '' }];
    setFields(updatedFields);

    data.fields = updatedFields;
  };

  const handleFieldChange = (index: number, fieldName: keyof FunctionEntry, value: string) => {
    const updatedFields = fields.map((field, idx) =>
      idx === index ? { ...field, [fieldName]: value } : field
    );
    setFields(updatedFields);
    data.fields = updatedFields;
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = fields.filter((_, idx) => idx !== index);
    setFields(updatedFields);
    data.fields = updatedFields;
  };

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
  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);
    // Update the node's data (this will be reflected in the state)
    data.endpoint = e.target.value;
  };

  // Handle description change
  const handleMethodChange = (value: string) => {
    setMethod(value);
    data.method = value;
  };

  return (
    <div
      style={{
        borderRadius: '10px',
        paddingBottom: "15px",
        backgroundColor: '#5B5B5B',
        boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
        position: 'relative',
      }}
    >

      <div style={{
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        backgroundColor: "#BB3800",
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
      }}>
        <p style={{ fontSize: "14px" }}>API Executor</p>
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
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={endpoint}
              onChange={handleEndpointChange}
              placeholder='endpoint'
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

          <div style={{ width: "50%" }}>
            <NodeDropdown
              value={method}
              placeholder="Select Method"
              options={methodOptions}
              onSelect={(value) => handleMethodChange(value)}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            {fields.map((field, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  gap: "10px"
                }}
              >
                {/* Key Field: 1/5 */}
                <input
                  type="text"
                  placeholder="Key"
                  value={field.key}
                  onChange={(e) => handleFieldChange(index, 'key', e.target.value)}
                  style={{
                    width: "20%",
                    padding: '5px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#2B2B2B',
                    color: 'white',
                  }}
                />

                {/* Type Dropdown: 1/5 */}
                <div style={{ width: "20%" }}>
                  <NodeDropdown
                    placeholder="Select Type"
                    options={options}
                    onSelect={(value) => handleFieldChange(index, 'type', value)}
                  />
                </div>

                {/* Description Field: 3/5 */}
                <input
                  type="text"
                  placeholder="Description"
                  value={field.desc}
                  onChange={(e) => handleFieldChange(index, 'desc', e.target.value)}
                  style={{
                    width: "60%",
                    padding: '5px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#2B2B2B',
                    color: 'white',
                  }}
                />

                {
                  fields.length == 1
                    ?
                    <>
                    </>
                    :
                    <button
                      onClick={() => handleRemoveField(index)}
                      style={{
                        marginLeft: '5px',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#FF4D4D',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </button>
                }
              </div>
            ))}

            <button
              onClick={handleAddField}
              style={{
                marginLeft: '5px',
                padding: '5px 10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#007C34',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Add Field
            </button>
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

export default APIExecutor;
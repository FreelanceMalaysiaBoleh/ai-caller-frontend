import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';

//key: .aiNameAndRole
const AiNameAndRole: React.FC<NodeProps> = ({ id, data }) => {
    // State to manage editable fields
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
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
    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(e.target.value);
        // Update the node's data (this will be reflected in the state)
        data.label = e.target.value;
    };

    // Handle description change
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
        data.description = e.target.value;
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
                backgroundColor: "#007C34",
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5,
            }}>
                <p style={{ fontSize: "14px" }}>AI Name and Role</p>
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
                            value={label}
                            onChange={handleLabelChange}
                            placeholder='name'
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
                            value={description}
                            placeholder='role'
                            onChange={handleDescriptionChange}
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
                    top: "43%"
                }}
                onConnect={handleConnectSource}
            />

            <Handle
                type="target"
                style={{
                    top: "43%"
                }}
                position={Position.Left}
            />
        </div>
    );
};

export default AiNameAndRole;
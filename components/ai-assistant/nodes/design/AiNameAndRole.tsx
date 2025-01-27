import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeHead from '../NodeHead';

//key: .aiNameAndRole
const AiNameAndRole: React.FC<NodeProps> = ({ id, data, type }) => {
    // State to manage editable fields
    const [name, setName] = useState(data.name || "");
    const [role, setRole] = useState(data.role || "");
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
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        // Update the node's data (this will be reflected in the state)
        data.name = e.target.value;
    };

    // Handle description change
    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
        data.role = e.target.value;
    };

    return (
        <div
            style={{
                width: "238px",
                borderRadius: '10px',
                paddingBottom: "15px",
                backgroundColor: '#5B5B5B',
                boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
            }}
        >
            <NodeHead id={id} title={'AI Name and Role'} nodeType={type} color='#007C34' />
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
                            value={name}
                            onChange={handleNameChange}
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
                            value={role}
                            placeholder='role'
                            onChange={handleRoleChange}
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
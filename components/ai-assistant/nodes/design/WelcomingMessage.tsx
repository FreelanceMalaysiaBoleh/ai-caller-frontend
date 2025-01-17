import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeHead from '../NodeHead';

//key: .welcomingMessage
const WelcomingMessage: React.FC<NodeProps> = ({ id, data, type }) => {
    // State to manage editable fields
    const [message, setMessage] = useState(data.message || "");
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
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        // Update the node's data (this will be reflected in the state)
        data.message = e.target.value;
    };

    return (
        <div
            style={{
                borderRadius: '10px',
                width: "238px",
                paddingBottom: "15px",
                backgroundColor: '#5B5B5B',
                boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
            }}
        >
            <NodeHead id={id} title={'Welcoming Message'} nodeType={type} color='#007C34' />
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
                    <div>
                        <textarea
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="message"
                            style={{
                                width: '100%',
                                height: '85px',
                                padding: '5px',
                                borderRadius: '5px',
                                border: 'none',
                                backgroundColor: '#2B2B2B',
                                color: "white",
                                resize: 'none', // Disable resizing
                                overflow: 'hidden', // Ensure overflow wraps properly
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
                    top: "35%"
                }}
                onConnect={handleConnectSource}
            />

            <Handle
                type="target"
                style={{
                    top: "35%"
                }}
                position={Position.Left}
            />
        </div>
    );
};

export default WelcomingMessage;
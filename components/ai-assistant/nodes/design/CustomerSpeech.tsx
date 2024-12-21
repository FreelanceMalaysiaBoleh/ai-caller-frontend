import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';

//key: .customerSpeech
const CustomerSpeech: React.FC<NodeProps> = ({ id, data }) => {
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

    return (
        <div
            style={{
                borderRadius: '10px',
                width: "200px",
                height: "80 px",
                paddingBottom: "15px",
                backgroundColor: '#5B5B5B',
                boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
            }}
        >

            <div style={{
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
                backgroundColor: "#000000",
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5,
            }}>
                <p style={{ fontSize: "14px" }}>Customer Speech</p>
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
                </div>
                <SourceConnector isConnected={isConnectedSource} />
            </div>

            {/* Output handle */}
            <Handle
                type="source"
                position={Position.Right}
                style={{
                    top: "62%"
                }}
                onConnect={handleConnectSource}
            />

            <Handle
                type="target"
                style={{
                    top: "62%"
                }}
                position={Position.Left}
            />
        </div>
    );
};

export default CustomerSpeech;
import { Connection, Handle, NodeProps, Position } from "reactflow";
import { useCallback, useState } from "react";
import SourceConnector from "../SourceConnector";

//key: .initiate
const Initiate: React.FC<NodeProps> = ({ id }) => {
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = useCallback(
        (params: Connection) => {
            // Check if the current node is involved in the connection
            if (params.source === id || params.target === id) {
                setIsConnected(true); // Set as connected
            }
        },
        [id]
    );


    return (
        <div
            style={{
                borderRadius: '10px',
                backgroundColor: "#5B5B5B",
                height: "80px",
                width: "168px",
                boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
            }}
        >
            <div style={{
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
                backgroundColor: "#993838",
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5,
            }}>
                <p style={{ fontSize: "14px" }}>Initiate</p>
            </div>
            <div style={{
                paddingTop: 10,
                paddingLeft: 10,
                display: "flex",

            }}>
                <p style={{ fontSize: "14px", marginRight: "auto" }}>Runtime</p>
                <SourceConnector isConnected={isConnected} />
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{
                    top: "60%",
                    border: "1px solid white",
                    backgroundColor: "white"
                }}
                onConnect={handleConnect}
            />
        </div>
    );
};

export default Initiate;
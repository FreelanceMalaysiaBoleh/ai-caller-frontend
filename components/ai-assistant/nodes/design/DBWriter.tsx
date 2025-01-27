import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeHead from '../NodeHead';

//key: .dbWriter
const DBWriterComponent: React.FC<NodeProps> = ({ id, data, type }) => {
    // State to manage editable fields
    const [desc, setDesc] = useState(data.description || "");
    const [query, setQuery] = useState(data.query || "");
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
    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value);
        // Update the node's data (this will be reflected in the state)
        data.description = e.target.value;
    };

    // Handle description change
    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        data.query = e.target.value;
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

            <NodeHead id={id} title={'DB Writer'} nodeType={type} color='#BB3800' />
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
                            value={desc}
                            onChange={handleDescChange}
                            placeholder='description'
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
                            value={query}
                            placeholder='query'
                            onChange={handleQueryChange}
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

export default DBWriterComponent;
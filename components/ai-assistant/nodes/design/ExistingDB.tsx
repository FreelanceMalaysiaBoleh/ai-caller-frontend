import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeHead from '../NodeHead';
import DropdownModal from '../DropdownModal';
import { useDatabaseConnections } from '@/hooks/data-management/useDatabaseConnections';

//key: .existingDB
const ExistingDB: React.FC<NodeProps> = ({ id, data, type }) => {
    const [isConnectedSource, setIsConnectedSource] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [value, setValue] = useState(data.selectedDB || "");

    const { dbconnections } = useDatabaseConnections();

    const closeModal = () => {
        setOpenModal(false);
    }

    const handleConnectSource = useCallback(
        (params: Connection) => {
            console.log(params);
            // Check if the current node is involved in the connection
            if (params.source === id || params.target === id) {
                setIsConnectedSource(true); // Set as connected
            }
        },
        [id]
    );

    const items = dbconnections ? dbconnections.map(item => { return { title: item.database_name, value: item._id } }) : [];
    const selectedVal = dbconnections ? dbconnections.find((item) => item._id == value)?.database_name || "None selected" : "None selected"

    const handleDBSelect = (selectedDB: string) => {
        setValue(selectedDB);
        data.selectedDB = selectedDB;
    };

    return (
        <div
            style={{
                borderRadius: '10px',
                width: "300px",
                height: "80 px",
                paddingBottom: "15px",
                backgroundColor: '#5B5B5B',
                boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
            }}
        >

            <NodeHead id={id} title={'Existing DB connection'} nodeType={type} color='#3D2FFF' />
            {/* Editable Label */}
            <div style={{
                paddingTop: 10,
                paddingLeft: 5,
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
            }}>
                <TargetConnector isConnected={data.isConnectedTarget} />
                <div style={{ marginRight: "auto", marginLeft: 20, width: "90%" }}>
                    <div style={{ marginBottom: 15 }}>
                        <p style={{ fontSize: "14px", }}>DB Selected: </p>
                        <p style={{ fontSize: "14px", }}>{selectedVal}</p>
                    </div>
                    <button
                        type="button"
                        style={{
                            marginLeft: "auto",
                            padding: "10px 30px",
                            border: "1px solid white",
                            backgroundColor: "#5B5B5B",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    >
                        <p id="biggersmall">Select Existing Database</p>
                    </button>
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

            {openModal &&
                <DropdownModal
                    search={"file"}
                    onClose={closeModal}
                    onChange={(val) => handleDBSelect(val)}
                    title='Select Existing DB connection'
                    selectedItem={value}
                    items={items}
                />}
        </div>
    );
};

export default ExistingDB;
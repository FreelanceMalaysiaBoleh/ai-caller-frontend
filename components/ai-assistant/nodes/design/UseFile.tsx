import { useCallback, useState } from 'react';
import { Connection, Handle, NodeProps, Position } from 'reactflow';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeHead from '../NodeHead';
import { useGetAllFiles } from '@/hooks/data-management/useGetAllFiles';
import DropdownModalCheckbox from '../DropdownModalCheckbox';

//key: .useFile
const UseFile: React.FC<NodeProps> = ({ id, data, type }) => {
    const [isConnectedSource, setIsConnectedSource] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [value, setValue] = useState<string[]>(data.selectedFiles || []);

    const { files } = useGetAllFiles();

    const closeModal = () => {
        setOpenModal(false);
    }

    const handleConnectSource = useCallback(
        (params: Connection) => {
            // Check if the current node is involved in the connection
            if (params.source === id || params.target === id) {
                setIsConnectedSource(true); // Set as connected
            }
        },
        [id]
    );

    const items = files ? files.map(item => { return { title: item.file_name, value: item._id } }) : [];
    const selectedFile = files ? value.length > 0 ? value.map(item => files.find((i) => i._id == item)?.file_name).join(", ") : "None Selected" : "None selected"

    const handleFileSelect = (selectedVal: string) => {
        const updatedValue = value.includes(selectedVal) ? value.filter((row) => row !== selectedVal) : [...value, selectedVal]

        setValue(updatedValue)
        data.selectedFiles = updatedValue;
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

            <NodeHead id={id} title={'Use File'} nodeType={type} color='#3D2FFF' />
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
                        <p style={{ fontSize: "14px", }}>File Selected: </p>
                        <p style={{ fontSize: "14px", }}>{selectedFile}</p>
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
                        <p id="biggersmall">Select File</p>
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
                <DropdownModalCheckbox
                    search={"file"}
                    onClose={closeModal}
                    onChange={(val) => handleFileSelect(val)}
                    title='Select Existing File'
                    selectedItems={value}
                    items={items}
                />}
        </div>
    );
};

export default UseFile;
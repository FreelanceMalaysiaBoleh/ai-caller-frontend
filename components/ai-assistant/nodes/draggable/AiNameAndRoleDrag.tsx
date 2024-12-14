import { LegacyRef} from 'react'
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import { ItemTypes, NodeType } from '@/contants/NodeConstants';
import { useDrag } from 'react-dnd';

//key: .aiNameAndRole
const AiNameAndRoleDrag = () => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.NODE,
        item: { type: NodeType.aiNameAndRole },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={(drag as unknown) as LegacyRef<HTMLDivElement>}
            style={{
                borderRadius: '10px',
                paddingBottom: "15px",
                backgroundColor: isDragging ? "#828282" : "#5B5B5B",
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
                <TargetConnector isConnected={false} />
                <div style={{ marginRight: "auto", marginLeft: 5, width: "90%" }}>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={""}
                            disabled={true}
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
                            value={""}
                            placeholder='role'
                            disabled={true}
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

                <SourceConnector isConnected={false} />
            </div>
        </div>
    );
};

export default AiNameAndRoleDrag;
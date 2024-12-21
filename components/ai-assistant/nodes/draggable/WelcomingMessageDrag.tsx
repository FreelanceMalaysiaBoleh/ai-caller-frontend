import { useDrag } from 'react-dnd';
import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import { ItemTypes, NodeType } from '@/contants/NodeConstants';
import { LegacyRef } from 'react';

//key: .welcomingMessage
const WelcomingMessageDrag = () => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.NODE,
        item: { type: NodeType.welcomingMessage },
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
                cursor: "grab"
            }}
        >

            <div style={{
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
                backgroundColor: isDragging ? "#339F62" : "#007C34",
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5,
            }}>
                <p style={{ fontSize: "14px" }}>Welcoming Message</p>
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
                    <div>
                        <textarea
                            value={""}
                            disabled={true}
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

                <SourceConnector isConnected={false} />
            </div>
        </div>
    );
};

export default WelcomingMessageDrag;
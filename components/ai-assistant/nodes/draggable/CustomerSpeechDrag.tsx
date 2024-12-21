import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import { useDrag } from 'react-dnd';
import { ItemTypes, NodeType } from '@/contants/NodeConstants';
import { LegacyRef } from 'react';

//key: .customerSpeech
const CustomerSpeechDrag = () => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.NODE,
        item: { type: NodeType.customerSpeech },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={(drag as unknown) as LegacyRef<HTMLDivElement>}
            style={{
                borderRadius: '10px',
                height: "80px",
                paddingBottom: "15px",
                backgroundColor: '#5B5B5B',
                boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                cursor: "grab"
            }}
        >

            <div style={{
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
                backgroundColor: isDragging ? "#333333" : "#000000",
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
                <TargetConnector isConnected={false} />
                <div style={{ marginRight: "auto", marginLeft: 5, width: "90%" }}>
                </div>
                <SourceConnector isConnected={false} />
            </div>
        </div>
    );
};

export default CustomerSpeechDrag;
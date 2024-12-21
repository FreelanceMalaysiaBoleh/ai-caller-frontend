
import { BsCaretRight } from "react-icons/bs";
import { useDrag } from "react-dnd";
import { ItemTypes, NodeType } from "@/contants/NodeConstants";
import { LegacyRef } from "react";

//key: .initiate
const InitiateDrag = () => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.NODE,
        item: { type: NodeType.initiate },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={(drag as unknown) as LegacyRef<HTMLDivElement>}
            style={{
                borderRadius: '10px',
                backgroundColor: isDragging ? "#828282" : "#5B5B5B",
                height: "80px",
                maxWidth: "168px",
                boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                cursor: "grab"
            }}
        >
            <div style={{
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
                backgroundColor: isDragging ? "#C06565" : "#993838",
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
                <BsCaretRight size={22} color="white" />
            </div>
        </div>
    );
};

export default InitiateDrag;
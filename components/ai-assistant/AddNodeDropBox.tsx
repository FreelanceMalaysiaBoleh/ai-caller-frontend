import { useDrop } from "react-dnd";
import { CgAddR } from "react-icons/cg";
import { NodeState } from "./Board";
import { LegacyRef } from "react";
import { ItemTypes } from "./editor/Node";

const AddNodeDropBox = ({ id, fillNode, tree }: { id: string, tree: NodeState[], fillNode: (id: string, itemId: string, tree: NodeState[]) => void }) => {

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.NODE,
            drop: (item: { id: string }) => {
                fillNode(id, item.id, tree); // pass both drop and dragged item IDs
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        [id, tree]
    )

    return (
        <>
            <div style={{ border: "solid 1px", height: "20px" }}></div>
            <div
                ref={(drop as unknown) as LegacyRef<HTMLDivElement>}
                style={{
                    cursor: "default",
                    borderRadius: 20,
                    backgroundColor: isOver ? "yellow" : "white",
                    maxWidth: "210px",
                    border: "dashed 2px",
                    color: "black",
                    padding: 10,
                    paddingBottom: 20,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <p style={{ marginBottom: "10px", color: "black" }}><b>Drag and Drop to add Node</b></p>
                <CgAddR size={50} />
            </div>
        </>
    )
}

export default AddNodeDropBox;
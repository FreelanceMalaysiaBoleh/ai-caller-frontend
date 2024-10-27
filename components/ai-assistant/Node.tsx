import { useDrag } from "react-dnd";

export interface NodeProps {
    id?: string,
    imgsrc?: string,
    imgWidth?: number,
    imgHeight?: number,
    textColor?: string,
    color?: string,
    desc: string,
    disableDrag?: boolean,
}

export const ItemTypes = {
    NODE: 'node'
}


const Node = ({
    id = "-1",
    imgsrc,
    desc,
    textColor = "white",
    imgWidth = 60,
    imgHeight = 60,
    color = "black"
}: NodeProps) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.NODE,
        item: { id: id }, 
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={drag as any}
            style={{
                cursor: "grab",
                opacity: isDragging ? 0.5 : 1,
                marginTop: 20,
                borderRadius: 20,
                backgroundColor: color,
                color: textColor,
                padding: 10,
                paddingBottom: imgsrc ? 20 : 10,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <p style={{ marginBottom: "10px", color: textColor, fontSize: "16px" }}><b>{desc}</b></p>
            {
                imgsrc
                    ?
                    <img width={imgWidth} height={imgHeight} src={imgsrc}></img>
                    :
                    <></>
            }

        </div>
    )
}

export default Node;
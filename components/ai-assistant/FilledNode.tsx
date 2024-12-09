import { NodeProps } from "./editor/Node";



const FilledNode = ({
    imgsrc,
    desc,
    textColor = "white",
    imgWidth = 60,
    imgHeight = 60,
    color = "black"
}: NodeProps) => {
    return (
        <>
            <div style={{ border: "solid 1px", height: "20px" }}></div>
            <div style={{
                cursor: "default",
                maxWidth: "200px",
                minWidth: "200px",
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
                <p style={{ marginBottom: "10px", color: textColor }}><b>{desc}</b></p>
                {
                    imgsrc
                        ?
                        <img width={imgWidth} height={imgHeight} src={imgsrc}></img>
                        :
                        <></>
                }

            </div>
        </>
    )
}

export default FilledNode;
import InitiateDrag from "../nodes/draggable/InitiateDrag";
import AiNameAndRoleDrag from "../nodes/draggable/AiNameAndRoleDrag";
import WelcomingMessageDrag from "../nodes/draggable/WelcomingMessageDrag";
import CustomerSpeechDrag from "../nodes/draggable/CustomerSpeechDrag";
import BoundariesDrag from "../nodes/draggable/BoundariesDrag";
import FunctionCallDrag from "../nodes/draggable/FunctionCallDrag";
import DBReaderDrag from "../nodes/draggable/DBReaderDrag";
import DBWriterDrag from "../nodes/draggable/DBWriterDrag";
import APIExecutorDrag from "../nodes/draggable/APIExecutorDrag";
import DBConnectionDrag from "../nodes/draggable/DBConnectionDrag";

const NodesList = [
    InitiateDrag,
    AiNameAndRoleDrag,
    WelcomingMessageDrag,
    CustomerSpeechDrag,
    BoundariesDrag,
    FunctionCallDrag,
    DBReaderDrag,
    DBWriterDrag,
    APIExecutorDrag,
    DBConnectionDrag
];

const NodeBar = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: "column",
                height: '100vh',
                width: "20%",
                margin: 0,
                alignItems: "center",
                marginLeft: 20,
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Main Functions</h1>
            <div style={{ backgroundColor: "#3e3e3e", flex: 1, overflowY: "auto", padding: 10 }}>
                {NodesList.map((Node, index) => (
                    <div key={index} style={{marginBottom: 10}}>
                        <Node />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NodeBar;
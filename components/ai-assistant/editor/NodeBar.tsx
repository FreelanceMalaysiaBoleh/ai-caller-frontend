import Node from "./Node";
import OpenAiIcon from "@/public/images/open-ai-icon.png"
import MetaAiIcon from "@/public/images/meta-icon.png"
import MySQLIcon from "@/public/images/Mysql_logo.png"
import WeaviateIcon from "@/public/images/weaviate-logo.png"

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
                <Node
                    id="openai"
                    desc="Accept prompt using AI"
                    color="green"
                    imgsrc={OpenAiIcon.src}
                />
                <Node
                    id="metaai"
                    desc="Accept prompt using AI"
                    color="blue"
                    imgsrc={MetaAiIcon.src}
                    imgWidth={100}
                />
                <Node
                    id="getcustomer"
                    desc="Get customer data from database"
                    color="#c23beb"
                />
                <Node
                    id="updateticket"
                    desc="Update ticket"
                    color="brown"
                />
                <Node
                    id="storedbsql"
                    desc="Store into database"
                    color="#5184d6"
                    imgWidth={100}
                    imgsrc={MySQLIcon.src}
                />
                <Node
                    id="storedbweave"
                    desc="Store into database"
                    color="#1d994f"
                    imgsrc={WeaviateIcon.src}
                />
            </div>
        </div>
    )
}

export default NodeBar;
import { Row } from "antd";

const SystemLogStatusTable = () => {

    const data = [
        {
            description: "Ticket Update",
            timestamp: "3 minutes ago"
        },
        {
            description: "User complaint received",
            timestamp: "1 hour ago"
        },
        {
            description: "Call failed",
            timestamp: "2 weeks ago"
        }
    ]

    return (
        <div>
            <div style={{
                border: "solid 0.5px",
                width: "100%",
                marginTop: "20px",
                marginBottom: "10px"
            }}></div>

            <Row>
                <div style={{
                    flex: 1
                }}>
                    <p style={{ color: "#6E6E6E" }}>Event Description</p>
                </div>
                <div style={{
                    flex: 1
                }}>
                    <p style={{ color: "#6E6E6E" }}>Time Created</p>
                </div>
            </Row>

            <div style={{
                border: "solid 0.5px",
                width: "100%",
                marginTop: "20px",
                marginBottom: "10px"
            }}></div>

            {
                data.map((item, index) => {
                    return (
                        <>
                            <Row>
                                <div style={{
                                    flex: 1
                                }}>
                                    <p><b>{item.description}</b></p>
                                </div>
                                <div style={{
                                    flex: 1
                                }}>
                                    <p><b>{item.timestamp}</b></p>
                                </div>
                            </Row>
                            <div style={{
                                border: "solid 0.5px",
                                width: "100%",
                                marginTop: "20px",
                                marginBottom: "10px"
                            }}></div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default SystemLogStatusTable;
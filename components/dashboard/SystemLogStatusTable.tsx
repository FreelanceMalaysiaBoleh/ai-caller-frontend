import { Ticket } from "@/types/TicketType";
import { Row } from "antd";

const SystemLogStatusTable = ({ tickets }: { tickets: Ticket[] }) => {

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
                    width: "60%"
                }}>
                    <p style={{ color: "#6E6E6E" }}>Description</p>
                </div>
                <div style={{
                    marginLeft: "10px",
                    flex: 1
                }}>
                    <p style={{ color: "#6E6E6E" }}>Status</p>
                </div>
                <div style={{
                    marginLeft: "10px",
                    flex: 1
                }}>
                    <p style={{ color: "#6E6E6E" }}>Name</p>
                </div>
                <div style={{
                    marginLeft: "10px",
                    flex: 1
                }}>
                    <p style={{ color: "#6E6E6E" }}>Date</p>
                </div>
            </Row>

            <div style={{
                border: "solid 0.5px",
                width: "100%",
                marginTop: "20px",
                marginBottom: "10px"
            }}></div>

            {
                tickets.map((item, index) => {
                    return (
                        <>
                            <Row>
                                <div style={{
                                    width: "60%"
                                }}>
                                    <p style={{fontSize: "16px"}}><b>{item.description}</b></p>
                                </div>
                                <div style={{
                                    marginLeft: "10px",
                                    flex: 1
                                }}>
                                    <p style={{fontSize: "16px"}}>{item.status}</p>
                                </div>
                                <div style={{
                                    marginLeft: "10px",
                                    flex: 1
                                }}>
                                    <p style={{fontSize: "16px"}}>{item.user_name}</p>
                                </div>
                                <div style={{
                                    marginLeft: "10px",
                                    flex: 1
                                }}>
                                    <p style={{fontSize: "16px"}}>{item.created_at}</p>
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
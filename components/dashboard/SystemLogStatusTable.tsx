import { Ticket } from "@/types/TicketType";
import { Row } from "antd";

type dateParams = "numeric" | "2-digit" | undefined; 

const SystemLogStatusTable = ({ tickets }: { tickets: Ticket[] }) => {
    const formatDate = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        const options = { 
            year: 'numeric' as dateParams, 
            month: '2-digit' as "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined, 
            day: '2-digit' as dateParams, 
            hour: 'numeric' as dateParams, 
            minute: '2-digit' as dateParams, 
            hour12: true 
        };
        return date.toLocaleString('en-US', options);
    }


    // const data = [
    //     {
    //         description: "Ticket Update",
    //         timestamp: "3 minutes ago"
    //     },
    //     {
    //         description: "User complaint received",
    //         timestamp: "1 hour ago"
    //     },
    //     {
    //         description: "Call failed",
    //         timestamp: "2 weeks ago"
    //     }
    // ]

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
                tickets.map((item) => {
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
                                    <p style={{ fontSize: "16px" }}>{formatDate(item.created_at)}</p>
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
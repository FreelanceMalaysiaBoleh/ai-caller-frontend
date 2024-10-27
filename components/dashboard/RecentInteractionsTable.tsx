import { Row } from "antd";

const RecentInteractionsTable = () => {

    const data = [
        {
            number: "0122241415",
            duration: "2 minutes"
        },
        {
            number: "0122241415",
            duration: "2 minutes"
        },
        {
            number: "0122241415",
            duration: "3 minutes"
        },
        {
            number: "0122241415",
            duration: "5 minutes"
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
                    width: "50%",

                }}>
                    <p style={{ color: "#6E6E6E" }}>Number</p>
                </div>
                <div style={{
                    flex: 1
                }}>
                    <p style={{ color: "#6E6E6E" }}>Duration</p>
                </div>
            </Row>

            <div style={{
                border: "solid 0.5px",
                width: "100%",
                marginTop: "20px",
                marginBottom: "10px"
            }}></div>

            {
                data.map((item) => {
                    return (
                        <>
                            <Row>
                                <div style={{
                                    width: "50%",

                                }}>
                                    <p><b>{item.number}</b></p>
                                </div>
                                <div style={{
                                    flex: 1
                                }}>
                                    <p><b>{item.duration}</b></p>
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

export default RecentInteractionsTable;
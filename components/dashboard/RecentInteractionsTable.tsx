import { secondsToString } from "@/helpers/GeneralHelper";
import { CallRecords } from "@/types/CallRecordType";
import { Row } from "antd";

const RecentInteractionsTable = ({ callRecords }: { callRecords: CallRecords[] }) => {
    // [
    //   {
    //     "_id": "callRecordId1",
    //     "call_id": 1,
    //     "phone_number": "+60123456789",
    //     "call_duration": 320,  // Duration in seconds
    //     "call_time": "2024-10-25T10:00:00.000Z",
    //     "caller_name": "John Doe"
    //   },
    //   ...
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
                    width: "35%",

                }}>
                    <p style={{ color: "#6E6E6E" }}>Number</p>
                </div>
                <div style={{
                    flex: 1
                }}>
                    <p style={{ color: "#6E6E6E" }}>Caller</p>
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


            {/* <Row>
                <div style={{
                    width: "35%",

                }}>
                    <p><b>+60123456789</b></p>
                </div>
                <div style={{
                    flex: 1
                }}>
                    <p><b>Jacob Jacobsen</b></p>
                </div>
                <div style={{
                    flex: 1
                }}>
                    <p><b>{secondsToString(5000)}</b></p>
                </div>
            </Row>
            <div style={{
                border: "solid 0.5px",
                width: "100%",
                marginTop: "20px",
                marginBottom: "10px"
            }}></div> */}

            {
                callRecords?.map((item) => {
                    return (
                        <>
                            <Row>
                                <div style={{
                                    width: "35%",

                                }}>
                                    <p><b>{item.phone_number}</b></p>
                                    <p><b>+60123456789</b></p>
                                </div>
                                <div style={{
                                    flex: 1
                                }}>
                                    <p><b>{item.caller_name}</b></p>
                                    <p><b>Jacob Jacobsen</b></p>
                                </div>
                                <div style={{
                                    flex: 1
                                }}>
                                    <p><b>{secondsToString(item.call_duration)}</b></p>
                                    <p><b>{secondsToString(5000)}</b></p>
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
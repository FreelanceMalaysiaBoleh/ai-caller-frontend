import { Input } from "antd";

interface IfBranchProps {
    condition?: string,
    truePath: JSX.Element[],
    falsePath: JSX.Element[],
    onConditionChange: (text: string) => void
}

const IfBranch = ({
    condition = "",
    truePath,
    falsePath,
    onConditionChange
}: IfBranchProps) => {
    return (
        <>
            <div style={{ border: "solid 1px", height: "20px" }}></div>
            <Input style={{
                maxWidth: "500px"
            }} placeholder="Add If condition" value={condition} onChange={(event) => onConditionChange(event.target.value)} />
            <div style={{ border: "solid 1px", height: "20px" }}></div>
            <div style={{ border: "solid 1px", width: "65%" }}></div>
            <div style={{ display: "flex", width: "80%", flexDirection: "row" }}>
                <div style={{ marginRight: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p>false</p>
                    {
                        falsePath.map((element) => {
                            return element
                        })
                    }
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p>true</p>
                    {
                        truePath.map((element) => {
                            return element
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default IfBranch;
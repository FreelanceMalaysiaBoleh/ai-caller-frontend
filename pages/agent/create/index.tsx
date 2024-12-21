import AgentForm from "@/components/create-agent/AgentForm";
import MainLayout from "@/components/general/MainLayout";
import { useState } from "react";
import { TiTick } from "react-icons/ti";

const CreateAgent = () => {

    const [page, setPage] = useState<number>(1);

    return (
        <MainLayout>
            <div style={{ marginBottom: 65 }}></div>
            <h1>Create New Agent</h1>
            <div style={{ marginBottom: "10px" }}></div>
            <p>Each agent have its own customization and logic</p>

            <div style={{ marginBottom: "10px" }}></div>

            <div style={{
                width: "80%",
                paddingTop: 20,
                paddingLeft: 45,
                paddingRight: 45,
                paddingBottom: 20,
                backgroundColor: "#3e3e3e",
                borderRadius: 10,
                marginBottom: "50px"
            }}>
                <BreadCrumbComponent page={page} />
                <AgentForm page={page} setPage={(index) => { setPage(index) }} />
            </div>
        </MainLayout>
    )
}

const BreadCrumbComponent = ({ page }: { page: number }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >

            <BreadCrumbItem
                text="Agent Config"
                subText="Setup Your Agent"
                index={1}
                active={page == 1}
                complete={page == 2 || page == 3}
            />
            <div
                style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: '#909090',
                    margin: '0 10px',
                }}
            ></div>
            <BreadCrumbItem
                text="Main Customize"
                subText="Setup Your Agent"
                index={2}
                active={page == 2}
                complete={page == 3}
            />
            <div
                style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: '#909090',
                    margin: '0 10px',
                }}
            ></div>
            <BreadCrumbItem
                text="Summary"
                subText="Review and payment"
                index={3}
                active={page == 3}
                complete={false}
            />
        </div>
    )
}

const BreadCrumbItem = ({
    text,
    subText,
    index,
    active,
    complete
}: { text: string, subText: string, index: number, active: boolean, complete: boolean }) => {

    return (
        <>
            <div style={{
                borderRadius: "50%",
                backgroundColor: active ? "#F73587" : complete ? "#1eb700" : "#909090",
                width: "38px",
                height: "38px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {
                    complete
                    ?
                    <TiTick color="#3e3e3e" size={25}/>
                    :
                    <p id="medium">{index}</p>
                }
                
            </div>
            <div style={{
                marginLeft: 15
            }}>
                <p id="medium">{text}</p>
                <p id="small">{subText}</p>
            </div>
        </>
    )
}

export default CreateAgent;
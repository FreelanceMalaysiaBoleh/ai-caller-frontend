import AgentForm from "@/components/create-agent/AgentForm";
import MainLayout from "@/components/general/MainLayout";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import { Dispatch, SetStateAction, useState } from "react";
import { TiTick } from "react-icons/ti";

const CreateAgent = () => {

    const [page, setPage] = useState<number>(1);
    const size = useScreenSize();

    return (
        <MainLayout>
            <div style={{ marginBottom: 65 }}></div>
            <h1>Create New Agent</h1>
            <div style={{ marginBottom: "10px" }}></div>
            <p>Each agent have its own customization and logic</p>

            <div style={{ marginBottom: "10px" }}></div>

            <div style={{
                width: size == "large" ? "80%" : "100%",
                paddingTop: 20,
                paddingLeft: responsiveValue(size, 10, 20, 45),
                paddingRight: responsiveValue(size, 10, 20, 45),
                paddingBottom: 20,
                backgroundColor: "#3e3e3e",
                borderRadius: 10,
                marginBottom: "50px"
            }}>
                <BreadCrumbComponent page={page} setPage={setPage} />
                <AgentForm page={page} setPage={(index) => { setPage(index) }} />
            </div>
        </MainLayout>
    )
}

const BreadCrumbComponent = ({ page, setPage }: { page: number, setPage: Dispatch<SetStateAction<number>> }) => {
    const size = useScreenSize();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: size == "small" ? "column" : "row",
                alignItems: size == "small" ? "start" : 'center',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >

            <BreadCrumbItem
                text="Agent Config"
                subText="Setup Your Agent"
                index={1}
                onClickTab={() => { setPage(1) }}
                active={page == 1}
                complete={page == 2 || page == 3}
            />
            {
                size == "small"
                    ?
                    <></>
                    :
                    <div
                        style={{
                            flex: 1,
                            height: 2,
                            backgroundColor: '#909090',
                            margin: '0 10px',
                        }}
                    ></div>
            }

            <BreadCrumbItem
                text="Main Customize"
                subText="Setup Your Agent"
                index={2}
                onClickTab={() => { setPage(2) }}
                active={page == 2}
                complete={page == 3}
            />
            {
                size == "small"
                    ?
                    <></>
                    :
                    <div
                        style={{
                            flex: 1,
                            height: 2,
                            backgroundColor: '#909090',
                            margin: '0 10px',
                        }}
                    ></div>
            }
            <BreadCrumbItem
                text="Summary"
                subText="Review and payment"
                index={3}
                onClickTab={() => { }}
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
    complete,
    onClickTab
}: { text: string, subText: string, index: number, active: boolean, complete: boolean, onClickTab: () => void }) => {
    const size = useScreenSize();

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{
                    borderRadius: "50%",
                    backgroundColor: active ? "#F73587" : complete ? "#1eb700" : "#909090",
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    marginBottom: size == "small" ? "10px" : 0
                }}
                    onClick={onClickTab}
                >
                    {
                        complete
                            ?
                            <TiTick color="#3e3e3e" size={25} />
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
            </div>
        </>
    )
}

export default CreateAgent;
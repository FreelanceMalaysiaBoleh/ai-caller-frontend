import { useGetToken } from '@/services/AuthServices';
import { ErrorResponse, getPipelineStatus, startPipeline, stopPipeline, SuccessResponse } from '@/services/PipelineServices';
import React, { Dispatch, SetStateAction, useState } from 'react';

const TabNavigation = ({
    workflowId,
    saveWorkflow,
    resetWorkFlow,
    pipelineStatus = "not started",
    setPipelineStatus,
    setErrorPipeline,
}: {
    workflowId: string,
    saveWorkflow: () => void,
    resetWorkFlow: () => void,
    pipelineStatus?: string,
    setPipelineStatus: Dispatch<SetStateAction<string>>,
    setErrorPipeline: Dispatch<SetStateAction<string>>,

}) => {
    const token = useGetToken();
    const [isHoveredStart, setIsHoveredStart] = useState(false);
    const [isHoveredStop, setIsHoveredStop] = useState(false);

    const [isHoveredSave, setIsHoveredSave] = useState(false);
    const [isHoveredReset, setIsHoveredReset] = useState(false);

    const handleStartPipeline = async () => {
        setErrorPipeline("")
        if (pipelineStatus == "stopped") {
            const res = await startPipeline(workflowId, token)

            if ((res as ErrorResponse).error) {
                const errResponse = res as ErrorResponse;
                setErrorPipeline(errResponse.error)
            } else {
                const response = res as SuccessResponse
                setPipelineStatus(response.status);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            const resStatus = await getPipelineStatus(workflowId, token);

            if ((resStatus as ErrorResponse).error) {
                const errResponse = resStatus as ErrorResponse;
                setErrorPipeline(errResponse.error)
            } else {
                const response = resStatus as SuccessResponse
                setPipelineStatus(response.status);
            }

            return
        }

        setErrorPipeline("Process already started")
    }

    const handleStopPipeline = async () => {
        setErrorPipeline("")
        if (pipelineStatus == "running") {
            const res = await stopPipeline(workflowId, token)

            if ((res as ErrorResponse).error) {
                const errResponse = res as ErrorResponse;
                setErrorPipeline(errResponse.error)
            } else {
                const response = res as SuccessResponse
                setPipelineStatus(response.status);
            }
            return
        }

        setErrorPipeline("Process already stopped")
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: "row",
                height: '40px', // Adjust height as needed
                width: "100%",
                alignItems: 'center',
            }}
        >

            {/* Other Tabs */}
            {/* {['Blueprint 1', 'Add template', 'Run', 'Simulate', 'Save online'].map((tab, index) => (
                <div
                    onClick={() => {
                        setSelectedTab(tab)
                    }}
                    key={index}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 15px',
                        height: '100%',
                        backgroundColor: selectedTab == tab ? '#3e3e3e' : '#2c2c2c',
                        color: 'white',
                        clipPath: selectedTab == tab ? 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)' : "",
                        marginRight: '5px',
                        cursor: 'pointer',
                    }}
                >
                    {tab}
                </div>
            ))} */}

            <div
                onClick={() => {
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 15px',
                    height: '100%',
                    backgroundColor: '#3e3e3e',
                    color: 'white',
                    clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)',
                    marginRight: '5px',
                    cursor: 'pointer',
                }}
            >
                Blueprint 1
            </div>

            <div
                onClick={async () => {
                    await saveWorkflow();
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 15px',
                    height: '100%',
                    backgroundColor: isHoveredSave ? '#3e3e3e' : '#2c2c2c',
                    color: 'white',
                    marginRight: '5px',
                    cursor: 'pointer',
                }}

                onMouseEnter={() => setIsHoveredSave(true)}
                onMouseLeave={() => setIsHoveredSave(false)}
            >
                Save blueprint
            </div>
            <div
                onClick={resetWorkFlow}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 15px',
                    height: '100%',
                    backgroundColor: isHoveredReset ? '#3e3e3e' : '#2c2c2c',
                    color: 'white',
                    marginRight: '5px',
                    cursor: 'pointer',
                }}

                onMouseEnter={() => setIsHoveredReset(true)}
                onMouseLeave={() => setIsHoveredReset(false)}
            >
                Reset blueprint
            </div>

            <div
                onClick={handleStartPipeline}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 15px',
                    height: '100%',
                    backgroundColor: isHoveredStart ? '#3e3e3e' : '#2c2c2c',
                    color: 'white',
                    marginLeft: 'auto',
                    cursor: 'pointer',

                }}
                onMouseEnter={() => setIsHoveredStart(true)}
                onMouseLeave={() => setIsHoveredStart(false)}
            >
                Start
            </div>
            <div
                onClick={handleStopPipeline}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 15px',
                    height: '100%',
                    backgroundColor: isHoveredStop ? '#3e3e3e' : '#2c2c2c',
                    color: 'white',
                    marginLeft: '5px',
                    cursor: 'pointer',
                }}
                onMouseEnter={() => setIsHoveredStop(true)}
                onMouseLeave={() => setIsHoveredStop(false)}
            >
                Stop
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 15px',
                    height: '100%',
                    backgroundColor: '#2c2c2c',
                    color: 'white',
                    marginLeft: '5px',
                }}

            >
                Status: {pipelineStatus.charAt(0).toUpperCase() + pipelineStatus.slice(1)}
            </div>
        </div>
    );
};

export default TabNavigation;
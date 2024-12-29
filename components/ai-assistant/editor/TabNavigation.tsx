import React from 'react';

const TabNavigation = ({ saveWorkflow, resetWorkFlow }: { saveWorkflow: () => void, resetWorkFlow: () => void }) => {


    // const [selectedTab, setSelectedTab] = useState<string>("Blueprint 1");


    return (
        <div
            style={{
                display: 'flex',
                height: '40px', // Adjust height as needed
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
                    // window.location.reload();
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 15px',
                    height: '100%',
                    backgroundColor: '#2c2c2c',
                    color: 'white',
                    marginRight: '5px',
                    cursor: 'pointer',
                }}
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
                    backgroundColor: '#2c2c2c',
                    color: 'white',
                    marginRight: '5px',
                    cursor: 'pointer',
                }}
            >
                Reset blueprint
            </div>
        </div>
    );
};

export default TabNavigation;
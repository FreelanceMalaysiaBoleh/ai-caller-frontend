import React, { useState } from 'react';

const TabNavigation = () => {

    const [selectedTab, setSelectedTab] = useState<string>("Blueprint 1");
    return (
        <div
            style={{
                display: 'flex',
                height: '40px', // Adjust height as needed
                alignItems: 'center',
            }}
        >

            {/* Other Tabs */}
            {['Blueprint 1', 'Add template', 'Run', 'Simulate', 'Save online'].map((tab, index) => (
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
            ))}
        </div>
    );
};

export default TabNavigation;
import React from 'react';

const Tabs = ({tabs = [], setSelectedTab, selectedTab}) => {
    return (
        <div className={"Tab-Navigation Horizontal-Flex-Container"}>
            {tabs.map(tab => (
                <button
                    className={`Tab-Navigation-Tab ${selectedTab === tab ? "Tab-Navigation-Selected-Tab" : ""}`}
                    onClick={() => setSelectedTab(tab)}
                    key={tab}
                >{tab}</button>
            ))}
        </div>
    );
};

export default Tabs;
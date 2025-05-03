import React, { useState } from 'react';
import CompoundTabs from './CompoundTabs';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0); // State to track the active tab

  return (
    <div>
      {/* Render tab buttons */}
      <div className="tabs">
        {
		React.Children.map(children, (child, index) => (
		<>
          <button key={index} onClick={() => setActiveTab(index)} style={{ fontWeight: activeTab === index ? 'bold' : 'normal', padding: '8px',margin: '5px',cursor: 'pointer',}}>
            {child.props.title} {/* Title comes from the child (Tab component) */}
          </button>
		      <input type="radio" name="title" onClick={()=>setActiveTab(index)} />{child.props.title}
		  </>
		  
        ))
		
	   }
      </div>

      {/* Render active tab content */}
      <div className="tab-content" style={{ marginTop: '20px' }}>
        {children[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;

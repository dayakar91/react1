import React from 'react';
import Tabs from './Tabs';
import Tab from './Tab';

const CompoundTabs = () => {
  return (
  <>
    <div>
      <h1>Reusable Tabs Component Example</h1>
      <Tabs>
        <Tab title="Tab 1">This is the content for Tab 1.</Tab>
        <Tab title="Tab 2">This is the content for Tab 2.</Tab>
        <Tab title="Tab 3">This is the content for Tab 3.</Tab>
		     <Tab title="Tab 4">This is the content for Tab 4.</Tab>
      </Tabs>
    </div>
	
	</>
  );
};

export default CompoundTabs;

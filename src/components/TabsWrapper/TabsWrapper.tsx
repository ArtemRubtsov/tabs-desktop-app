import React, { useState } from 'react';
import { Card } from 'antd';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { TabItemForm } from './TabItemForm/TabItemForm';
import { Tab } from './Tab/Tab';

type Props = {
    name: string;
};

type TabsType = { 
    id: string;
    linkName: string;
};

export const TabsWrapper: React.FC<Props> = ({ name }) => {
    const [copiedText, copiedToClipBoard] = useCopyToClipboard();
    const [tabs, setTabs] = useState<TabsType[]>([]);
    const [inputValue, setInputValue] = useState<string>('');  

    const onCopyText = () => {
        console.log(name);
        return copiedToClipBoard(name);
    };

    const addTab = (tabName: string, id: string) => {
        setTabs([...tabs, { id, linkName: tabName }]);
    };

    const updateTab = (id: string, newLinkName: string) => {
        setTabs(tabs.map(tab => tab.id === id ? { ...tab, linkName: newLinkName } : tab));
    };

    return (
        <>
            <Card title="Card Title">
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {tabs.map((tab) => (
                        <Tab 
                            key={tab.id} 
                            id={tab.id}
                            linkName={tab.linkName} 
                            setInputValue={setInputValue} 
                            value={inputValue} 
                            updateTab={updateTab}
                        /> 
                    ))}
                    <TabItemForm setInputValue={setInputValue} inputValue={inputValue} addTab={addTab} />
                </div>
            </Card>
        </>
    );
};


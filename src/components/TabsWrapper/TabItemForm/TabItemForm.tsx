import React, { useState } from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import { v1 } from "uuid";

const gridStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: '10px', 
    marginBottom: '10px', 
};

const containerStyle: React.CSSProperties = {
    display: 'flex', 
    flexWrap: 'wrap', 
    alignItems: 'center'
};

type Props = {
    addTab: (tab: string, id: string) => void;
    setInputValue: (value: string) => void;
    inputValue: string;
};

export const TabItemForm: React.FC<Props> = ({ addTab, setInputValue, inputValue }) => {
    const [link, setLink] = useState<boolean>(false);

    const clickHandler = () => {
        setLink(!link);
    };

    const addTabCallback = () => {
        if (!inputValue.trim()) return; 
        const id = v1();
        clickHandler();
        addTab(inputValue, id);
        setInputValue('');
    };

    return (
        <div style={containerStyle}>
            <Card.Grid style={gridStyle}>
                {link ? (
                    <Button 
                        style={{ border: 'none' }} 
                        onClick={clickHandler}  
                        icon={<PlusCircleTwoTone style={{ fontSize: '24px' }} twoToneColor="#52c41a" />} 
                    />
                ) : (
                    <div style={{ display: 'flex' }}>
                        <Input 
                            onChange={(e) => setInputValue(e.target.value)} 
                            style={{ maxWidth: '250px', marginRight: '15px' }} 
                            placeholder="Basic usage" 
                        /> 
                        <Button 
                            style={{ border: 'none' }} 
                            onClick={addTabCallback}  
                            icon={<PlusCircleTwoTone style={{ fontSize: '24px' }} twoToneColor="#00718b" />} 
                        />
                    </div>
                )}
            </Card.Grid>
        </div>
    );
};


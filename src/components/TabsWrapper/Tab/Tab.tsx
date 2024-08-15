import React, { useState } from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Button, Card, Input } from "antd";

const gridStyle: React.CSSProperties = {
    width: 'auto',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px',
};

type Props = {
    id: string;
    linkName: string;
    setInputValue: (value: string) => void;
    value: string;
    updateTab: (id: string, newLinkName: string) => void;
};

export const Tab: React.FC<Props> = ({ id, linkName, setInputValue, value, updateTab }) => {
    const [editMode, setEditMode] = useState(false);
    const handleBlur = () => {
        if (!value.trim()) return;
        setEditMode(false);
        updateTab(id, value);  
    };

    return (
        <>
            <Card.Grid style={gridStyle}>
                {editMode ? (
                    <div style={{ display: 'flex' }}>
                        <Input 
                            value={value}
                            onBlur={handleBlur} 
                            onChange={(e) => setInputValue(e.target.value)}
                        /> 
                        <Button 
                            style={{ border: 'none' }} 
                            icon={<PlusCircleTwoTone style={{ fontSize: '24px', marginLeft: '15px' }} twoToneColor='#00718b' />} 
                        />
                    </div>
                ) : (
                    <Button type="link" onDoubleClick={() => setEditMode(true)}>
                        {linkName}
                    </Button>
                )}
            </Card.Grid>
        </>
    );
};



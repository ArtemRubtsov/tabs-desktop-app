import { CheckCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import { useState } from "react";


const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
    cursor: 'pointer'
  };


type Props ={
    addTab: (tab: string) => void
}

export const TabItemForm = ({addTab}: Props) => {

    const [iputValue, setInputValue] = useState<string>('')

    const [link, setLink] = useState<boolean>(false)
    const clickHandler = () => {
        setLink(!link)
    }

    const addTabCallback = () => {
        clickHandler()
        addTab(iputValue)
        setInputValue('')
    }

  return (
    <>
        <Card.Grid style={gridStyle}>
            {
                link ? <Button style={{border: 'none'}} 
                        onClick={clickHandler}  
                        icon={<PlusCircleTwoTone 
                        style={{fontSize: '24px'}} 
                        twoToneColor="#52c41a"/>} >
                     </Button>
                : 
                <div style={{display: 'flex'}}>
                    <Input onChange={(e) => setInputValue(e.target.value)} style={{maxWidth: '250px', marginRight: '30px'}} placeholder="Basic usage" /> 
                    <Button style={{border: 'none'}} 
                            onClick={addTabCallback}  
                            icon={<PlusCircleTwoTone 
                            style={{fontSize: '24px', }} 
                            twoToneColor={link ? '' : '#00718b'}/>} >
                    </Button>
                </div>
            }
        </Card.Grid>
    </>
  )
}

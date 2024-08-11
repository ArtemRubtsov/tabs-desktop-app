import { PlusCircleTwoTone} from '@ant-design/icons';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Card } from 'antd';
import { TabItemForm } from './TabItemForm/TabItemForm';
import { useState } from 'react';
import { Tab } from './Tab/Tab';


type Props = {
    name: string
}

type tabs = { 
  id: string;
  linkName: string;
}

export const TabsWrapper = ({name}: Props) => {
   const  [copiedText, copiedToClipBoard] = useCopyToClipboard()
   const [tabs, setTabs] = useState<tabs[]>([])

    const onCopyText = () => {
        console.log(name)
        return copiedToClipBoard(name)
    }
    const addTab = (tabName: string, id: string) => {
      setTabs([...tabs, {id, linkName: tabName}])
    }

  return (
    <>
      <Card title="Card Title">
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {tabs.map((tab) => {
              return (
                <Tab key={tab.id} linkName={tab.linkName}/> 
              )
            })}
          <TabItemForm addTab={addTab}/>
        </div>
      </Card>
    </>
  )
}

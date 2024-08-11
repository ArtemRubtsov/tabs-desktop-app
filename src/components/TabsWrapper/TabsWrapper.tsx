import { PlusCircleTwoTone} from '@ant-design/icons';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Card } from 'antd';
import { TabItemForm } from './Tab/TabItemForm';
import { useState } from 'react';

const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
    cursor: 'pointer'
  };


type Props = {
    name: string
}

export const TabsWrapper = ({name}: Props) => {
   const  [copiedText, copiedToClipBoard] = useCopyToClipboard()

   const [tabs, setTabs] = useState<string[]>([])

    const onCopyText = () => {
        console.log(name)
        return copiedToClipBoard(name)
    }
    const addTab = (tab: string) => {
      setTabs([...tabs, tab])
    }

  return (
    <>
      <Card title="Card Title">
        <TabItemForm addTab={addTab}/>
      </Card>
    </>
  )
}

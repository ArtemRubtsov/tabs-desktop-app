import { Button, Card } from "antd"


const gridStyle: React.CSSProperties = {
    width: 'auto',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px'
};

type Props = {
    linkName: string;
}

export const Tab = ({linkName}: Props) => {
  return (
    <>
        <Card.Grid style={gridStyle}>
            <Button type="link">
                {linkName}
            </Button>
        </Card.Grid>
    </>
  )
}

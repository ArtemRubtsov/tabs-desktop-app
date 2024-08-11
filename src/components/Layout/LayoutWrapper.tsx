import {useState} from 'react';
import {Menu, Layout, Button, theme} from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { items } from '../Menu/Menu';
import {TabsWrapper} from '../TabsWrapper/TabsWrapper';


type LayuotWrapperType = {
    auth: (auth: boolean) => void
}

export const LayoutWrapper = ({auth}: LayuotWrapperType) => {
    const { Header, Sider, Content, Footer } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    return (
       <>
           <Layout>
               <Sider trigger={null} collapsible collapsed={collapsed} >
                   <div className="demo-logo-vertical" />
                   <Menu items={items} mode='inline' theme='dark' />
               </Sider>
               <Layout>
                
                   <Header title={'test'} style={{ padding: 0, background: colorBgContainer }}>
                       <Button
                           type="text"
                           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                           onClick={() => setCollapsed(!collapsed)}
                           style={{
                               fontSize: '16px',
                               width: 64,
                               height: 64,
                           }}
                       />
                   </Header>
                   <Content
                       style={{
                           margin: '24px 16px',
                           padding: 24,
                           minHeight: 980,
                           background: colorBgContainer,
                           borderRadius: borderRadiusLG,
                       }}
                   >
                       <TabsWrapper name='jqefiopjweopfijwpfowjeopfjw'/>
                   </Content>
               </Layout>
           </Layout>
       </>
    );
};
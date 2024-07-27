import {useState} from 'react';
import {Menu, Layout, Button, theme} from "antd";
import {
    ChromeOutlined,
    GithubOutlined,
    JavaScriptOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PoweroffOutlined
} from "@ant-design/icons";

type LayuotWrapperType = {
    auth: (auth: boolean) => void
}

export const LayoutWrapper = ({auth}: LayuotWrapperType) => {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    return (
       <>
           <Layout>
               <Sider trigger={null} collapsible collapsed={collapsed}>
                   <div className="demo-logo-vertical" />
                   <Menu
                       theme="dark"
                       mode="vertical"
                       defaultSelectedKeys={['1']}
                       items={[
                           {
                               key: '1',
                               icon: <ChromeOutlined />,
                               label: 'nav 1',
                           },
                           {
                               key: '2',
                               icon: <GithubOutlined />,
                               label: 'nav 2',
                           },
                           {
                               key: '3',
                               icon: <JavaScriptOutlined />,
                               label: 'nav 3',
                           },
                           {
                            key: '4',
                            icon: <PoweroffOutlined />,
                            label: <Button type='primary' danger onClick={() => auth(false)}>Logout</Button>
                           }
                       ]}
                   />
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
                       Content

                   </Content>

               </Layout>
           </Layout>
       </>
    );
};
import React, { useState } from 'react';
import {Row, Col, Layout} from 'antd';
import { LayoutWrapper } from './components/Layout/LayoutWrapper';
import { Auth } from './components/Auth/Auth';



const App: React.FC = () => {

    const [isAuth, setAuth] = useState(false)

    return (
        <>
            {isAuth ?
                <LayoutWrapper auth={setAuth}/> :
                <Layout style={{minHeight: '100vh', backgroundColor: 'ghostwhite'}}>
                    <Row justify={'center'} align={'middle'} style={{height: '100vh'}}>
                        <Col><Auth auth={setAuth}/></Col>
                    </Row>
                </Layout>
            }
        </>
    );
};

export default App;
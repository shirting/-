import './App.css';
import 'antd/dist/antd.min.css';
import './assets/css/Layout.css'
import {Layout, Menu} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {useState} from "react";
import MainPage from "./component/mainPage";
// import MyStockChart from "./component/highcharts/charts";

function getItem(label, key, icon, children, theme) {
    return {
        key,
        icon,
        children,
        label,
        theme,
    };
}
    function App() {

        const [theme, setTheme] = useState('light');
        const [current, setCurrent] = useState('java');
        const changeTheme = (value) => {
            setTheme(value ? 'dark' : 'light');
        };
        const onClick = (e) => {
            setCurrent(e.key);
        };
        const items = [
            getItem('Java', 'java'),
            getItem('Python', 'python'),
            getItem('Go', 'go'),
        ];
  return (
      <div className='mainPage'>
          <Layout className='mainPage'>
              <Header className='header'>编程语言为java 的项目中出现最多的关键字</Header>
              <Layout className='layout'>
                  {/*<Sider  className='left-slider'>*/}
                  {/*    <Menu*/}
                  {/*        onClick={onClick}*/}
                  {/*        style={{*/}
                  {/*            width: 256,*/}
                  {/*        }}*/}
                  {/*        defaultOpenKeys={['sub1']}*/}
                  {/*        selectedKeys={[current]}*/}
                  {/*        mode="vertical"*/}
                  {/*        theme="dark"*/}
                  {/*        items={items}*/}
                  {/*    />*/}
                  {/*</Sider>*/}
                  <Content  className='content'>
                      <MainPage language={current}></MainPage>
                  </Content>
              </Layout>
              {/*<Footer class="footer">底部</Footer>*/}
          </Layout>
      </div>
  );
}

export default App;
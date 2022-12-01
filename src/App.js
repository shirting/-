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
        const [current, setCurrent] = useState('r');
        const changeTheme = (value) => {
            setTheme(value ? 'dark' : 'light');
        };
        const onClick = (e) => {
            setCurrent(e.key);
        };
        const items = [
            getItem('r', 'r'),
            getItem('ruby', 'ruby'),
            getItem('rust', 'rust'),
            getItem('Java', 'java'),
            getItem('Python', 'python'),
            getItem('Go', 'go'),
            getItem('JavaScript', 'javascript'),
            getItem('swift', 'swift'),
            getItem('php', 'php'),
            getItem('Scala', 'scala'),
            getItem('c', 'c'),

        ];
    const urlParams = new URL(window.location.href);
    const pathname = urlParams.search.split("=")[1];
  return (
      <div className='mainPage'>
          <Layout className='mainPage'>
              {/*<Header className='header'>编程语言为{pathname}的项目中出现最多的关键字</Header>*/}
              <div className='header'>
                  <Sider className='left-slider' >
                      <Menu
                          onClick={onClick}
                          defaultOpenKeys={['sub1']}
                          selectedKeys={[current]}
                          mode="horizontal"
                          theme="dark"
                          items={items}
                      />
                  </Sider>
              </div>
              <Layout className='layout'>
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

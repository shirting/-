import React, {Component} from 'react'
import MyStockChart from "./highcharts/charts";
import Wordle from "./wordle";
import axios from "axios";
import "../assets/css/MainPage.css"
class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: props.language,
            data:[{lan:"test",count:0}]
        }
    }
    componentDidMount() {
        console.log("DOM挂载后，已经渲染了：componentDidMount")
        this.getData(this.state.language)
    }
    componentWillReceiveProps(newProps) {
        console.log("组件收到新的props：componentWillReceiveProps：" + newProps)
        // console.log(newProps)
        this.getData(newProps.language);
    }
    getData = (language) => {
        axios(axios.defaults.baseURL + "rank/get?num=100"
        ).then((res) => {
            /******假数据[{name:"python0",count:1000}{name:"python0",count:1000}{name:"python0",count:1000}]****/
            console.log(res)
            // var num = (parseInt(Math.random() * 200));
            // var result = [];
            // for (var i = 0; i < num; i++) {
            //     var count = (parseInt(Math.random() * 500000));
            //     var name = language + i
            //     var arr = {
            //         name: name,
            //         count: count
            //     }
            //     result.push(arr);
            // }
            var result = res.data;
            this.setState({
                language: language,
                data: result
            })
        })
    }
    render() {
        return (
            <div className="baseStyle">
                <div className="word-cloud-wrap">
                    {/*<div>{this.state.language}</div>*/}
                    <Wordle language={this.state.language} data={this.state.data}></Wordle>
                    {/*<MyStockChart language={prop.language}></MyStockChart>*/}</div>
            </div>
        )
    }
}

export default MainPage
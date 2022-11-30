import React, {Component} from 'react'
import MyStockChart from "./highcharts/charts";
import Wordle from "./wordle";
import DynamicSortChart from "./DynamicSortChart";
import StaticWordle from "./StaticWordle";
import axios from "axios";
import "../assets/css/MainPage.css"
class MainPage extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            //词云
            language: prop.language,
            data: [{name: "java", weight: 1}],
            // 动态排序柱状图
            chartData: [],
            //静态词云
            staticData:[],
            maskImage:null
        }
    }

    componentDidMount() {
        // 词云
        // this.getWordleData(this.state.language)
        // 动态排序柱状图
        this.getChartData(this.state.language)
        // 静态词云
        this.getStaticWordleData(this.state.language)
        // var maskImage2 = new Image();
        // // 此为词云图呈现形状的图片base64码，可选，可以自定义图片
        // maskImage2.src =
        //     "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjE4MywyOTcuMDY1Yy0xNS45ODUtMTkuODkzLTM2LjI2NS0zMi42OTEtNjAuODE1LTM4LjM5OWM3LjgxLTExLjk5MywxMS43MDQtMjUuMTI2LDExLjcwNC0zOS4zOTkgICBjMC0yMC4xNzctNy4xMzktMzcuNDAxLTIxLjQwOS01MS42NzhjLTE0LjI3My0xNC4yNzItMzEuNDk4LTIxLjQxMS01MS42NzUtMjEuNDExYy0xOC4yNzEsMC0zNC4wNzEsNS45MDEtNDcuMzksMTcuNzAzICAgYy0xMS4yMjUtMjcuMDI4LTI5LjA3NS00OC45MTctNTMuNTI5LTY1LjY2N2MtMjQuNDYtMTYuNzQ2LTUxLjcyOC0yNS4xMjUtODEuODAyLTI1LjEyNWMtNDAuMzQ5LDAtNzQuODAyLDE0LjI3OS0xMDMuMzUzLDQyLjgzICAgYy0yOC41NTMsMjguNTQ0LTQyLjgyNSw2Mi45OTktNDIuODI1LDEwMy4zNTFjMCwyLjg1NiwwLjE5MSw2Ljk0NSwwLjU3MSwxMi4yNzVjLTIyLjA3OCwxMC4yNzktMzkuODc2LDI1LjgzOC01My4zODksNDYuNjg2ICAgQzYuNzU5LDI5OS4wNjcsMCwzMjIuMDU1LDAsMzQ3LjE4YzAsMzUuMjExLDEyLjUxNyw2NS4zMzMsMzcuNTQ0LDkwLjM1OWMyNS4wMjgsMjUuMDMzLDU1LjE1LDM3LjU0OCw5MC4zNjIsMzcuNTQ4aDMxMC42MzYgICBjMzAuMjU5LDAsNTYuMDk2LTEwLjcxNSw3Ny41MTItMzIuMTIxYzIxLjQxMy0yMS40MTIsMzIuMTIxLTQ3LjI0OSwzMi4xMjEtNzcuNTE1ICAgQzU0OC4xNzIsMzM5Ljc1Nyw1NDAuMTc0LDMxNi45NTIsNTI0LjE4MywyOTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
        // this.setState({
        //     maskImage:maskImage2
        // })
    }

    componentWillReceiveProps(newProps) {
        //词云
        // this.getWordleData(newProps.language);
        // 动态排序柱状图
        this.getChartData(newProps.language)
        // 静态词云
        this.getStaticWordleData(newProps.language)
    }

    getStaticWordleData = (language) => {
        axios.post(axios.defaults.baseURL, {
                "language": language,
                "total": 100
            }
        ).then((res) => {
            var result = res.data;
            let arr=[];
            result.forEach(item=>{
                var obj={};
                obj.name=item.name;
                obj.weight=item.count
                arr.push(obj)
            })
            console.log("静态词云")
            console.log(arr)
            this.setState({
                language: language,
                staticData: arr
            })
        })
    }
    getChartData = (language) => {
        var data = [];
        var chart=[];
        //数据格式：[[数值，名称，年份],[数值，名称，年份]]
        axios.post(axios.defaults.baseURL + "/range", {
                "language": language,
                "total": 100
            }
        ).then((res) => {
            var result = res.data;
            result.forEach(item=>{
               var time=item.time;
               var counter=item.topicCounter;
               counter.forEach(item2=>{
                   var arr=[];
                   arr.push(item2[Object.keys(item2)[0]])
                   arr.push(Object.keys(item2)[0])
                   arr.push(time)
                   chart.push(arr);
               })
            })
            this.setState({
                chartData: chart
            })
        })
    }
    getWordleData = (language) => {
        axios.post(axios.defaults.baseURL, {
                "language": language,
                "total": 100
            }
        ).then((res) => {
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
                {/*动态词云*/}
                {/*<div className="word-cloud-wrap">*/}
                {/*    <Wordle language={this.state.language} data={this.state.data}></Wordle>*/}
                {/*</div>*/}
                {/*静态词云*/}
                <div className="word-cloud-wrap">
                    <StaticWordle data={this.state.staticData}></StaticWordle>
                </div>
                {/*图计算：动态排序柱状图*/}
                <div className="dynamic-sort-chart">
                    <DynamicSortChart data={this.state.chartData}></DynamicSortChart>
                </div>

            </div>
        )
    }
}

export default MainPage
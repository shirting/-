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
            yearlist:[],
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
            var len=result.length>80?80:result.length
            for(var i=0;i<len;i++){
                var item = result[i]
                if(item.name!=language) {
                    var obj = {};
                    obj.name = item.name;
                    obj.weight = item.count
                    arr.push(obj)
                }
            }
            // console.log("静态词云")
            // console.log(arr)
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
            const years = [];
            for (let i = 0; i < chart.length; ++i) {
                if (years.length === 0 || years[years.length - 1] !==chart[i][2]) {
                    years.push(chart[i][2]);
                }
            }
            this.setState({
                chartData: chart,
                yearlist:years
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
                    <StaticWordle data={this.state.staticData} language={this.state.language}></StaticWordle>
                </div>
                {/*图计算：动态排序柱状图*/}
                <div className="dynamic-sort-chart">
                    <DynamicSortChart data={this.state.chartData} yearlist={this.state.yearlist}></DynamicSortChart>
                </div>

            </div>
        )
    }
}

export default MainPage
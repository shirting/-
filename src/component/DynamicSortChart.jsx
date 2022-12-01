//词云STT
import React, {useEffect, useState,Component} from 'react'
import {render} from "react-dom";
import * as echarts from 'echarts'
import "../assets/css/DynamicSortChart.css"
let chart=null
class DynamicSortChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            yearlist: [],
            timeout: [],
            updateFrequency: 500,
            index: 0,
            changed:false
        }
    }

    componentWillReceiveProps(props) {
        // console.log("componentWillReceiveProps")
        this.setState({
            data: props.data,
            index: 0,
            yearlist: props.yearlist,
            changed:true
        }, () => {
            this.render()
            this.dynamicSortChart()
        })
    }

    componentDidMount() {
        var chartDom = document.getElementById("DynamicSortChart");
        var myChart = echarts.init(chartDom, "chalk");
        //新建一个空数据的chart
        var option = {
            backgroundColor: "rgba(36,36,37)",
            grid: {
                top: 10,
                bottom: 30,
                left: 150,
                right: 80
            },
            xAxis: {
                max: 'dataMax',
                axisLabel: {
                    formatter: function (n) {
                        return Math.round(n) + '';
                    }
                }
            },
            yAxis: {
                type: 'category',
                inverse: true,
                max: 10,
                axisLabel: {
                    show: true,
                    fontSize: 14,
                    formatter: function (value) {
                        return value;
                    },
                    rich: {
                        flag: {
                            fontSize: 25,
                            padding: 5
                        }
                    }
                },
                animationDuration: 300,
                animationDurationUpdate: 300
            },
            series: [
                {
                    realtimeSort: true,
                    seriesLayoutBy: 'column',
                    type: 'bar',
                    colorBy: "data",
                    encode: {
                        x: 0,
                        y: 1
                    },
                    label: {
                        show: true,
                        precision: 1,
                        position: 'right',
                        valueAnimation: true,
                        fontFamily: 'monospace'
                    }
                }
            ],
            // Disable init animation.
            animationDuration: 0,
            animationDurationUpdate: this.state.updateFrequency,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            graphic: {
                elements: [
                    {
                        type: 'text',
                        right: 160,
                        bottom: 60,
                        style: {
                            text: "",
                            font: 'bolder 80px monospace',
                            fill: 'rgba(100, 100, 100, 0.45)'
                        },
                        z: 100
                    }
                ]
            }
        };
        myChart.setOption(option)
        //每秒刷新数据
        var updateFrequency = this.state.updateFrequency
        var that = this;
        var index = that.state.index
        setInterval(function () {
            if(that.state.changed){
                index=0;
                that.setState({
                  changed:false
                },()=>{
                    var max=that.state.yearlist.length;
                    if(index<max){
                        that.updateDate(myChart, option,index)
                        index++;
                    }else{
                        index--
                    }
                })
            }else{
                var max=that.state.yearlist.length;
                // console.log(index,max)
                that.updateDate(myChart, option,index)
                if(index<(max-1)){
                    index++;
                }
            }
        }, updateFrequency)
    }

    dynamicSortChart() {
        // this.createChart(years)
    }

    // createChart(chart,years) {
    //     var data=this.state.data
    //     var option;
    //     const updateFrequency = 1000;
    //     const dimension = 0;
    //     // const data = res1[0];
    //     let startIndex = 0;
    //     let startYear = years[startIndex];
    //     // console.log("createChart",data)
    //     // chart.update(option)
    //     let chartDom = document.getElementById("DynamicSortChart");
    //     if (chartDom.hasAttribute("_echarts_instance_")) {
    //         chartDom.removeAttribute("_echarts_instance_");
    //     }
    //     let newchart = echarts.init(chartDom, 'dark');
    //     newchart.setOption(option);
    //     for (let i = startIndex; i < years.length - 1; ++i) {
    //         (function (i) {
    //             setTimeout(function () {
    //                 updateYear(years[i + 1]);
    //             }, (i - startIndex) * updateFrequency);
    //         })(i);
    //     }
    //     function updateYear(year) {
    //         let source = data.slice(1).filter(function (d) {
    //             return d[2] === year;
    //         });
    //         option.series[0].data = source;
    //         option.graphic.elements[0].style.text = year;
    //         newchart.setOption(option);
    //     }
    //     this.setState({
    //         chart:newchart
    //     })
    // }
    updateDate(chart, option,index) {
        var data = this.state.data
        if (data.length != 0) {
            var year = this.state.yearlist[index]
            let source = data.slice(1).filter(function (d) {
                return d[2] === year;
            });
            option.series[0].data = source;
            option.graphic.elements[0].style.text = year;
            chart.setOption(option);
        }
    }

    render() {
        return (
            <div className="Chart">
                <div className="Chart" id="DynamicSortChart"></div>
            </div>
        );
    }
}

export default DynamicSortChart


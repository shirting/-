//词云STT
import React, {useEffect, useState,Component} from 'react'
import {render} from "react-dom";
import * as echarts from 'echarts'
import "../assets/css/DynamicSortChart.css"
class DynamicSortChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            chart:null
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data,
        }, () => {
                this.render()
                this.dynamicSortChart()
        })
    }

    componentDidMount() {
        var chartDom=document.getElementById("DynamicSortChart");
        // var myChart=echarts.init(chartDom, 'dark');
        var myChart=echarts.init(chartDom,"chalk");
        this.state.chart=myChart
        // this.dynamicSortChart();
    }
    dynamicSortChart(){
        var chart=this.state.chart;
        const years = [];
        for (let i = 0; i < this.state.data.length; ++i) {
            if (years.length === 0 || years[years.length - 1] !== this.state.data[i][2]) {
                years.push(this.state.data[i][2]);
            }
        }
        this.createChart(chart,years)
    }
    createChart(chart,years) {
        var data=this.state.data
        var option;
        const updateFrequency = 1000;
        const dimension = 0;
        // const data = res1[0];
        let startIndex = 0;
        let startYear = years[startIndex];
        // console.log("createChart",data)
        option = {
            backgroundColor:"rgba(36,36,37)",
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
            dataset: {
                source: data.slice(1).filter(function (d) {
                    return d[2] === startYear;
                })
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
                    colorBy:"data",
                    encode: {
                        x: dimension,
                        y:1
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
            animationDurationUpdate: updateFrequency,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            graphic: {
                elements: [
                    {
                        type: 'text',
                        right: 100,
                        bottom: 60,
                        style: {
                            text: startYear,
                            font: 'bolder 80px monospace',
                            fill: 'rgba(100, 100, 100, 0.45)'
                        },
                        z: 100
                    }
                ]
            }
        };
        // chart.update(option)
        let chartDom = document.getElementById("DynamicSortChart");
        if (chartDom.hasAttribute("_echarts_instance_")) {
            chartDom.removeAttribute("_echarts_instance_");
        }
        let newchart = echarts.init(chartDom, 'dark');
        newchart.setOption(option);
        for (let i = startIndex; i < years.length - 1; ++i) {
            (function (i) {
                setTimeout(function () {
                    updateYear(years[i + 1]);
                }, (i - startIndex) * updateFrequency);
            })(i);
        }
        function updateYear(year) {
            let source = data.slice(1).filter(function (d) {
                return d[2] === year;
            });
            option.series[0].data = source;
            option.graphic.elements[0].style.text = year;
            newchart.setOption(option);
        }
        this.setState({
            chart:newchart
        })
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


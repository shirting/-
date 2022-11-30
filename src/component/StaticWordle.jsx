import React, {Component} from 'react'
import axios from "axios";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import  HighchartsChartTem  from 'highcharts/themes/dark-unica'
import wordcloud from "highcharts/modules/wordcloud"
import "../assets/css/DynamicSortChart.css"
wordcloud(Highcharts);
HighchartsChartTem(Highcharts)
class StaticWordle extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            data:null,
            options: {
                chart:{
                    backgroundColor:"rgba(36,36,37)",
                    height:560
                },
                title: {
                    text: null
                },
                series: [{
                    type:"wordcloud",
                    data: []
                }]
            }
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        let option={
            chart:{
                backgroundColor:"rgba(36,36,37)"
            },
            title: {
                text: null
            },
            series: [{
                type:"wordcloud",
                data: newProps.data,
            }]
        }
        this.setState({
            options: option,
        }, () => {

        })
    }

    render() {
        return (
            <HighchartsReact
                className="Chart"
                highcharts={Highcharts}
                options={this.state.options}
            />
        )
    }
}

export default StaticWordle
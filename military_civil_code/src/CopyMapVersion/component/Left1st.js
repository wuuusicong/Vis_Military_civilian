import React,{Component} from "react";
import { Chart, Axis, Tooltip, Point } from 'viser-react';
import *as d3 from "d3";



class Left1st extends  Component {
    constructor(props){
        super(props);
        let data =this.props.industry_data["industry"];
        const scale2 = d3.scale.linear()
            .domain([d3.max(this.props.industry_data["industry"],(d)=>{return d["score"]}),0],)
            .range([2,10]);
        let sizeArray = data.map((item,index)=>{
            return scale2(item["score"])
        });
        this.state = {data,sizeArray};
    }

    shouldComponentUpdate() {
        return false
    }
    componentDidMount() {
    }
    colorArray(array){
        let tmp = [];
        for (let i in array){
            if (i["score"] ===99)
                tmp.push("red")
            else{
                tmp.push("#998ec3")
            }
        }
        return tmp;
    }
    render() {
//         value:"High degree of integration",fill:colors[0],marker:'diamond'},
// {value:"Moderate degree of integration",fill:colors[1],marker:'diamond'},
// {value:"Primary degree of integration",fill:colors[2],marker:'diamond'}
        const scale = [{
            dataKey: 'area',
            type: 'cat',
            values: this.props.industry_data["area_name"].map((item,index)=>{
                switch (item){
                    case"高新区":return "Gaoxin ";
                    case"涪城区":return "Fuchen ";
                    case "游仙区":return "Youxian ";
                    case "科创区":return "Kechuang ";
                }
            })
        }, {
            dataKey: 'industry',
            type: 'cat',
            values: this.props.industry_data["field_name"]
        }];
        const axis1Opts = {
            dataKey: 'area',
            line: null,
            tickLine: null,
            grid: null,
            label: {
                textStyle: {
                    fontSize: 14,
                    fill: '#555'
                },
            }
        };
        const axis2Opts = {
            dataKey: 'industry',
            line: {
                stroke: '#eee',
                lineWidth: 1
            },
            tickLine: {
                length: -10
            },
            label: {
                textStyle: {
                    fill: '#555',
                    fontSize:11
                },
                autoRotate:true,
                rotate:30,
                offset:5
            }
        };
        const pointOpts = {//ffe5b0
            position: 'industry*area',
            size: ['score', [2,8]],
            color: ['score',(d)=>{if (d===99)return "red";if (d>=88)return "#000000";else if(d>=78)return "#4e8bdc"; else return "#998ec3"}],//"#998ec3"
            opacity:0.5,
            shape: 'triangle',
        };
        console.log("industry");
        console.log(this.state.data);
        return (
            <div>
                <Chart forceFit height={210} padding={[20, 60, 100, 80]} data={this.state.data} scale={scale}>
                    <Tooltip/>
                    <Axis {...axis1Opts} />
                    <Axis {...axis2Opts} />
                    <Point {...pointOpts} onClick={this.props.receData} onMouseMove={this.props.mouseOverData} tooltip="industry*area*score"/>
                </Chart>
            </div>
        );
    }
}
export default Left1st
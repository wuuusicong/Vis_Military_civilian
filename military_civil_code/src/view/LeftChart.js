import React,{Component} from "react";
import *as d3 from "d3";
class LeftChart extends  Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.drawChart();
    }
    drawChart(){
        let leftChart = document.querySelector("#leftContainer");
        let width = leftChart.clientWidth;
        let height = leftChart.clientHeight;
        console.log("leftChart");
        console.log(height);
        console.log(leftChart);
        let linear = d3.scale.linear()
            .domain([0,5])
            .range([0,width]);
        let svg = d3.select("#leftChart");
        let g = svg.selectAll(".rect")
            .data(["高度融合","中度融合","低度融合"])
            .enter()
            .append("g");
        const rectHeight = 30;
        const rectWidth = 100;
        g.append("rect")
            .attr("x",(d,i)=>{
                return linear(i+0.2)
            })
            .attr("y",height/2)
            .attr("width",rectWidth)
            .attr("height",rectHeight)
            .attr("fill","yellow");
        g.append("text")
            .attr("x",(d,i)=>{
                return linear(i+0.2) +rectWidth/2
            })
            .attr("y",height/2+rectHeight/2+3)
            .text((d,i)=>{return d})
            .attr("fill","black")
            .attr("text-anchor","middle");
    }
    render(){
        const style = {
            width:'100%',
            height:'100%',
            // background:'#000000'
        };
        return (
            <svg id="leftChart" style={style}>

            </svg>
        )
    }
}
export default LeftChart
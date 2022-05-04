import React,{Component} from "react";
import *as P from  "popojs"
import Panel from  "popo-react-panel"
import *as d3 from "d3";
class left extends  Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        let width = document.querySelector("#leftBrush").clientWidth;
        let height = document.querySelector("#leftBrush").clientHeight;
        // console.log(width+'Pie');
        let svg  = d3.select("#leftPie");
        let dataset = [["低融合度",60],["中融合度",100],["高融合度",80]];
        let pie = d3.layout.pie()
            .startAngle(Math.PI*1.1)
            .endAngle(Math.PI*1.9)
            .value((d)=>d[1]);
        let radius = 175;
        let color = d3.scale.category20();
        let arc = d3.svg.arc()
            .innerRadius(radius)
            .outerRadius(radius*1.25);
        let arcs  = svg.selectAll(".pie_brush")
            .data(pie(dataset))
            .enter()
            .append("g")
            .attr("transform",`translate(${width*1.05},${height/2})`);
        arcs.append("path")
            .attr("fill",(d,i)=>{return "#dfeeea"})
            .attr("d",(d,i)=>{return arc(d)});
        arcs.append("text")
            .attr("transform",(d)=>{
                return `translate(${arc.centroid(d)[0]},${arc.centroid(d)[1]})`
            })
            .attr("text-anchor","middle")
            .text((d)=>{return d.data[0]})
    }
    render(){
        return (<svg id="leftPie">

        </svg>)
    }
}
export default left
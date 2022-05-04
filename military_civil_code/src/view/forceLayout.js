import React,{Component} from "react";
import *as d3 from "d3";
class forceLayout extends  Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.node = this.props.node;
        console.log("lail  mei ");
        console.log(this.state.node);
    }

    componentDidMount() {
        const circlePoint = function(x){
            x = Math.abs(x);
            let y;
            y= (1-x*x/10000)*1600;
            if (y<0){
                y= Math.abs(y);
                return -Math.sqrt(y);
            }else return Math.sqrt(y);
            // console.log("为社么y不对");
            // console.log(x);
            // return y;
        };
        let parentGG = d3.selectAll(this.props.parentName)
            .append("g")
            .attr("class", this.props.name)
            .attr("transform",`translate(${-50},${-55})`);
        let nodes = [1,2,3,4,5,6].map((item, index) => {
            return {name: index.toString()};
        });
        console.log(nodes);
        let edges = [1,2,3,4,5].map((d, i) => {
            return {source: 0, target: i + 1};
        });
        let force = d3.layout.force()
            .nodes(nodes)
            .links(edges)
            .size([30,20])
            .linkDistance(30)
            .charge(-1000);
        force.start();
        console.log(1234);
        console.log(nodes);
        console.log(edges);
        let color = d3.scale.category20();
        let lines = parentGG.selectAll(".forceLine")
            .data(edges)
            .enter()
            .append("line")
            .attr("class","forceLine");
        let circles = parentGG.selectAll(".forceCircle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class",(d)=>{
                console.log(d);
               return "forceCircle"
            })
            .attr("r",(d,i)=>{if(d.index===0)return 20;return 12})
            .style("fill",(d,i)=>{return color(i)})
            .attr("cx",function(d){ return 0; })
            .attr("cy",function(d){ return 0; })
            .attr("transform",()=>{
                return `translate(${40},${50})`;
            })
            .call(force.drag);
        force.on("start",()=>{
            console.log("开始了 ");
        });
        force.on("tick", function(){ //对于每一个时间间隔
            //更新连线坐标
            lines.attr("x1",function(d){ return d.source.x; })
                .attr("y1",function(d){ return d.source.y; })
                .attr("x2",function(d){ return d.target.x; })
                .attr("y2",function(d){ return d.target.y; });

            //更新节点坐标
            //
            circles.attr("cx",function(d){if(d.name==="0")return ; return d.x; })
                .attr("cy",function(d){ if(d.name==="0")return ; return circlePoint(d.x); });

            //更新文字坐标
            // svg_texts.attr("x", function(d){ return d.x; })
            //     .attr("y", function(d){ return d.y; });
        });

    }
    render(){
        return (<div id="forceLayout">

        </div>)
    }
}
export default forceLayout
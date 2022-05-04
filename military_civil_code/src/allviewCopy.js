import React, { Component } from 'react';
// import *as P from  "popojs"
// import Panel from  "popo-react-panel"
// import Left from "./view/left"
// import LineCenter from "./view/center";
import *as d3 from "d3";
import "./allView.css"
import BMap from  "BMap";
import styleJson from './view/variable';
import ForceLayout from "./view/forceLayout";

class allView extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.data = this.props.data;
        this.state.copyData = this.props.data;
        this.state.fourArea = this.props.forArea;
        // let Min = d3.min(this.props.data,(d)=>{
        //     return Number(d["score"])
        // });
        // console.log(Min);
        // let Max = d3.max(this.props.data,(d)=>{
        //     return Number(d["score"])
        // });
        // console.log(Max);
        // console.log(this.props.data);
    }
    componentDidMount() {
        let scale = d3.scale.linear()
            .domain([68,99])
            .range([50,230]);
        let width = document.querySelector("#container").clientWidth;
        let height = document.querySelector("#container").clientHeight;//节点的y值，但节点是拿Y值当x用
        let gTree = d3.select("#container")
            .append("svg")
            .attr("width",width)
            .attr("height",height);
        // console.log(1111111111);
        // console.log(gTree);
        // console.log(this.state);
        let root = this.state.fourArea;
        let tree = d3.layout.tree()
            .size([height,width-645])
            .separation((a,b)=>{
                return (a.parent === b.parent ? 1:2);
            });
        let nodes = tree.nodes(root);
        let links = tree.links(nodes);
        // console.log(nodes);
        // console.log(links);
        let diagonal = d3.svg.diagonal()
            .projection(function(d){return [d.y+400,d.x+3];});//d.y+表示整体向左平移 d.x+表示除了圆点和text外树状图向下平移
        let link = gTree.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class","link")
            .attr("d",diagonal)
            .attr("stroke","#fff")
            .attr("fill","none");
        let node = gTree.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class",(d)=>{
                // console.log(d);
                if(d.depth===2)return "secondParent";
                else if(d.depth===0)return "oldParent";
                else if(d.depth===1)return "parent";
                else return "node";
            })
            .attr("transform",(d)=>{
                if(!d.parent) return `translate(${d.y+280},${d.x+2})`;
                return `translate(${d.y+400},${d.x+2})`;
            });
        // let node1 = gTree.selectAll("")
        console.log(node);
        let node1 = gTree.selectAll(".node");
        let parent = gTree.selectAll(".parent");//选择二级节点
        let oldParent = gTree.selectAll(".oldParent");//选择第一个节点
        let node2 = gTree.selectAll(".secondParent");
        node1.append("circle")
            .attr("r",(d)=>{
                if(!d.parent)return 100;//修改sunBrust图的位置
                return d.children?8:2.5
            })
            .attr("id",(d)=>{
                if(!d.parent)return "mapCircle"
            })
            .attr("fill","none")
            .attr("stroke","gray");

        node1.append("rect")
            .attr("width",(d)=>{return scale(Number(d["score"]))})
            .attr("height",5)
            .attr("transform",(d)=>{
                return `translate(${10},${-2})`
            });

        node1.append("text")
            .attr("dx",(d)=>{return d.children?-8:8;})
            .attr("dy",(d)=>{
                // console.log(d);
                if(d["name"]==="绵阳")return 20;
                return 3;
            })
            .style("text-anchor",(d)=>{
                if(d["name"]==="绵阳")return "start";
                return d.children?"end":"start";
            })
            .text((d)=>{return d.name})
            .attr("class",(d)=>{
                return d.children?"parentText":"childrenText"
            })
            .attr("transform",(d)=>{
                if(d.children)return ;
                // return `translate(${scale(Number(d["score"]))},${0})`
            });
        parent.append("text")
            .attr("dx",(d)=>{return d.children?-8:8;})
            .attr("dy",(d)=>{
                // console.log(d);
                if(d["name"]==="绵阳")return 20;
                return 3;
            })
            .style("text-anchor",(d)=>{
                if(d["name"]==="绵阳")return "start";
                return d.children?"end":"start";
            })
            .text((d)=>{return d.name})
            .attr("class",(d)=>{
                return d.children?"parentText":"childrenText"
            })
            .attr("transform",(d)=>{
                if(d.children)return ;
                // return `translate(${scale(Number(d["score"]))},${0})`
            });
        let map = new BMap.Map("mapContainer");
        map.enableScrollWheelZoom(true);
        // map.setMapStyle({styleJson:styleJson});
        map.centerAndZoom(new BMap.Point(104.73 , 31.47), 14); // 初始化地图,设置中心点坐标和地图级别
        this.drawSunbrust(gTree,oldParent);
        this.setState({node:parent,
            node2:node2});
    }
    drawSunbrust(gTree,node){
        console.log("parent在哪");
        console.log(gTree);
        // console.log()
        const data = {
            "绵阳市": {
                "涪城区": {
                    "电子": {
                        "计算机制造": 3534,
                        "计算机研发": 5731,
                        "可视分析": 7840,
                        "信息可视化": 5914,
                        "科学可视化": 3416,
                    },
                    "计算机": {
                        "计算机制造": 3534,
                        "计算机研发": 5731,
                        "可视分析": 7840,
                        "信息可视化": 5914,
                        "科学可视化": 3416,
                    },
                    "卫星设备": {
                        "卫星制造": 7074,
                        "卫星制造1": 3000,
                        "卫星制造2": 1000,
                        "卫星制造3": 4000,
                    }
                },
                "高新区": {
                    "计算机制造": 3534,
                    "计算机研发": 5731,
                    "可视分析": 7840,
                    "信息可视化": 5914,
                    "科学可视化": 3416,
                },
                "科创区": {
                    "科学可视化": 3416
                },
                "游仙区": {
                    "计算机制造": 3534,
                    "计算机研发": 5731,
                    "可视分析": 7840,
                    "信息可视化": 5914,
                    "科学可视化": 3416,
                    "信息可视化": 5914,
                    "科学可视化": 3416,
                },
            },
            "flare2":{
                "animate": {
                    "Easing": 17010,
                    "FunctionSequence": 5842,
                    "interpolate": {
                        "ArrayInterpolator": 1983,
                        "ColorInterpolator": 2047,
                        "DateInterpolator": 1375,
                        "Interpolator": 8746,
                        "MatrixInterpolator": 2202,
                        "NumberInterpolator": 1382,
                        "ObjectInterpolator": 1629,
                        "PointInterpolator": 1675,
                        "RectangleInterpolator": 2042
                    },
                    "ISchedulable": 1041,
                    "Parallel": 5176,
                    "Pause": 449,
                    "Scheduler": 5593,
                    "Sequence": 5534,
                    "Transition": 9201,
                    "Transitioner": 19975,
                    "TransitionEvent": 1116,
                    "Tween": 6006
                },
            },
            "flare5":{
                "animate": {
                    "Easing": 17010,
                    "FunctionSequence": 5842,
                    "interpolate": {
                        "ArrayInterpolator": 1983,
                        "ColorInterpolator": 2047,
                        "DateInterpolator": 1375,
                        "Interpolator": 8746,
                        "MatrixInterpolator": 2202,
                        "NumberInterpolator": 1382,
                        "ObjectInterpolator": 1629,
                        "PointInterpolator": 1675,
                        "RectangleInterpolator": 2042
                    },
                    "ISchedulable": 1041,
                    "Parallel": 5176,
                    "Pause": 449,
                    "Scheduler": 5593,
                    "Sequence": 5534,
                    "Transition": 9201,
                    "Transitioner": 19975,
                    "TransitionEvent": 1116,
                    "Tween": 6006
                },
            },
            "flare3":{
                "animate": {
                    "Easing": 17010,
                    "FunctionSequence": 5842,
                    "interpolate": {
                        "ArrayInterpolator": 1983,
                        "ColorInterpolator": 2047,
                        "DateInterpolator": 1375,
                        "Interpolator": 8746,
                        "MatrixInterpolator": 2202,
                        "NumberInterpolator": 1382,
                        "ObjectInterpolator": 1629,
                        "PointInterpolator": 1675,
                        "RectangleInterpolator": 2042
                    },
                    "ISchedulable": 1041,
                    "Parallel": 5176,
                    "Pause": 449,
                    "Scheduler": 5593,
                    "Sequence": 5534,
                    "Transition": 9201,
                    "Transitioner": 19975,
                    "TransitionEvent": 1116,
                    "Tween": 6006
                },
            }
        };
        var w = 650,
            h = 650,
            r = Math.min(w, h) / 2,
            color = d3.scale.category20c();

        var partition = d3.layout.partition()
            .sort(null)
            .size([2 * Math.PI/2,r*r/3])
            .children(function(d) { return isNaN(d.value) ? d3.entries(d.value) : null; })
            .value(function(d) { return d.value; });

        var arc = d3.svg.arc()
            .startAngle(function(d) { return d.x; })
            .endAngle(function(d) { return d.x + d.dx; })
            .innerRadius(function(d) { return Math.sqrt(d.y)+100; })
            .outerRadius(function(d) { return Math.sqrt(d.y + (d.dy-20)); });
        let json = data;
        console.log(json);
        var g = node.data(d3.entries(json))
            .selectAll("oldParent")
            .data(partition)
            .enter().append("svg:g")
            .attr("transform",`translate(${-15},${0})`)
            .attr("display", function(d) { return d.depth ? null : "none"; }); // hide inner ring
        g.append("svg:path")
            .attr("d", arc)
            .attr("stroke", "#fff")
            .attr("fill", function(d) {return color((d.children ? d : d.parent).key); })
            .attr("fill-rule", "evenodd");

        g.append("svg:text")
            .attr("transform", function(d) { return "rotate(" + (d.x + d.dx / 2 - Math.PI / 2) / Math.PI * 180 + ")"; })
            .attr("x", function(d) { return Math.sqrt(d.y)+50; })
            .attr("dx", "6") // margin
            .attr("dy", ".35em") // vertical-align
            .text(function(d) { return d.key; });
    }
    render() {
        const style = {
            width:'100%',
            height:'100%'
        };
        // console.log("节点来了嘛");
        // console.log(this.state.node);
        return (
            <div id="container" style={style}>
                <div id="mapContainer"></div>
                {/*{this.state.node?<ForceLayout node={this.state.node} name="parentGG" parentName=".parent"/>:null}*/}
                {this.state.node2?<ForceLayout node={this.state.node2} name="parentGG2" parentName=".secondParent"/>:null}
            </div>
        );
    }
}

export default allView;

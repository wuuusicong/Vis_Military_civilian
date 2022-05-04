import React, { Component } from 'react';
import *as d3 from "d3";
import "./allView.css"
// import BMap from  "BMap";
// import styleJson from './view/variable';
import ForceLayout from "./view/forceLayout";
import LeftPie from "./view/left"
import LeftChart from "./view/LeftChart"
import ContainerLeft from "./component/Left.js"
import LeafLet from "./component/LeafLet.js"
import ContainerRight from "./component/Right.js"
import TopOne from "./component/TopOne";
import TimeLine from "./component/TimeLine";


class allView extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.data = this.props.data;
        this.state.copyData = this.props.data;
        this.state.LeafLet = this.props.LeafLet;
        // this.state.fourArea = this.props.fourArea;
        this.state.firmData = this.props.firmData;
        this.state.civil_data = this.props.civil_data;
        this.state.industry_data = this.props.industry_data; //为civil_industry_data.json的所有数据
        this.state.fourAreaData  = this.props.fourAreaData;
    }
   componentDidMount() {
       let scale = d3.scale.linear()
           .domain([68,99])
           .range([50,230]);
       let width = document.querySelector("#container").clientWidth;
       let height = document.querySelector("#container").clientHeight;//节点的y值，但节点是拿Y值当x用
       console.log(55555);
       const storeObject = this.drawCircle(this.state.firmData);
       console.log(storeObject);
       this.drawTimeLine(storeObject);
        }
    drawCircle(data2){
        let width = document.querySelector("#canvas_circle").clientWidth;
        let height = document.querySelector("#canvas_circle").clientHeight;
        let filterData = [];
        let MaxS = Math.max.apply(Math,data2.map((item,index)=>{return item["score"]}));
        let MinS = Math.min.apply(Math,data2.map((item,index)=>{return item["score"]}));
        let Max = Math.max.apply(Math,data2.map((item,index)=>{return Math.log(item["capital"])}));
        let Min = Math.min.apply(Math,data2.map((item,index)=>{return Math.log(item["capital"])}));
        let capital_r = d3.scale.linear()
            .domain([Number(Min),Number(Max)])
            .range([1,10]);
        let score_point = d3.scale.linear()
            .domain([MinS,MaxS])
            .range([0,1]);
        let g_circle_data = [68,80,99];
        let data = data2.map((item,index)=>{
            let capital = Number(Math.log(item["capital"]));
            // if (item["capital"]<100){
            //  capital = capital*100
            // }
            let score = item["score"];
            let tmpItem = {
                x2:score_point(score) * (width +10),
                r2:capital_r(capital)+2,
                point:score_point(score),
                other:item["score"],
                city:item["name"],
                capital:item["capital"]
                // color:item["city"]
            };
            for (let j=0;j<=g_circle_data.length;j++){
                if (score ===g_circle_data[j]){
                    g_circle_data[j] = tmpItem
                }
            }
            return  tmpItem;
        });
        console.log(data);
        let clrKey = {
            "gaoxin":"#ffffff",
            "youxian":"#998ec3",
            "fuchen":"#4e8bdc",
            "kechuang":"#ffe5b0"
        };
        // draw packed circles and the central line
        var clr2 = d3.scale.ordinal()
            .domain(["gaoxin","youxian","fuchen","kechuang"])
            .range(["#ffffff",  "#998ec3","#4e8bdc","#2bff9e"]);
        // var clr = d3.scale.linear()
        //     .domain([0, 0.5, 1])
        //     .range(["#ffffff",  "#998ec3"]);
        var clr = d3.scale.linear()
            .domain([66, 77,88,99])
            // .range(["#ffffff","#c165dd","#5c27f1"]);
            .range(["#ffffff", "#D5E5FF","#8EB9FF","#4e8bdc"]);
        var threshold = 0;
        var pack = window.xpack()
            .xpos(function(d){return d.x2;})
            .radius(function(d){return d.r2;})
            .score(function(d){return d.point;});
        var packed = pack(data, threshold);
        let nodes = packed.nodes;
        // data2.forEach((item,index)=>{
        //     nodes[index]["scoreNu"] = item["score"]
        // });
        console.log(nodes);
        console.log(clr(70));
        if(height < packed.rect.yMax - packed.rect.yMin)
            height = packed.rect.yMax - packed.rect.yMin;
        if(width < packed.rect.xMax - packed.rect.xMin)
            width = packed.rect.xMax - packed.rect.xMin;
        var container = d3.select("#canvas_circle")
            .append("svg")
            .attr("id","svg_pack")
            .attr("width", width + 40)
            .attr("height", height+20 );
        var drawing = container.append("g")
            .attr("transform", "translate(10," + (height / 2 + 20) + ")");
        drawing.append("line")
            .attr("class", "xline")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", 0)
            .attr("y2", 0);
        let circle_tooltip = drawing.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("cx", function(d) {return d.px;})
            .attr("cy", function(d) {return d.py;})
            .attr("r", function(d) {return d.r;})
            .style("fill", function(d) {return clr(d["other"]);});
        console.log(g_circle_data);
        //下面是画三个圆标识渐变和资本

        // draw outline ribbons
        var hist = d3.layout.histogram().bins(40).range([0, width]);
        hist.value(pack.xpos());
        var outlineSample = hist(data.filter(function(u) {return u.point < threshold;}))
            .map(function(bin) {
                return {x: bin.x + bin.dx / 2, y: bin.y};
            });
        hist.value(function(u) {return u.px;});
        hist(packed.outline.up).forEach(function (bin, i) {
            if (bin.y != 0)
                outlineSample[i].up = d3.min(bin, function(d) {return d.py - d.r;});
            else
                outlineSample[i].up = 0;
        });
        hist(packed.outline.down).forEach(function (bin, i) {
            if (bin.y != 0)
                outlineSample[i].down = d3.max(bin, function(d) {return d.py + d.r;});
            else
                outlineSample[i].down = 0;
        });
        var outlineChart = [
            d3.svg.area().interpolate("monotone")
                .x(function(d) {return d.x;})
                .y1(function(d) {return d.up - d.y+5;})
                .y0(function(d) {return d.up;}),
            d3.svg.area().interpolate("monotone")
                .x(function(d) {return d.x;})
                .y1(function(d) {return d.down + d.y+5;})
                .y0(function(d) {return d.down;}),
        ];
        var ribbons = drawing.selectAll(".ribbon")
            .data([outlineSample, outlineSample]);
        ribbons.enter().append("path")
            .attr("class", "ribbon")
            .attr("d", function(d, i) {return outlineChart[i](d);});
        this.tooltip(circle_tooltip);
        return {
            packed:packed,
            width
        }
    }
    drawTimeLine({packed, width}){
        var clr = d3.scale.linear()
            .domain([66, 77,88,99])
            // .range(["#ffffff","#c165dd","#5c27f1"]);
            .range(["#ffffff", "#D5E5FF","#8EB9FF","#4e8bdc"]);
        let obj = {};
        let nodesDetect = packed.nodes.reduce((cur,next)=>{
            if (!obj[next["other"]]){
                obj[next["other"]] = true;
                cur.push(next);
            }
            return cur;
        },[]);
        let num = 68*78*88*99;
        let filterNode = nodesDetect.filter((item,index)=>{
            if(item["other"]===72)return false;
            return !(num%item["other"])
        });
        let svgLine = d3.select("#LineSvg")
            .attr("width",width+40)
            .attr("height",80);
        let svg_g = svgLine.append("g")
            .attr("transform","translate(10,10)");

        var defs = svg_g.append("defs");
        let linearColor = ["#ffffff", "#D5E5FF","#8EB9FF","#4e8bdc"];
        var linearGradient = defs.append("linearGradient")
            .attr("id","linearColor")
            .attr("x1","0%")
            .attr("y1","0%")
            .attr("x2","100%")
            .attr("y2","0%");

        var stop1 = linearGradient.append("stop")
            .attr("offset","0%")
            .style("stop-color",linearColor[0]);
        var stop2 = linearGradient.append("stop")
            .attr("offset","33%")
            .style("stop-color",linearColor[1]);
        var stop3 = linearGradient.append("stop")
            .attr("offset","66%")
            .style("stop-color",linearColor[2]);
        var stop4 = linearGradient.append("stop")
            .attr("offset","100%")
            .style("stop-color",linearColor[3]);

        var colorRect = svg_g.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", 5)
            .style("fill","url(#" + linearGradient.attr("id") + ")");




        let cicile_Line_y = 60;
        let arrow_y = 35;

        console.log(filterNode);
        let column_lin = svgLine.selectAll("g_line")
            .data(nodesDetect)
            .enter()
            .append("g");
        let textObj = {78:"初步融合",88:"中度融合",99:"高度融合"};
        let textObj2 = {78:"低资本",88:"中资本",99:"高资本"};
        let circleObj = {78:4,88:8,99:10};
        console.log("wuwuwu");
        console.log(nodesDetect);
        column_lin.append("circle")
            .attr("class","x_tick_Line")
            .attr("cx",(item,index)=>{if (item["other"]===99){return item["x2"]+20}return item["x2"]+30})
            .attr("cy",12)
            .attr("r",(item,index)=>{
                return circleObj[item["other"]]
            })
            .attr("display",(item,index)=>{if (!circleObj[item["other"]])return "none"})
            .attr("stroke","2px")
            .attr("fill",(item,index)=>{return clr(item["other"])});
        column_lin.append("text")
            .attr("class","x_tick_text")
            .attr("x",(item,index)=>{if(item["other"]!==99){return item["x2"]-100}return item["x2"]-80})//中文:-60  -60
            .attr("y",15)
            .text((item,index)=>{return textObj[item["other"]]})
            .attr("text-align","middle")
            .attr("font-size",10);
        column_lin.append("text")
            .attr("class","x_tick_text")
            .attr("x",(item,index)=>{if(item["other"]!==99){return item["x2"]+15}return item["x2"]+5})
            .attr("y",35)
            .text((item,index)=>{return textObj2[item["other"]]})
            .attr("text-align","middle")
            .attr("font-size",10);
        // 下面两个line 画箭头符号
    }
    // drawArrow(svg,position){
    //     const {y,x} = position;
    //     svg.append("line")
    //         .attr("class","xline")
    //         .attr("x1",x)
    //         .attr("x2",x+10)
    //         .attr("y1",y-5)
    //         .attr("y2",y)
    //         .attr("opacity",0.5);
    //     svg.append("line")
    //         .attr("class","xline")
    //         .attr("x1",x)
    //         .attr("x2",x+10)
    //         .attr("y1",y+5)
    //         .attr("y2",y)
    //         .attr("opacity",0.5);
    // }
    tooltip(circle_tooltip){
        var tooltip = d3.select("body")
            .append("div")
            .attr("class","tooltip")
            .style("opacity",0.0)
            .style("display","none");
        circle_tooltip.on("mouseover",(d)=>{
            console.log(d);
            tooltip.html(" 公司:" + d["city"] + "<p class='toolBr' ></p>" + " 注册资本:" + d["capital"]+"万"
                +"<p class='toolBr' ></p>"+" Integration:" + this.stringCivilValue(d["other"]))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",1.0)
                .style("display","block");
        });
        circle_tooltip.on("mouseout",(d)=>{
            tooltip.style("opacity",0.0)
                .style("display","none");
        });
    }
    stringCivilValue(data){
        console.log(data);
        if(77>data&&data>=66){
            return"Primary integration"
        }else if(99>=data&&data>88){
            return "High integration"
        }else if(88>=data&&data>=77){
            return "Moderate integration"
        }
        else {
            return data
        }
    }
    render() {
        console.log("allView");
        console.log(this.state);
        const style = {
            width:'50%',
            height:'100%'
        };
        const style2 = {
            // marginTop:"1rem",
            width:'100%',
            height:'59%'
        };
        const style3 = {
            width:'80%',
            height:'50%',
            // marginTop:'-4rem',
            marginRight:'5rem',
            opacity:1
        };
        const style5 = {
            width:'95%',
            height:'50%',
            // marginTop:'2rem',
            marginBottom:'1rem'
        };
        const style4 = {
            width:'100%',
            height:'20%'};
        const style6 = {
            width:'100%',
            height:'100%'};

        return (
            <div id="all_container">
            <div id="container" >
                {/*<div id="text1">绵阳市民营企业军民融合度指标分析</div>*/}
                <div id="container_canvas" style={style2}>
                    {/*<div style={style5}>*/}
                        {/*<TopOne civil_data={this.state.civil_data}/>*/}
                    {/*</div>*/}
                    {/*<div>民营企业资本与军民融合度的关系</div>*/}
                    {/*<TimeLine/>*/}
                    <div id="canvas" style={style3}>
                        <div style={style4} id="DivLine">
                            <svg id="LineSvg" ></svg></div>
                        <div id="canvas_circle" style={style6}></div>
                    </div>
                    <div style={style6}>
                        {/*<div id="canvas" style={style3}>*/}
                            {/*<div style={style4} id="DivLine">*/}
                                {/*<svg id="LineSvg" ></svg></div>*/}
                            {/*<div id="canvas_circle" style={style6}></div>*/}
                        {/*</div>*/}
                        <div style={style5}>
                        <TopOne civil_data={this.state.civil_data}/>
                        </div>
                    </div>

                </div>
                <div id="container_Down">
                    <div id="container_Left">
                        <ContainerLeft industry_data={this.state.industry_data} fourAreaData={this.state.fourAreaData} />
                    </div>
                </div>
            </div>
            <div id="container2" >
                <LeafLet data={this.state.LeafLet} data2={this.state.civil_data}/>
            </div>
            </div>
        );
    }
}

export default allView;

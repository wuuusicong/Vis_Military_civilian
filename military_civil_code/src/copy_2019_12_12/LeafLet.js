import React,{Component} from "react"
// import L from "leaflet"
import *as d3 from "d3"
class LeafLet extends  Component{
    constructor(props){
        super(props);
        this.map = null;
        let data = this.props.data;
        console.log(data);
        let colorArray =this.props.data2.map((d)=>{
            return d["Industry"]
        });
        colorArray =  Array.from(new Set(colorArray))
        console.log(colorArray);
        let colorLinear = d3.scale.category20b();
        let colorDict = {};
        colorArray.forEach((d,i)=>{colorDict[d] =colorLinear(i)});
        let colorArray2 =  colorArray.map((d,i)=>{return {[d]:colorDict[d]}});
        console.log("颜色");
        console.log(colorArray2);
        this.state={data,
            radio:false,
            colorArray2,
            colorDict};
        this.changeChoose = this.changeChoose.bind(this);
        this.drawHeatMap  = this.drawHeatMap.bind(this);
        this.drawCircle = this.drawCircle.bind(this);
        this.labelOver = this.labelOver.bind(this);
    }
    getPointXY(leafletMap,arrayPoint,L) {
        let  point = leafletMap.latLngToLayerPoint(new L.LatLng(arrayPoint[0],arrayPoint[1]));//x是lat y是lon
        return [point.x,point.y]
    }
    drawHeatMap(L,leafletMap){
        let  heat = L.heatLayer(this.state.data, {radius: 20}).addTo(leafletMap);
    }
    drawCircle(L,leafletMap){
        let mapdiv = document.querySelector("#leafLetMap");
        let width = mapdiv.clientWidth;
        let height =mapdiv.clientHeight;
        let linearSize = d3.scale.linear()
            .domain([66,99])
            .range([15,30]);
        let linearFont = d3.scale.linear()
            .domain([66,99])
            .range([0.5,0.8]);
        var clr = d3.scale.linear()
            .domain([66, 77,88,99])
            .range(["#ffffff", "#FF767B","#FF3136","#DC0104"]);
        var svg = d3.select(leafletMap.getPanes().overlayPane).append("svg")
            .attr("width",width)
            .attr("height",height)
            .attr("id","d3Svg");
        let g = svg.selectAll(".svg_g").data(this.props.data2).enter().append("g").attr("class", "d3g")
            .attr("transform",(d)=>{
                d.x =this.getPointXY(leafletMap,d["Position"],L)[0];
                d.y =this.getPointXY(leafletMap,d["Position"],L)[1];
                return "translate(" + d.x + "," + d.y + ")"});
        // .range(["#ffffff","#c165dd","#5c27f1"]);
        g.append("circle")
            .attr("r",(d,i)=>{return linearSize(d["Score"])})
            .attr("fill",(d)=>this.state.colorDict[d["Industry"]])
            .attr("opacity",0.5);
        // .attr("width",(d)=>linearSize(d["Score"]))
        //         .attr("height",(d)=>linearSize(d["Score"]));
        g.append("foreignObject")
            .attr("class","foreign")
            .attr("width",(d,i)=>{return linearSize(d["Score"])*2.1})
            .attr("height",(d,i)=>{return linearSize(d["Score"])*2.1})
            .attr("transform",(d,i)=>{
                return `translate(${-linearSize(d["Score"])},${-linearSize(d["Score"])})`
            })
            .text((d)=>d["Name"])
            .style("font-size",(d)=>{return linearFont(d["Score"]).toFixed(1)*100+"%"})
            .style("vertical-align","middle");
        leafletMap.on("zoom",(e)=>{
            if(d3.selectAll(".d3g")){
                d3.selectAll(".d3g").remove()
            }
            let g = svg.selectAll(".svg_g").data(this.props.data2).enter().append("g").attr("class", "d3g")
                .attr("transform",(d)=>{
                    d.x =this.getPointXY(leafletMap,d["Position"],L)[0];
                    d.y =this.getPointXY(leafletMap,d["Position"],L)[1];
                    return "translate(" + d.x + "," + d.y + ")"});
            g.append("circle")
            // .attr("cx",(d,i)=>{console.log(122222);console.log(d["Position"]);return this.getPointXY(leafletMap,d["Position"],L)[0]})
            // .attr("cy",(d,i)=>{return this.getPointXY(leafletMap,d["Position"],L)[1]})
                .attr("r",(d,i)=>{return linearSize(d["Score"])})
                .attr("fill",(d)=>this.state.colorDict[d["Industry"]])
                .attr("opacity",0.5);
            g.append("foreignObject")
                .attr("class","foreign")
                .attr("width",(d,i)=>{return linearSize(d["Score"])*2.1})
                .attr("height",(d,i)=>{return linearSize(d["Score"])*2.1})
                .attr("transform",(d,i)=>{
                    return `translate(${-linearSize(d["Score"])},${-linearSize(d["Score"])})`
                })
                .text((d)=>d["Name"])
                .style("font-size",(d)=>{return linearFont(d["Score"]).toFixed(1)*100+"%"})
        });
    }
    componentDidMount() {
        console.log(window);
        let L = window.L;
        let accessToken = 'pk.eyJ1Ijoid3VzaWNvbmciLCJhIjoiY2p4bHZ5ZG5zMDBzdjN5bWtvNTZvcmVmeiJ9.m8EzWAlNMBj_NwYVw_r7Uw';
        // this.map = L.map('leafLetMap').setView([37.92388861359015,115.22048950195312], 16);
        var url =
            'https://api.mapbox.com/styles/v1/wusicong/cjxlid4m00rcf1cmyh1sgc7rv/tiles/256/{z}/{x}/{y}?access_token=' + accessToken;
        // mapbox://styles/wusicong/cjxlid4m00rcf1cmyh1sgc7rv
        var leafletMap = L.map('leafLetMap').setView([31.48,104.70], 13);//set the basic position
        L.tileLayer(url, {
            maxZoom: 18,
            // id: 'mapbox.cjxlid4m00rcf1cmyh1sgc7rv'
        }).addTo(leafletMap);
        this.drawCircle(L,leafletMap);
        let body = d3.select("body");
            body.selectAll(".tooltip")
            .data(this.props.data2)
            .enter()
            .append("div")
            .attr("class",(d)=>'tooltip '+d["Industry"])
            .style("opacity",0.0)
            .style("display","none");
        this.setState({
            L,
            leafletMap
        });
    }
    changeChoose(e){
        let tmpvalue = this.state.radio;
        if(!tmpvalue){
            d3.select("#d3Svg").remove();
            this.drawHeatMap(this.state.L,this.state.leafletMap);
        }else {
            let parent = document.querySelector("#leafLetMap");
            let child = parent.querySelector("canvas");
            console.log(child);
            console.log(parent);
            d3.select(".leaflet-heatmap-layer").remove()
            this.drawCircle(this.state.L,this.state.leafletMap);
        }
        let tmp;
        if(this.state.radio){
            tmp = 0;
        }else {
            tmp = 1;
        }
        this.setState({
            radio:tmp
        })
    }
    labelOver(e){
        let industry = e._targetInst.pendingProps.data;
        d3.selectAll(`.${industry}`)
            .html((d)=>"<div class='toolDiv'>"+" Name:"+ d["Name"] +"<p class='toolBr' ></p>"+"District:" + d["Class"] +"<p class='toolBr' ></p>"
                + " Capital:" + d["Capital"]
            +"<p class='toolBr' ></p>"+"Industry:" +d["Industry"]+
        "<p class='toolBr' ></p>"+"Content:" +d["Content"]+"<p class='toolBr' ></p>"+" Integration:" + d["Grade"]+"</div>")
            .style("left", (d)=>this.getPointXY(this.state.leafletMap,d["Position"],this.state.L)[0]+'px')
            .style("top", (d)=>this.getPointXY(this.state.leafletMap,d["Position"],this.state.L)[1]+'px')
            .style("opacity",1.0)
            .style("display","block");
        console.log("来了 ");
    }
    labelOut(e){
        let industry = e._targetInst.pendingProps.data;
        d3.selectAll(`.${industry}`)
            .style("opacity",1.0)
            .style("display","block");
    }
    render(){
        const styleMap = {
            width:"100%",
            height:'100%'
        };
        const arrayLabel = this.state.colorArray2.map((d,i)=>{
            return <div key={i} className="labelOne"><div data={Object.keys(d)[0]}
                onMouseOver={this.labelOver} className="labelOne1" style={{"background":`${d[Object.keys(d)[0]]}`}}
                onMouseOut={this.labelOut}></div>
                <div className="labelOne2">{Object.keys(d)[0]}</div></div>
        });
    return (
        <div style={styleMap}>
            <div id="remember">
                <input id="#radio" type="radio" ref="chose" name="radio" value="1" onClick={this.changeChoose}
                       checked={this.state.radio}/><label>HeatMap</label>
            </div>
            <div id="labelColor">{arrayLabel}</div>
    <div id="leafLetMap" >
    </div>
        </div>
            )

    }
}
export default LeafLet

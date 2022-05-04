import React,{Component} from "react";
import Left1st from "./Left1st.js"
import Left2nd from "./Left2nd.js"
import Left3nd from "./Left3nd";
import Left2_replace from "./Left2_replace";
import WordCloud from "./WordCloud";
import TagCloud from "./TagCloud";
import WordCloud2 from "./WordCloud2";
class containerLeft extends  Component {
    constructor(props){
        super(props);
        console.log("来吧");
        console.log(this.props["industry_data"]["interact_1"]);
        let fourAreaData = this.props.fourAreaData;
        console.log(fourAreaData);
        let copyFourAreaData = fourAreaData.concat();
        let flag = 0;
        this.state = {data:[{"w2":-45},{"w3":45},{"w4":-135},{"w5":135}],
            fourAreaData,fourText:["科创区","游仙区","涪城区","高新区"],
            fourTextEng:["科创区","游仙区","涪城区","高新区"]
            ,copyFourAreaData,flag};
        this.receData = this.receData.bind(this);
        this.backMain = this.backMain.bind(this);
        this.mouseOverData = this.mouseOverData.bind(this);
        this.mouseOutData = this.mouseOutData.bind(this);
    }
    receData(ev,chart){
            let indexIn = ev.data._origin.industry;
            let text = this.props.industry_data["field_name"][indexIn];
            let data = this.props.industry_data["interact_3"][text];
            let tmpCopyFourData = this.state.copyFourAreaData.map((item,index)=>{
                return data[this.state.fourText[index]]
            });
        console.log("12245");
        console.log(this.props.industry_data["interact_1"][text]);
            console.log(tmpCopyFourData);
            this.setState({
                copyFourAreaData:tmpCopyFourData,
                flag:1,
                text
            })
    }
    mouseOverData(ev,chart){
        let indexIn = ev.data._origin;
        console.log(indexIn);
        let {area,industry} = indexIn;
        let areaName = this.props.industry_data["area_name"][area];
        let industryName = this.props.industry_data["field_name"][industry];
        console.log(industryName);
        console.log(this.props.industry_data["interact_1"][industryName])
    }
    mouseOutData(ev,chart){
        console.log(ev);
    }
    componentDidMount() {
    }
    backMain(){
        this.setState({
            copyFourAreaData:this.state.fourAreaData,
            flag:0
        })
    }
    render(){
        const style = {
            width:'100%',
            height:'100%'
        };
        let listDiv = null;
        if(this.state.flag){
             listDiv = this.state.data.map((item,index)=>{
                if(this.state.copyFourAreaData[index].length===0){return (
                    <div key={index} className="detailWord">
                    <div className={Object.keys(item)[0]+'text'}>{this.state.fourTextEng[index]}</div>
                    <div className="dashLine" id={Object.keys(item)[0]}></div></div>
                )}else { return (
                    <div key={index} className="detailWord"><div className={Object.keys(item)[0]+'text'}>
                        {this.state.fourTextEng[index]}</div><WordCloud2 id={Object.keys(item)[0]}
                                                                     text={this.state.fourTextEng[index]} data={this.state.copyFourAreaData[index]}
                                                                     rotate={item[Object.keys(item)[0]]}/></div>) }
             })}
         else {
                listDiv = this.state.data.map((item,index)=>{
                    return (
                        <div key={index} className="detailWord"><div className={Object.keys(item)[0]+'text'}>
                            {this.state.fourTextEng[index]}</div><WordCloud id={Object.keys(item)[0]}
                                  text={this.state.fourTextEng[index]} data={this.state.copyFourAreaData[index]}
                                  rotate={item[Object.keys(item)[0]]}/></div>)
})}
        console.log(listDiv);
        console.log("list");
        return (
            <div id= "containerLeft" style={style}>
                <div id="containerLeftTop"><Left1st industry_data={this.props.industry_data}
                mouseOverData={this.mouseOverData}    receData={this.receData}/></div>
                <div id="containerLeftDown">
                    {this.state.flag?<div className="returnDiv2" >{this.state.text}</div>:null}
                    <div  id="fourWord">
                        {listDiv}
                        {this.state.flag?<div id="returnDiv" onClick={this.backMain}>整体</div>:null}
                        {!this.state.flag?<div className="returnDiv3" >绵阳市民营企业产业范围</div>:null}
                        {/*<div id="Down_text">TOP10企业</div>*/}
                        {/*<Left2_replace industry_data={this.props.industry_data}/>*/}
                    </div>
                </div>
            </div>
        )
    }
}
export default containerLeft
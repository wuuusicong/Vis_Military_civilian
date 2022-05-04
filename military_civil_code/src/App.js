import React, { Component } from 'react';
import *as d3 from "d3";
import AllView from "./allView.js";
import "./App.css";

class App extends Component {
  constructor(props){
      super(props);
      this.state = {};
  }
    componentDidMount() {
       d3.json("data.json",(data)=> {
           let fourArea = {"name":"绵阳",
           "children":[
               {"name":"涪城区",
               "children":[{"name":"涪城区","children":[]}]},
               {"name":"高新区",
                   "children":[{"name":"高新区","children":[]}]},
               {"name":"科创区",
               "children":[{"name":"科创区","children":[]}]},
               {"name":"游仙区",
               "children":[{"name":"游仙区","children":[]}]},
           ]};
           let nameIndex = {"涪城区":0,"高新区":1,"科创区":2,"游仙区":3};
           let filterData = [];//这个是全部排列在一起
           for(let item in data){
               if(item ==='高新区'||item==='涪城区'||item==='游仙区'||item==='科创区'){
                   if(data.hasOwnProperty(item)){
                       data[item].forEach((content,index)=>{
                            content["city"]  = item;
                            content["score"] = content["score"];
                            filterData.push(content);
                           fourArea["children"][nameIndex[item]]["children"][0]["children"].push(content);
                       })
                   }
               }
           }
           let fourAreaData = [data["kechuangCloud"],data["youxianCloud"],data["fuchenCloud"],data["gaoxinCloud"]];
           d3.json("firmData.json",(data2)=>{
               d3.json("civil_data.json",(data3)=>{
                   d3.json("civil_industry_data.json",(data4)=>{
                    let LeafLet = data2.map((item,index)=>{
                        return [item["position"][1],item["position"][0],item["score"]/3]
                    });
                    console.log("LeafLet");
                    console.log(LeafLet);
                       this.setState({
                           data:filterData,
                           fourArea,
                           firmData:data2,
                           civil_data:data3,
                           industry_data:data4,
                           LeafLet,
                           fourAreaData
                       })
                   })
               })
           });
       });
    }
  render() {
      let { data } = this.state;
      console.log(113333);
      console.log(this.state);
      if(!data) return null;
      const style = {
          width:'100%',
          height:'100%'
      };
    return (
        <div style={style} className="treeLayout">
            {/*<div className="leftLayout">123</div>*/}
            <AllView LeafLet={this.state.LeafLet} fourAreaData={this.state.fourAreaData}
                     data = {this.state.data} fourArea={this.state.fourArea}
                     firmData = {this.state.firmData} industry_data = {this.state.industry_data}
                     civil_data={this.state.civil_data}/>
        </div>
    );
  }
}

export default App;

import React,{Component} from "react";
import { Chart, Tooltip, Axis, Interval, Guide,Legend ,Point} from 'viser-react';


 class TopOne extends Component {
     constructor(props){
         super(props);
         let filterData =  this.props.civil_data.map((item,index)=>{
             let tmpTxt = "";
            switch (item["Class"]){
                case "youxian":tmpTxt = "Youxian District";break;
                case "gaoxin":tmpTxt = "Gaoxin District";break;
                case "fuchen":tmpTxt = "Fuchen District";break;
                case "kechuang":tmpTxt = "Kechuang District";break;
            }
            return {...item,
                     Class:tmpTxt
                    }
         });
         console.log("colorList");
         let colorArray = ["#ffe5b0","#4e8bdc","#998ec3"];
         console.log(filterData);
         let colorData = filterData.map((item,index)=>{
             if(item["Score"]>=88)return colorArray[0];
             else if(88>item["Score"]&&item["Score"]>=77){
                 return colorArray[1];
             }else return colorArray[2]
         });
         let colors = ["#000000","#4e8bdc","#998ec3"];//ffe5b0
         let filmColor = {};
         filterData.forEach((item,index)=>{
             let color;
             if(item["Grade"]==="高度融合度"){
                 color = colors[0];
             }else if (item["Grade"] === "中度融合度"){
                 color = colors[1];
             }else {
                 color = colors[2];
             }

             // if(item["Name"] ==="四川长虹电子科技有限公司"){ color = "#ff0000";}
             filmColor[item["Name"]] = color;
         });
         console.log(filmColor);
         this.state = {
             data:filterData,
             colorData,
             filmColor
         };
     }

     componentDidMount() {

     }
    render() {
        const colors = ["#000000","#4e8bdc","#998ec3"];
        console.log(231312421+"sss");
        console.log(this.state.data);
        return (
            <Chart forceFit height={200} data={this.state.data}>
                <Legend  custom={true} items={[{value:"High degree of integration",fill:colors[0],marker:'diamond'},
                    {value:"Moderate degree of integration",fill:colors[1],marker:'diamond'},
                    {value:"Primary degree of integration",fill:colors[2],marker:'diamond'}]}
                         offsetX={30}/>
                <Tooltip
                    crosshairs= {{ type: 'cross' }}
                />
                <Axis dataKey="Score" grid={null} />
                <Axis
                    dataKey="Class"
                    tickLine={null}
                    subTickCount={1}
                    subTickLine={{
                        lineWidth: 1,
                        stroke: '#BFBFBF',
                        length: 4,
                    }}
                    grid={{
                        align: 'center',
                        lineStyle: {
                            stroke: '#8C8C8C',
                            lineWidth: 1,
                            lineDash: [3, 3],
                        },
                    }}
                />
                {/*color: ['score',(d)=>{if (d===99)return "red";if
                (d>=88)return "#ffe5b0";else if(d>=78)return "#4e8bdc"; else return "#998ec3"}],//"#998ec3"
                ["#ffe5b0","#4e8bdc","#998ec3"]*/}
                <Point
                    position="Class*Score"
                    color={["Name",(d)=>this.state.filmColor[d]]}
                    adjust="jitter"
                    size={["Grade",[4]]}
                    opacity={0.65}
                    shape="diamond"
                    tooltip="Name*Industry*Grade"
                />
            </Chart>
        );
    }
}
export default TopOne
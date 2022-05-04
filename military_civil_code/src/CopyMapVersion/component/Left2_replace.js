import React,{Component} from "react";
import { Chart, Tooltip, Axis, Bar, SmoothLine, Point, Legend } from 'viser-react';
import *as d3 from "d3";



class Left2_replace extends Component{
    constructor(props){
        super(props);
        let data = this.props["industry_data"]["all_area"];
        console.log("allArea");
        data = data.map((item,index)=>{
            if(item["capital"]>=10000){
                item["capital"] = item["capital"]/10
            }
            return {...item}
        });
        console.log(data);
        this.state ={data}
    }
    render(){
        const scale = [
            {
                dataKey: 'capital',
                min: 0
            }, {
                dataKey: 'industry',
                min: 0
            }];
        return (
            <Chart forceFit height={200} data={this.state.data} scale={scale} padding={[10,100,120,100]}>
                <Tooltip />
                <Legend
                    custom
                    allowAllCanceled
                    items={[{value: 'capital', marker: {symbol: 'square', fill: '#3182bd', radius: 5}},
                        {value: 'industry', marker: {symbol: 'hyphen', stroke: '#fdae6b', radius: 5, lineWidth: 3}}]}
                    onClick={(ev, chart) => {
                        const item = ev.item;
                        const value = item.value;
                        const checked = ev.checked;
                        const geoms = chart.getAllGeoms();
                        for (let i = 0; i < geoms.length; i++) {
                            const geom = geoms[i];
                            if (geom.getYScale().field === value) {
                                if (checked) {
                                    geom.show();
                                } else {
                                    geom.hide();
                                }
                            }
                        }
                    }}
                />
                <Axis
                    dataKey="industry"
                    grid={null}
                    label={{
                        textStyle: {
                            fill: '#fdae6b',
                        },
                        offsetX:0
                    }}
                />
                <Bar position="name*capital" color="#3182bd" />
                <SmoothLine position="name*industry" color="#fdae6b" size={3} />
                <Point shape="circle" position="name*industry" color="#fdae6b" size={3} />
            </Chart>
        );
    }
}
export default Left2_replace
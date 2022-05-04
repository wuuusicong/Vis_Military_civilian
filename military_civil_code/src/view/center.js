import React,{Component} from "react";
import { Chart, Tooltip, Axis,Line,Legend,Plugin,Slider} from 'viser-react';
import {DataView} from "@antv/data-set";
class center extends  Component {
    constructor(props){
        super(props);
        this.state = {};
        this.filterData = this.filterData.bind(this);
        this.isInScore = this.isInScore.bind(this);
        let sourceData = this.filterData(this.props.data);
        const dv = new DataView().source(sourceData);
        dv.transform({
            type: 'fold',
            fields: ['涪城区', '科创区','高新区','游仙区'],
            key: 'city',
            value: 'temperature',
        });
        const data = dv.rows;
        console.log(12222222222);
        console.log(this.props);
        this.state = {
            origin: data,
            data,
            // LineHeight,
            // LineWidth
        }
    }
    filterData(data){
        let scoreArea = [];
        data.forEach((item,index)=>{
            if(!this.isInScore(item["score"],scoreArea)){
                scoreArea.push({"指标":item["score"],"涪城区":0,"游仙区":0,"科创区":0,"高新区":0});
            }
        });
        console.log(123456);
        console.log(scoreArea);
        const realScoreArea = scoreArea.map((item,index)=>{
            let value = item["指标"];
            data.forEach((item2,index2)=>{
                let value2 = item2["score"];
                if(value2 === value) {
                    item[item2["city"]]++
                }
            });
            return item;
        });
        let realScoreArea2 = realScoreArea.sort((a,b)=>{
            return Number(a["指标"]) - Number(b["指标"])
        });
        return realScoreArea2;
    }
    isInScore(data,array){
        for(let i of array){
            if (i["指标"]===data){
                return true;
            }
        }
        return false
    }
    slideChange(opt){
        const {startValue,endValue} = opt;
        console.log(startValue);
        // console.log(this.state.data);
        let data = this.state.data.filter((item,index)=>{
            let value =  Number(item["指标"]);
            return value>=Number(startValue)&&value<=Number(endValue)
        });
        console.log("实时改变的data");
        console.log(data);
        // this.setState({
        //     data:data
        // })
    }
    slideChangeTo(opts){
        console.log(opts);
        this.setState({})
    }
    componentDidMount() {
    }
    render(){
        console.log(12333333);
        // console.log(this.state.data);
        const sliderOpts = {
            xAxis: '指标',
            yAxis: 'temperature',
            data: this.state.data,
            width: 'auto',
            start: '68',
            end: '99',
            height: 20,
            padding: [0, 40, 10, 40],
            onChange: this.slideChange.bind(this),
            container:'#centerSlide'
        };
        console.log(sliderOpts);
        const style = {
            width:'100%',
            height:'100%'
        };
        const style2 = {width:'100%',
            height:'10%',};
        const style3 =
            {width:'80%',
                position:'absolute',
                textAlign:'center',
                marginTop:'-5px',
            };
        const style4 = {
            position:'absolute',
            left:'0px',
            width:'3px',
            wordWrap: 'break-word',
            fontSize:'10px',
            top:'45%'
        };
        const scale = [{
            dataKey: '指标',
            min: 0,
            max: 1,
            alias: 'Time(s)',
        }];
        const style5 = {
            width:'100%',
            height:'90%'
        };
        return (
            <div style={style} >
                <div style={style5} id="centerLineLine">
                    <div style={style4}>企业个数</div>
                    <p style={style3}>绵阳市军工企业军民融合指数分布</p>
                    <Chart forceFit height={this.props.height} renderer='canvas' data={this.state.data} scale={scale} width={this.props.width} padding={[25,20,50,40]}>
                        <Tooltip onShow={(ev,chart)=>{
                            console.log(ev);
                        }}/>
                        <Axis tickLine={null} dataKey="指标" label={{offsetY:-5,
                            textStyle: {
                                fill: '#fdae6b',
                                textAlign: 'center',
                            }}} offsetY={-20} />
                        <Legend position={"top-right"}/>
                        <Line position="指标*temperature" color="city"/>
                    </Chart>
                </div>
                    <div style={style2} id="centerSlide">
                        <Plugin>
                        <Slider {...sliderOpts} />
                    </Plugin>
                    </div>
            </div>
        )
    }
}
export default center;
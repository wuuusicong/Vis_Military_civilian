import React,{Component} from "react";
import { Chart, Legend, Axis, Tooltip, Coord, Point, registerShape } from 'viser-react';
import {DataView} from "@antv/data-set";
const scale = [
    { dataKey: 'x', nice: false },
    { dataKey: 'y', nice: false },
];
registerShape('point', 'cloud', {
    draw(cfg, container) {
        // console.log(cfg);
        return container.addShape('text', {
            attrs: {
                fillOpacity: cfg.opacity,
                fontSize: cfg.origin._origin.size,
                rotate: cfg.origin._origin.rotate,
                text: cfg.origin._origin.text,
                textAlign: 'center',
                fontFamily: cfg.origin._origin.font,
                ...cfg.style,
                fill: cfg.color,
                textBaseline: 'Alphabetic',
                x: cfg.x,
                y: cfg.y,
            },
        });
    }
});
class WordCloud extends Component {
    constructor(props){
        super(props);
        console.log("word");
        console.log(this.props);
        let data =  this.props.data.map((item,index)=>{
            return {"x":item["text"],"value":item["value"],category:this.props.text,label:item["label"],text:item["text"]}
        });
        this.state = {
            data,
            text:"text*label"
        };
    }
    // componentWillReceiveProps(nextProps){
    //     console.log(555112);
    //     console.log(nextProps);
    //     let data =  nextProps.data.map((item,index)=>{
    //         return {"x":item["text"],"value":item["value"],label:nextProps.text,text:item["text"]}
    //     });
    //     const dv = new DataView().source(data);
    //     const range = dv.range('value');
    //     const min = range[0];
    //     const max = range[1];
    //     dv.transform({
    //         type: 'tag-cloud',
    //         fields: ['x', 'value'],
    //         size: [335, 70],
    //         font: 'Verdana',
    //         padding: 0,
    //         timeInterval: 5000, // max execute time
    //         rotate() {
    //             let random = ~~(Math.random() * 4) % 4;
    //             if (random == 2) {
    //                 random = 0;
    //             }
    //             return random * 0; // 0, 90, 270
    //         },
    //         fontSize(d) {
    //             if (d.value) {
    //                 return ((d.value - min) / (max - min))*5 +15;
    //             }
    //             return 0;
    //         }
    //     });
    //     this.setState({
    //         data:data,
    //         text:"text",
    //         data2: dv.rows
    //     })
    // }
    componentDidMount() {
        let data = this.state.data;
        const dv = new DataView().source(data);
        const range = dv.range('value');
        const min = range[0];
        const max = range[1];
        dv.transform({
            type: 'tag-cloud',
            fields: ['x', 'value'],
            size: [335, 70],
            font: 'Verdana',
            padding: 0,
            timeInterval: 5000, // max execute time
            rotate() {
                let random = ~~(Math.random() * 4) % 4;
                if (random == 2) {
                    random = 0;
                }
                return random * 0; // 0, 90, 270
            },
            fontSize(d) {
                if (d.value) {
                    return ((d.value - min) / (max - min))*15 +5;
                }
                return 0;
            }
        });
        this.setState({ data2: dv.rows });
    }
    render() {
        if(this.state.data2!==undefined){
            return (
                <div id={this.props.id}>
                    <Chart width="335" height="70" data={this.state.data2} scale={scale} padding={[0]}>
                        <Tooltip showTitle={false}/>
                        <Coord type="rect" direction="TL"/>
                        <Point position="x*y" color="label" shape="cloud" tooltip={this.state.text} fill="#fff"/>
                    </Chart>
                </div>
            )
        }else {
            return(<div>
1234
            </div>)
        }
    }
}
export default WordCloud
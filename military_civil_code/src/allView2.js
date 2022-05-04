import React, { Component } from 'react';
import *as P from  "popojs"
import Panel from  "popo-react-panel"
import Left from "./view/left"
import LineCenter from "./view/center";


class allView extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.data = this.props.data;
        this.state.copyData = this.props.data;
    }

    componentWillMount() {

    }
    componentDidMount() {
        const styleDefine1 = {
            classname: 'first',
            css: {
                background:'#ffff33'
            }
        };
        const styleDefine2 = {
            classname: 'second',
            css: {
                background:'#ff0000'
            }
        };
        const styleDefine3 = {
            classname: 'third',
            css: {
                // background:'#387213'
            },
        };
        const styleDefine4 = {
            classname: 'forth',
            css: {
                background:'#9999ff'
            },
        };
        P.init({
            container: 'container', // 容器ID
            layout:[[12,[[9],[15,[[4],[4],[4]]]]]],
            panel: {
                enable: true,
                custom: [
                    {panels: [1]}
                ]
            },
            style: {
                // container:styleDefine,
                custom: [{
                    panels: [1],
                    panel:styleDefine1
                }
                    ,{
                        panels: [2],
                        panel:styleDefine2
                    },
                    {
                        panels: [3],
                        panel:styleDefine3
                    },
                    {
                        panels: [4],
                        panel:styleDefine4
                    },
                ]
            },
        });
        console.log(11212212111);
        const third = document.querySelector(".third");
        this.setState({
            LineWidth:third.offsetWidth,
            LineHeight:third.offsetHeight
        });
    }
    render() {
        const style = {
            width:'100%',
            height:'100%'
        };
        return (
            <div id="container" style={style}>
                <Panel target = "1">
                    <div style={style}>
                        <Left data={this.state.copyData}/>
                    </div>
                </Panel>
                <Panel target = "2">
                    <div>
                        1235
                    </div>
                </Panel>
                <Panel target = "3">
                    <div style={style} id="thirdDiv">
                        {this.state.LineWidth !== undefined ?
                            <LineCenter data={this.state.copyData} width={this.state.LineWidth}
                                        height={this.state.LineHeight}/>:null
                        }
                    </div>
                </Panel>
                <Panel target="4">
                </Panel>
            </div>
        );
    }
}

export default allView;

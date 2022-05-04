import React,{Component} from "react";
class Line extends  Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount() {
    }
    render(){
        const style = {
            width:'100%',
            height:'100%'
        };
        return (
            <div id= "containerLeft" style={style}>
                <div id = "leftFirst"></div>
                <div id = "leftSecond"></div>
            </div>
        )
    }
}
export default Line
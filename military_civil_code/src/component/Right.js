import React,{Component} from "react";
import Right2nd from "./Right2nd";

class containerRight extends  Component {
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
            <div id= "containerRight" style={style}>
            <Right2nd/>
            </div>
        )
    }
}
export default containerRight
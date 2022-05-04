import React,{Component} from "react"
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import *as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
class TagCloud extends Component{
    constructor(props){
        super(props);
        let data = this.props.data;
        this.state = {id:this.props.id,rotate:this.props.rotate,data};
        console.log(this.props);
        console.log("rotate");
    }

    componentDidMount() {
        let chart = am4core.create(this.state.id, am4plugins_wordCloud.WordCloud);
        chart.fontFamily = "Courier New";
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
        series.randomness = 0;
        series.rotationThreshold = 0.5;
        // series.labelsContainer.rotation = this.state.rotate;
        series.minFontSize = 10;
        chart.paddingBottom = 10;
        series.data = this.state.data;

        series.dataFields.word = "text";
        series.dataFields.value = "value";

        series.heatRules.push({
            "target": series.labels.template,
            "property": "fill",
            "min": am4core.color("#0000CC"),
            "max": am4core.color("#CC00CC"),
            "dataField": "value"
        });

        series.labels.template.url = "https://stackoverflow.com/questions/tagged/{word}";
        series.labels.template.urlTarget = "_blank";
        series.labels.template.tooltipText = "{word}: {value}";

        let hoverState = series.labels.template.states.create("hover");
        hoverState.properties.fill = am4core.color("#FF0000");
        let eles = document.querySelectorAll("[aria-labelledby$=-title]");
        eles.forEach((ele)=>{
            ele.style.visibility="hidden";
        })
    }
    render(){
        const style1 = {width:'100%',height:'100%'};
        return(<div id={this.state.id} style={style1}>

        </div>)
    }
}
export default TagCloud
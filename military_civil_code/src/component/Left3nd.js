import React,{Component} from "react"
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import *as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// am4core.useTheme(am4themes_animated);

class Left3nd extends Component{
    componentDidMount() {
        let chart = am4core.create("chartdiv2", am4plugins_wordCloud.WordCloud);
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

        series.accuracy = 4;
        series.step = 15;
        series.rotationThreshold = 0.7;
        series.maxCount = 200;
        series.minWordLength = 2;
        series.labels.template.tooltipText = "{word}";
        // series.fontFamily = "Courier New";
        series.maxFontSize = am4core.percent(30);

        series.text = "陈仕杰是一头猪";

    }
    render(){
        return (
            <div id="chartdiv2" style={{ width: "50%", height: "200px" }}></div>
        )
    }
}
export  default Left3nd
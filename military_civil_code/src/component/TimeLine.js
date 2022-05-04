import React,{Component} from "react"
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class TimeLine extends Component{
    componentDidMount() {
        let chart = am4core.create("chartdiv3", am4charts.XYChart);

// Add data
        chart.data = [{
            "x": "1",
            "y": 1,
            "text": "[bold]2018 Q1[/]\nThere seems to be some furry animal living in the neighborhood.",
            "center": "bottom"
        }, {
            "x": "2",
            "y": 1,
            "text": "[bold]2018 Q2[/]\nWe're now mostly certain it's a fox.",
            "center": "top"
        }, {
            "x": "3",
            "y": 1,
            "text": "[bold]2018 Q3[/]\nOur dog does not seem to mind the newcomer at all.",
            "center": "bottom"
        }, {
            "x": "4",
            "y": 1,
            "text": "[bold]2018 Q4[/]\nThe quick brown fox jumps over the lazy dog.",
            "center": "top"
        }];

// Create axes
        let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        xAxis.dataFields.category = "x";
        xAxis.renderer.grid.template.disabled = true;
        xAxis.renderer.labels.template.disabled = true;
        xAxis.tooltip.disabled = true;

        let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.min = 0;
        yAxis.max = 1.99;
        yAxis.renderer.grid.template.disabled = true;
        yAxis.renderer.labels.template.disabled = true;
        yAxis.renderer.baseGrid.disabled = true;
        yAxis.tooltip.disabled = true;


// Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX = "x";
        series.dataFields.valueY = "y";
        series.strokeWidth = 4;
        series.sequencedInterpolation = true;

        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.setStateOnChildren = true;
        bullet.states.create("hover");
        bullet.circle.radius = 10;
        bullet.circle.states.create("hover").properties.radius = 15;

        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.setStateOnChildren = true;
        labelBullet.states.create("hover").properties.scale = 1.2;
        labelBullet.label.text = "{text}";
        labelBullet.label.maxWidth = 150;
        labelBullet.label.wrap = true;
        labelBullet.label.truncate = false;
        labelBullet.label.textAlign = "middle";
        labelBullet.label.paddingTop = 20;
        labelBullet.label.paddingBottom = 20;
        labelBullet.label.fill = am4core.color("#999");
        labelBullet.label.states.create("hover").properties.fill = am4core.color("#000");

        labelBullet.label.propertyFields.verticalCenter = "center";


        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;

    }
    render(){
        return (
            <div id="chartdiv3" style={{ width: "100%", height: "100px" }}></div>
        )
    }
}
export  default TimeLine
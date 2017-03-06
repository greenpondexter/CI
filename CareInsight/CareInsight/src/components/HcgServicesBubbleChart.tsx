import * as React from 'react';
import {Panel, Row, Col} from 'react-bootstrap'
import * as d3 from 'd3';
import * as dc from 'dc';
import {HcgServicesBubbleChartPageProps} from '../containers/HcgServicesBubbleChartContainer'

export default class HcgServicesBubbleChart extends React.Component<HcgServicesBubbleChartPageProps, any>{
    constructor(props: HcgServicesBubbleChartPageProps){
        super(props);
    }

	buildChart(){

		const m = [20, 15, 15, 120], //top right bottom left
			w = 960 - m[1] - m[3],
			h = 500 - m[0] - m[2],
			mainHeight = 350 - 50;

        const lanes = ["HIP","HOP","RX","PHY","OTH"]
        const data = this.props.enrAndClaimsData;
		
        var x = d3.time.scale()
				.domain([this.props.dateRange[0], this.props.dateRange[1]])
				.range([0, w]);

        //scale for yaxis on main chart  
		var y1 = d3.scale.linear()
				.domain([0, lanes.length])
				.range([0, mainHeight]);

        

		d3.select(".hcgServicesBubbleChart").html("");

        //wrapper chart svg object that contains both slider and main chart
		var chart = d3.select(".hcgServicesBubbleChart")
					.append("svg")
					.attr("width", w + m[1] + m[3])
					.attr("height", mainHeight + 20)
					.attr("class", "hcgServicesBubbleChartWrapper")
                    

        //main chart 
		var main = chart.append("g")
					.attr("transform", "translate(" + m[3] + "," + m[0] + ")")
					.attr("width", w)
					.attr("height", mainHeight)
					.attr("class", "hcgServicesBubbleChartMain");


		
		//add lanes and text boxes to main chart 
		main.append("g").selectAll(".laneLines")
			.data(data.claimsData)
			.enter().append("line")
			.attr("x1", m[1])
			.attr("y1", function(d:any) {
										var setting: number = 3
										switch(d.setting)
												{
													case "HIP": setting = 1; break;
													case "HOP": setting = 2; break;
										            case "RX": setting = 3; break; 
													case "PHY": setting = 4; break; 
													case "OTH": setting = 5; break; 
												}
										return y1(setting)
									})
										
			.attr("x2", w)
			.attr("y2", function(d:any) {
										var setting: number;
										switch(d.setting)
												{
													case "HIP": setting = 1; break;
													case "HOP": setting = 2; break;
													case "RX": setting = 3; break; 
													case "PHY": setting = 4; break; 
													case "OTH": setting = 5; break; 
												}
										return y1(setting)
									})
			.attr("stroke", "lightgray")   

		main.append("g").selectAll(".laneText")
			.data(lanes)
			.enter().append("text")
			.text(function(d) {return d;})
			.attr("x", -m[1])
			.attr("y", function(d, i) {return y1(i + .5);})
			.attr("dy", ".5ex")
			.attr("text-anchor", "end")
			.attr("class", "laneText");

        //create master rect on slider chart 
		var itemRects = main.append("g")
							.attr("clip-path", "url(#clip)");    


       //believe this is for setting domain of the main chart when slider has been updated
        x.domain([this.props.dateRange[0], this.props.dateRange[1]]);

			//update main chart circles
		var	circles = itemRects.selectAll("circle")
			        .data(data.claimsData)
					.attr("cx", function(d:any) {return x(d.date);})
					.attr("cy", function(d:any) {
                            let setting: number = 0;
							switch (d.setting){
								case "HIP": setting = 30; break;
								case "HOP": setting = 90; break;
								case "RX": setting = 150; break;
								case "PHY": setting = 210; break;
								case "OTH": setting = 270; break;
							}
                            return setting; 
                    })
                    .attr("r", function (d:any) {return (60*.5*(d.paid/data.maxPaid[0]))})
					.style("fill", function(d:any) {
                            let setting:string = '';
							switch (d.setting){
								case "HIP": setting = "blue"; break;
								case "HOP": setting = "orange"; break;
								case "RX": setting = "green"; break;
								case "PHY": setting = "pink"; break;
								case "OTH": setting = "grey"; break;
									}
                                return setting; 
                            }
									
									)
					.style("fill-opacity", .3)
					.style("stroke-opacity", .9)
					.style("stroke", "black")

			
			circles.enter().append("circle")
				.attr("cx", function(d:any) {return x(d.date);})
				.attr("cy", function(d:any) {
                            let setting:number = 0;
							switch (d.setting){
								case "HIP": setting = 30; break;
								case "HOP":setting = 90; break ;
								case "RX": setting = 150; break;
								case "PHY": setting = 210; break;
								case "OTH": setting = 270; break;
							}
                            return setting
				
				})
                .attr("r", function (d:any) {return (60*.5*(d.paid/data.maxPaid[0]))})
				.style("fill", function(d:any) {
                            let setting: string =  ''
							switch (d.setting){
								case "HIP": setting = "blue"; break;
								case "HOP": setting = "orange"; break;
								case "RX": setting = "green"; break;
								case "PHY": setting = "pink"; break;
								case "OTH": setting = "grey"; break;	
                                }
                            return setting; 
                            }
									)
				.style("fill-opacity", .3)
				.style("stroke-opacity", .9)
				.style("stroke", "black")

			circles.exit().remove();             
                
	}

    componentDidUpdate(){ 
	   this.buildChart();
    }

    componentDidMount(prevProps:HcgServicesBubbleChartPageProps, prevState:HcgServicesBubbleChartPageProps){
       this.buildChart();
    }

	componentDidUnmount(){
		d3.select(".hcgServicesBubbleChart").html("");
	}
    

    render(){

        return (
            <div>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                      <Panel header="Claimlines by HCG Setting" bsStyle="careinsight">
                        <div className="hcgServicesBubbleChart">
                        </div>
                      </Panel>
                    </Col>                    
                    <Col md={1}></Col>
                </Row>
            </div>

        )
    }
}

import React, {PropTyes} from 'react';
import {Row, Col} from 'react-bootstrap'
import d3 from 'd3';
import dc from 'dc';
import $ from 'jquery';
import {fromJS} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MemberProfileActions from '../actions/MemberProfileActions';

export default class SliderChart extends React.Component{
    constructor(props){
        super(props);
        
    }

    componentDidMount(prevProps, prevState){
        const m = [20, 15, 15, 90], //top right bottom left
			w = 960 - m[1] - m[3],
			h = 175 - m[0] - m[2],
			miniHeight = 110;
			
        const lanes = ["HIP","HOP","RX","PHY","OTH"]
        const data = this.props.sliderData.toJS();
		
        //scale for xaxis on slider chart
		var xScale = d3.time.scale()
                 .domain([data.minMaxDate[0], data.minMaxDate[1]])
				 .range([0, w-25]);
		
    
        //scale for yaxis on slider chart
		var yScale = d3.scale.linear()
				.domain([0, 300])
				.range([miniHeight, 0]);

		var yScale1 = d3.scale.linear()
				.domain([0, data.minMaxRiskScores[1]])
				.range([miniHeight,0]);
        
        //wrapper chart svg object that contains both slider and main chart
		var chart = d3.select(".timeChart")
					.append("svg")
					.attr("width", w + m[1] + m[3])
					.attr("height", h + m[0] + m[2])
					.attr("class", "chart");
		
		
		//slider chart yaxis 
		var yAxis = d3.svg.axis()
						  .scale(yScale)
						  .orient("left")
						  .ticks(5)

		var yAxis1 = d3.svg.axis()
						  .scale(yScale1)
						  .orient("right")
						  .ticks(5)
		
        //slider xaxis 
		var xAxis = d3.svg.axis()
						   .scale(xScale)
						   .orient("bottom")
						   .ticks(10)
					
		//create slider chart
		var sliderChart = chart.append("g")
					.attr("transform", "translate(" + m[3] + "," +  m[0] + ")")
					.attr("width", w)
					.attr("height", miniHeight)
					.attr("class", "mini")
					.call(yAxis1)
				
	    sliderChart.append("text")
					.attr("transform", "translate(-100, 20) rotate(270)")
				    .attr("class", "x label")
					.attr("text-anchor", "end")
					.attr("x", 15)
					.attr("y", h/2)
					.text("Total Risk Score (purplse)");

		sliderChart.append("text")
					.attr("transform", "translate(800, 20) rotate(270)")
				    .attr("class", "x label")
					.attr("text-anchor", "end")
					.attr("x", 15)
					.attr("y", h/2)
					.text("Claimline Count (Red)");			
		
		sliderChart.append("g")
					.attr("transform", "translate(" + 0 + "," + miniHeight  + ")")
					.call(xAxis);

		
		
		sliderChart.append("g")
					.attr("transform", "translate(" + 830 + "," +  0 + ")")
					.attr("width", w)
					.attr("height", miniHeight)
					.attr("class", "mini")
					.call(yAxis)
		
		
        //create master rect on slider chart 
		var itemRects = chart.append("g")
							.attr("clip-path", "url(#clip)");
		
		//create each of the individual rectangles (claim counts by month)
		sliderChart.append("g").selectAll("miniItems")
			.data(data.servicesMonthSummary)
			.enter().append("rect")
			.attr("x", function(d) {return xScale(d.date) - 10;})
			.attr("y", (d) => {return yScale(d.services_count)})
			.attr("width", 10)
            .attr("height", function(d) {return miniHeight - yScale(d.services_count)})
			.style("fill", "red")
			.style("fill-opacity", .5)
			.style("stroke-opacity", .9)
			.style("stroke", "red");

	    //creation of line chart
		var line = d3.svg.line()
					.x( (d) => {return xScale(d.date) - 10;})
					.y( (d) => {return yScale1(d.risk)})
				   
		const sortedDataByDate = data.enrData.sort((x,y) => {return d3.ascending(x.date, y.date)})

		sliderChart.append("path")
				   .datum(sortedDataByDate)
				   .attr("fill", "none")
					.attr("stroke", "steelblue")
					.attr("stroke-linejoin", "round")
					.attr("stroke-linecap", "round")
					.attr("stroke-width", 1.5)
					.attr("d", line);
				   
		//create brush on slider chart 
		var brush = d3.svg.brush()
							.x(xScale)
							.extent([this.props.dateRange[0], this.props.dateRange[1]])
                            .on("brushend", display);

		sliderChart.append("g")
			.attr("class", "x brush")
			.call(brush)
			.selectAll("rect")
			.attr("y", 1)
			.attr("height", miniHeight - 1);

        //function that is called whenever brush is touhced.  This updates slider
        //position and also performs drawing on main chart
        function display(){
				const 
				minExtent = brush.extent()[0],
				maxExtent = brush.extent()[1];

				sliderChart.select(".brush")
					.call(brush.extent([minExtent, maxExtent]))

				MemberProfileActions.updateDate([minExtent, maxExtent]);

        }
        
        display();
                
    }

	componentDidUnmount(){
		d3.select(".timeChart").html("");
	}

    

    render(){

        return (
            <div>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <div className="timeChart">
                        </div>
                    </Col>                    
                    <Col md={1}></Col>
                </Row>
            </div>

        )
    }
}

SliderChart.propTypes = {
    sliderData : ImmutablePropTypes.list,
	dateRange : React.PropTypes.array
}
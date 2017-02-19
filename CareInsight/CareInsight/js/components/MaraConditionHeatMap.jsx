import React, {PropTyes} from 'react';
import {Panel, Row, Col} from 'react-bootstrap'
import d3 from 'd3';
import dc from 'dc';
import $ from 'jquery';
import {fromJS, toJS} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MemberProfileActions from '../actions/MemberProfileActions';

export default class MaraConditionHeatMap extends React.Component{
    constructor(props){
        super(props);
        
    }

    componentDidUpdate(){
        
    }

    componentDidMount(prevProps, prevState){

        if (typeof(this.props.conditionTreeMap) == "undefined" || this.props.conditionTreeMap === null) return; 
        
       var w = 400,
            h = 260,
            x = d3.scale.linear().range([0, w]),
            y = d3.scale.linear().range([0, h]),
            color = d3.scale.category20c(),
            root,
            node;

        const data = this.props.conditionTreeMap.toJS();

        var treemap = d3.layout.treemap()
            .round(false)
            .size([w, h])
            .sticky(true)
            .value(function(d) { return d.mem_count; });

        var svg = d3.select(".maraConditionHeatMap").append("div")
            .attr("class", "chart")
            .style("width", w + "px")
            .style("height", h + "px")
        .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
        .append("svg:g")
            .attr("transform", "translate(.5,.5)");

        node = root = data;
        console.log(data);
        var nodes = treemap.nodes(root)
            .filter(function(d) {return !d.children; });

        var cell = svg.selectAll("g")
            .data(nodes)
            .enter().append("svg:g")
            .attr("class", "cell")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .on("click", function(d) { return zoom(node == d.parent ? root : d.parent); });

        cell.append("svg:rect")
            .attr("width", function(d) { return d.dx - 1; })
            .attr("height", function(d) { return d.dy - 1; })
            .style("fill", function(d) {return color(d.parent.name); });

        cell.append("svg:text")
            .attr("x", function(d) { return d.dx / 2; })
            .attr("y", function(d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.name; })
            .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });

        d3.select(window).on("click", function() { zoom(root); });

        d3.select("select").on("change", function() {
            //treemap.value(this.value == "size" ? size : count).nodes(root);
            treemap.value((this.value == "amt_paid") ? amt_paid : mem_count ).nodes(root);
            zoom(node);
        });

        function mem_count(d) {
        return d.mem_count;
        }

        function amt_paid(d) {
        return d.amt_paid;
        }

        function count(d) {
        return 1;
        }

        function zoom(d) {
        var kx = w / d.dx, ky = h / d.dy;
        x.domain([d.x, d.x + d.dx]);
        y.domain([d.y, d.y + d.dy]);

        var t = svg.selectAll("g.cell").transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        t.select("rect")
            .attr("width", function(d) { return kx * d.dx - 1; })
            .attr("height", function(d) { return ky * d.dy - 1; })

        t.select("text")
            .attr("x", function(d) { return kx * d.dx / 2; })
            .attr("y", function(d) { return ky * d.dy / 2; })
            .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });

        node = d;
        d3.event.stopPropagation();
        }

    }

    

    render(){

        return (
            <div>
                <Row>
                    <Col md={12}>
                        <div className="maraConditionHeatMap">
                        </div>
                    </Col>                    
                </Row>
            </div>

        )
    }
}

MaraConditionHeatMap.propTypes = {
    conditionTreeMap : ImmutablePropTypes.map
}
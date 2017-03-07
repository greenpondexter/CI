import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import IpBarChart from '../components/IpBarChart'
import {triggerBrushUpdate} from '../actions/populationAnalyzerActions'

 interface IpBarChartProps {
    fullSet: any,
    ipDimension: any,
    crossFilterSet: any,
    width: number,
    height: number 
}

export interface IpBarChartDispatchProps {
    onPopulationAnalyzerBrushUpdate(): void; 
}

export type IpBarChartPageProps = IpBarChartProps & IpBarChartDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        fullSet: (function(s){return s.populationAnalyzerReducer().get('fullSet')})(state),
        ipDimension: (function(s){return s.populationAnalyzerReducer().get('ipDimension')})(state),
        crossFilterSet: (function(s){return s.populationAnalyzerReducer().get('crossFilterSet')})(state),
        width: (function(){return 250}),
        height: (function(){return 240})
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onPopulationAnalyzerBrushUpdate: () => {
            dispatch(triggerBrushUpdate())
        }
    }
}


export const IpBarChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(IpBarChart)

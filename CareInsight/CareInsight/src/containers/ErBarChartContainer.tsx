import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import ErBarChart from '../components/ErBarChart'
import {triggerBrushUpdate} from '../actions/populationAnalyzerActions'

 interface ErBarChartProps {
    fullSet: any,
    erDimension: any,
    crossFilterSet: any,
    width: number,
    height: number 
}

export interface ErBarChartDispatchProps {
    onPopulationAnalyzerBrushUpdate(): void; 
}

export type ErBarChartPageProps = ErBarChartProps & ErBarChartDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        fullSet: (function(s){return s.populationAnalyzerReducer().get('fullSet')})(state),
        erDimension: (function(s){return s.populationAnalyzerReducer().get('erDimension')})(state),
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


export const ErBarChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ErBarChart)

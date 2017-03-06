import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import AgeBarChart from '../components/AgeBarChart'
import {triggerBrushUpdate} from '../actions/populationAnalyzerActions'

 interface AgeBarChartProps {
    fullSet: any,
    ageDimension: any,
    crossFilterSet: any,
    width: number,
    height: number 
}

export interface AgeBarChartDispatchProps {
    onPopulationAnalyzerBrushUpdate(): void; 
}

export type AgeBarChartPageProps = AgeBarChartProps & AgeBarChartDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        fullSet: (function(s){return s.populationAnalyzerReducer().get('fullSet')})(state),
        ageDimension: (function(s){return s.populationAnalyzerReducer().get('ageDimension')})(state),
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


export const AgeBarChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AgeBarChart)

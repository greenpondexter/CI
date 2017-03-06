import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import ClaimDollarsBarChart from '../components/ClaimDollarsBarChart'
import {triggerBrushUpdate} from '../actions/populationAnalyzerActions'

 interface ClaimDollarsBarChartProps {
    fullSet: any,
    allowedDimension: any,
    crossFilterSet: any,
    width: number,
    height: number 
}

export interface ClaimDollarsBarChartDispatchProps {
    onPopulationAnalyzerBrushUpdate(): void; 
}

export type ClaimDollarsBarChartPageProps = ClaimDollarsBarChartProps & ClaimDollarsBarChartDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        fullSet: (function(s){return s.populationAnalyzerReducer().get('fullSet')})(state),
        allowedDimension: (function(s){return s.populationAnalyzerReducer().get('allowedDimension')})(state),
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


export const ClaimDollarsBarChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClaimDollarsBarChart)

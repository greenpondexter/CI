import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import ProsScatterPlotChart from '../components/ProsScatterPlotChart'
import {triggerBrushUpdate} from '../actions/populationAnalyzerActions'

 interface ProsScatterPlotChartProps {
    fullSet: any,
    prosDimension: any,
    crossFilterSet: any,
    width: number,
    height: number 
}

export interface ProsScatterPlotChartDispatchProps {
    onPopulationAnalyzerBrushUpdate(): void; 
}

export type ProsScatterPlotChartPageProps = ProsScatterPlotChartProps & ProsScatterPlotChartDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        fullSet: (function(s){return s.populationAnalyzerReducer().get('fullSet')})(state),
        prosDimension: (function(s){return s.populationAnalyzerReducer().get('prosDimension')})(state),
        crossFilterSet: (function(s){return s.populationAnalyzerReducer().get('crossFilterSet')})(state),
        width: (function(){return 400}),
        height: (function(){return 400})
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onPopulationAnalyzerBrushUpdate: () => {
            dispatch(triggerBrushUpdate())
        }
    }
}


export const ProsScatterPlotChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProsScatterPlotChart)

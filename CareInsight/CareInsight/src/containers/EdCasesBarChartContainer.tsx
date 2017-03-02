import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import EdCasesBarChart from '../components/EdCasesBarChart'
import {triggerBrushUpdate} from '../actions/populationAnalyzerActions'

 interface EdCasesBarChartProps {
    fullSet: any,
    edCasesDimension: any,
    crossFilterSet: any,
    width: number,
    height: number 
}

export interface EdCasesBarChartDispatchProps {
    onPopulationAnalyzerBrushUpdate(): void; 
}

export type EdCasesBarChartPageProps = EdCasesBarChartProps & EdCasesBarChartDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        fullSet: (function(s){return s.populationAnalyzerReducer().get('fullSet')})(state),
        edCasesDimension: (function(s){return s.populationAnalyzerReducer().get('edCasesDimension')})(state),
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


export const EdCasesBarChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EdCasesBarChart)

import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import AdmitsBarChart from '../components/AdmitsBarChart'
import {triggerBrushUpdate} from '../actions/populationAnalyzerActions'

 interface AdmitsBarChartProps {
    fullSet: any,
    admitsDimension: any,
    crossFilterSet: any,
    width: number,
    height: number 
}


export interface AdmitsBarChartDispatchProps {
    onPopulationAnalyzerBrushUpdate(): void; 
}

export type AdmitsBarChartPageProps = AdmitsBarChartProps & AdmitsBarChartDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        fullSet: (function(s){return s.populationAnalyzerReducer().get('fullSet')})(state),
        admitsDimension: (function(s){return s.populationAnalyzerReducer().get('admitsDimension')})(state),
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


export const AdmitsBarChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdmitsBarChart)

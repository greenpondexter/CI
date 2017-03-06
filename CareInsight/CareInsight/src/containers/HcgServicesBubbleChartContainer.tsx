import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import HcgServicesBubbleChart from '../components/HcgServicesBubbleChart'
import {triggerPopAnalyzerFilter} from '../actions/populationAnalyzerActions'

 interface HcgServicesBubbleChartProps {
    dateRange: Array<any>
    enrAndClaimsData : any
 }

export interface HcgServicesBubbleChartDispatchProps {
    onPopulationAnalyzerFilterUpdate(filter:string, val:any): void;
}

export type HcgServicesBubbleChartPageProps = HcgServicesBubbleChartProps & HcgServicesBubbleChartDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        dateRange : (function(s){return s.memberProfileReducer().get('dateRange')})(state),
        enrAndClaimsData : (function(s){return s.memberProfileReducer().get('enrAndClaimsData')})(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onPopulationAnalyzerFilterUpdate: (_filter:string, _val: any) => {
            dispatch(triggerPopAnalyzerFilter({filter: _filter, val: _val}))
        }
    }
}


export const HcgServicesBubbleChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HcgServicesBubbleChart)

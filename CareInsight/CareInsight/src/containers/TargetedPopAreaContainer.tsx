import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import TargetedPopArea from '../components/TargetedPopArea'

 interface TargetedPopAreaProps {
    fullSet: any,
    prosDimension: any,
    crossFilterSet: any
}

export interface TargetedPopAreaDispatchProps {
    onPopulationAnalyzerLoad(): void; 
}

export type TargetedPopAreaPageProps = TargetedPopAreaProps & TargetedPopAreaDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        fullSet: (function(s){return s.populationAnalyzerReducer().get('fullSet')})(state),
        prosDimension: (function(s){return s.populationAnalyzerReducer().get('prosDimension')})(state),
        crossFilterSet: (function(s){return s.populationAnalyzerReducer().get('crossFilterSet')})(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {}
}





export const TargetedPopAreaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetedPopArea)

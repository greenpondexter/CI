import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import TargetedPopTable from '../components/TargetedPopTable'
import {triggerBrushUpdate} from '../actions/populationAnalyzerActions'

 interface TargetedPopTableProps {
    tableSet: any,
}

export interface TargetedPopTableDispatchProps {
    onPopulationAnalyzerBrushUpdate(): void; 
}

export type TargetedPopTablePageProps = TargetedPopTableProps & TargetedPopTableDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        tableSet: (function(s){return s.populationAnalyzerReducer().get('tableSet')})(state),
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onPopulationAnalyzerBrushUpdate: () => {
            dispatch(triggerBrushUpdate())
        }
    }
}


export const TargetedPopTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetedPopTable)

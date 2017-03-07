import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import FilterPane from '../components/FilterPane'
import {triggerPopAnalyzerFilter} from '../actions/populationAnalyzerActions'

 interface FilterPaneProps {
    filters: any
 }

export interface FilterPaneDispatchProps {
    onPopulationAnalyzerFilterUpdate(filter:string, val:any): void;
}

export type FilterPanePageProps = FilterPaneProps & FilterPaneDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        filters: (function(s){return s.populationAnalyzerUpdateFilterReducer().get('filters')})(state)
       
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onPopulationAnalyzerFilterUpdate: (_filter:string, _val: any) => {
            dispatch(triggerPopAnalyzerFilter({filter: _filter, val: _val}))
        }
    }
}


export const FilterPaneContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterPane)

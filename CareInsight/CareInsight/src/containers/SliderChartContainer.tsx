import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import SliderChart from '../components/SliderChart'
import {triggerMemberProfileBrushUpdate} from '../actions/MemberProfileActions'

 interface SliderChartProps {
    dateRange: Array<any>
    enrAndClaimsData : any
}

export interface SliderChartDispatchProps {
    onMemberProfileBrushUpdate(dates: Array<any>): void; 
}

export type SliderChartPageProps = SliderChartProps & SliderChartDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        dateRange : (function(s){return s.memberProfileReducer().get('dateRange')})(state),
        enrAndClaimsData : (function(s){return s.memberProfileReducer().get('enrAndClaimsData')})(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onMemberProfileBrushUpdate: (_dates: Array<any>) => {
            dispatch(triggerMemberProfileBrushUpdate({dates: _dates}))
        }
    }
}





export const SliderChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SliderChart)

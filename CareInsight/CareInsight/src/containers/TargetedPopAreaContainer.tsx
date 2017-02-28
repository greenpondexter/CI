import {Record} from 'immutable'
import {connect} from 'react-redux'
import TargetedPopArea from '../../js/components/TargetedPopArea'

export interface TargetedPopAreaProps {
    fullSet: any,
    prosDimension: any
}

export interface TargetedPopAreaDispatchProps {
    onPopulationAnalyzerLoad(): void; 
}

export type TargetedPopAreaPageProps = TargetedPopAreaProps & TargetedPopAreaDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        fullSet: (function(s){return s.onPopulationAnalyzerLoad().get('fullSet')})(state),
        prosDimension: (function(s){return s.onPopulationAnalyzerLoad().get('prosDimension')})(state)
    }
}



const mapDispatchToProps = (dispatch: any) => {
    return {
            }
}

export const TargetedPopAreaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetedPopArea as any)

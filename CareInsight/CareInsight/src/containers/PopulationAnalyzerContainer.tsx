import {Record} from 'immutable'
import {connect} from 'react-redux'
import {switchPage} from '../actions/sessionActions'
import {triggerPopAnalyzer} from '../actions/populationAnalyzerActions'
import PopulationAnalyzer from '../../js/components/PopulationAnalyzer'

export interface PopulationAnalyzerProps {
    page: string,
    fullSet: any,
    counter: number 
}

export interface PopulationAnalyzerDispatchProps {
    onPopulationAnalyzerLoad(): void;
}

export type PopulationAnalyzerPageProps = PopulationAnalyzerProps & PopulationAnalyzerDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        page: (function(s){return s.onPopulationAnalyzerLoad().get('page')})(state),
        fullSet: (function(s){return s.onPopulationAnalyzerLoad().get('fullSet')})(state),
        counter: (function(s){return s.onPopulationAnalyzerLoad().get('counter')})(state)
    }
}



const mapDispatchToProps = (dispatch: any) => {
    return {
        onPopulationAnalyzerLoad: () => {
            dispatch(triggerPopAnalyzer())
        }
    }
}


export const PopulationAnalyzerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PopulationAnalyzer as any)

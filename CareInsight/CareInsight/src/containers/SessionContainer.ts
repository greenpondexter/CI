import {Record} from 'immutable'
import {connect} from 'react-redux'
import {triggerPopAnalyzer} from '../actions/populationAnalyzerActions'
import App from '../components/App'

export interface StateProps {
    page: string
}

export interface DispatchProps {
    onPopulationAnalyzerLoad(): void;

}

export type AppPageProps = StateProps & DispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        page: (function(s){
            return s.switchPageReducer().get('page')
        })(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onPopulationAnalyzerLoad: () => {
            dispatch(triggerPopAnalyzer())
        }
    }
}

export const SessionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

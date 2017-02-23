import {Record} from 'immutable'
import {connect} from 'react-redux'
import {loadPopAnalyzer} from '../actions/populationAnalyzerActions'
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
            return s.populationAnalyzerReducer().get('a')
        })(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onPopulationAnalyzerLoad: () => {
            dispatch(loadPopAnalyzer())
        }
    }
}

export const SessionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

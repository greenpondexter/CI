import {Record} from 'immutable'
import {connect} from 'react-redux'
import {switchPage} from '../actions/sessionActions'
import App from '../../js/components/App'

export interface StateProps {
    page: string
}

export interface DispatchProps {
    onPageUpdate(page: string): void;
}

export type AppPageProps = StateProps & DispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        page: (function(s){return s.onPageUpdate().get('page')})(state)
    }
}



const mapDispatchToProps = (dispatch: any) => {
    return {
        onPageUpdate: (text:string) => {
            dispatch(switchPage(text))
        }
    }
}


export const SessionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

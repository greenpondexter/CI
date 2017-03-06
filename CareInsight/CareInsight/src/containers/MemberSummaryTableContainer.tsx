import {Record} from 'immutable'
import {connect} from 'react-redux'
import {switchPage} from '../actions/sessionActions'
import {triggerMemberSwitch} from '../actions/MemberProfileActions'
import MemberSummaryTable from '../components/MemberSummaryTable'
// import {MemberProfileReducer} from '../reducers/sessionReducer'


 interface MemberSummaryTableProps {
    summaryData: any
}

export interface MemberSummaryTableDispatchProps {
    onMemberProfileLoad(memberKey: number): void;
}


export type MemberSummaryTablePageProps = MemberSummaryTableProps & MemberSummaryTableDispatchProps;


const mapStateToProps = (state: any): any => {
    return {
         summaryData: (function(s){return s.memberProfileReducer().get('summaryData')})(state)
    }
}



const mapDispatchToProps = (dispatch: any) => {
    return {
    }
}


export const MemberSummaryTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberSummaryTable as any)

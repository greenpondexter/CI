import {Record} from 'immutable'
import {connect} from 'react-redux'
import {switchPage} from '../actions/sessionActions'
import {triggerMemberSwitch} from '../actions/MemberProfileActions'
import MemberProfile from '../components/MemberProfile'
// import {MemberProfileReducer} from '../reducers/sessionReducer'


 interface MemberProfileProps {
    memberKey: number
}

export interface MemberProfileDispatchProps {
    onMemberProfileLoad(memberKey: number): void;
}


export type MemberProfilePageProps = MemberProfileProps & MemberProfileDispatchProps;


const mapStateToProps = (state: any): any => {
    return {
         memberKey: (function(s){return s.switchPageReducer().get('memberKey')})(state)
    }
}



const mapDispatchToProps = (dispatch: any) => {
    return {
        onMemberProfileLoad: (_memberKey: number) => {
            dispatch(triggerMemberSwitch({memberKey: _memberKey}))
        }
    }
}


export const MemberProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberProfile as any)

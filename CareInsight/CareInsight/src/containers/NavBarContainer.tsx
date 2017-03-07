import * as React from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {Panel, Row, Col} from 'react-bootstrap';
import NavBar from '../components/NavBar'
import {switchPage} from '../actions/sessionActions'


 interface NavBarProps {
    memberKey: any,
}

export interface NavBarDispatchProps {
    onPageSwitch(page: string, memberKey: any): void;

}

export type NavBarPageProps = NavBarProps & NavBarDispatchProps;

const mapStateToProps = (state: any): any => {
    return {
        memberKey: (function(s){return s.switchPageReducer().get('memberKey')})(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onPageSwitch: (_page:string, _memberKey: any) => {
            dispatch(switchPage({page: _page, memberKey : _memberKey}))
        }

    }
}


export const NavBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar)

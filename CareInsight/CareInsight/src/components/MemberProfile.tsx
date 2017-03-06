
import * as React from 'react';
import * as d3 from 'd3';
import {MemberSummaryTableContainer} from '../containers/MemberSummaryTableContainer'
import {HcgServicesBubbleChartContainer} from '../containers/HcgServicesBubbleChartContainer'
import {SliderChartContainer} from '../containers/SliderChartContainer'
import NavBar from './NavBar';
import {Panel, Row, Col} from 'react-bootstrap';
import * as dc from 'dc';
import {MemberProfilePageProps} from '../containers/MemberProfileContainer'

export default class MemberProfile extends React.Component<MemberProfilePageProps,any>{
  constructor(props:MemberProfilePageProps){
      super(props)
  }

  componentWillMount(){
      this.props.onMemberProfileLoad(this.props.memberKey)
  }


  render(){

    //on initial render during mounting, render null element as data fetching 
    //doesn't begin until componentWillMount 
    if(typeof(this.props.enrAndClaimsData.claimsData) == 'undefined'){
      return (<div></div>)
    }

    return (
        <div>
          <div className='col-lg-12'>
              <NavBar />
          </div>
          <MemberSummaryTableContainer/>
          <Row>
             <Col md={2}></Col>
               <Col md={8}>
                 <SliderChartContainer/>
             </Col>
           <Col md={2}></Col>
          </Row>
          <Row>
            <Col md={2}></Col>
                <Col md={8}>
                    <HcgServicesBubbleChartContainer/>
                </Col>
              <Col md={2}></Col>
          </Row>
        </div>
    );
  }

}



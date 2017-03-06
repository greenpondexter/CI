
import * as React from 'react';
import * as d3 from 'd3';
import {MemberSummaryTableContainer} from '../containers/MemberSummaryTableContainer'
import {HcgServicesBubbleChartContainer} from '../containers/HcgServicesBubbleChartContainer'
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
          
          {/*<Row>
             <Col md={2}></Col>
               <Col md={8}>
                <AltContainer stores = {[ProfileDataStore]}
                inject = {{
                    hcgData : () => ProfileDataStore.getState().enrAndClaimsData,
                    dateRange : () => ProfileDataStore.getState().dateRange.toJS(),
                    sliderData : () => ProfileDataStore.getState().enrAndClaimsData
                }} 
                >
                <SliderChart/>
                </AltContainer>
             </Col>
           <Col md={2}></Col>
          </Row>*/}
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

//   componentDidUpdate(prevProps, prevState){
      
//       const chart = dc.pieChart('.hcgChart')

//       chart
//         .height(180)
//         .width(180)
//         .dimension(this.props.hcgData.get('setting'))
//         .group(this.props.hcgData.get('data'))
//         .radius(80)
//         .innerRadius(30)
//         .render()
//   }


}



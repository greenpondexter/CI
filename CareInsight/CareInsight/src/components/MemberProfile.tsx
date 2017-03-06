
import * as React from 'react';
import * as d3 from 'd3';
// import ProfileDataStore from '../stores/ProfileDataStore';
// import SliderChart from './SliderChart';
// import DrgBarChart from './DrgBarChart';
// import IcdDiagBarChart from './IcdDiagBarChart';
// import HcgServicesBubbleChart from './HcgServicesBubbleChart'
// import HcgBreakdownPieChart from './HcgBreakdownPieChart'
// import MemberProfileActions from '../actions/MemberProfileActions';
import {MemberSummaryTableContainer} from '../containers/MemberSummaryTableContainer'
import NavBar from './NavBar';
import {Panel, Row, Col} from 'react-bootstrap';
import * as dc from 'dc';
import {MemberProfilePageProps} from '../containers/MemberProfileContainer'

export default class MemberProfile extends React.Component<MemberProfilePageProps,any>{
  constructor(props:MemberProfilePageProps){
      super(props)

  }

  componentWillMount(){
      //MemberProfileActions.loadMemberData.defer();
      this.props.onMemberProfileLoad(this.props.memberKey)
  }

  //if data hasn't been loaded, don't update

  render(){

    //on initial render during mounting, render null element as data fetching 
    //doesn't begin until componentWillMount 
    // if(this.props.summaryData.size == 0){
    //   return (<div></div>)
    //}

    return (
        <div>
          <div className='col-lg-12'>
              <NavBar />
          </div>
          <MemberSummaryTableContainer/>
          
          {/*<div className='col-lg-12 allCharts'>
              <Row>
                <Col md={3}></Col>
                <Col md={6}>
                <Row>
                    <div className={"col-lg-12"}>
                      <div className="ibox float-e-margins">
                          <div className="ibox-title">
                            <h5></h5>
                          </div>
                          <div className="ibox-content boxContentNoPadding">
                            <div className= 'row noPaddingRow'>
                                <div className="col-lg-6">
                                  <div className="widget style1 navy-bg">
                                      <div className="row vertical-align">
                                        <div className="col-xs-3">
                                            <i className="fa fa-user fa-3x">Member:</i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            <h2 className={"font-bold "}>{this.props.summaryData.get('member_name')}</h2>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="widget style1 navy-bg">
                                      <div className="row vertical-align">
                                        <div className="col-xs-3">
                                            <i>PMPM:</i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            <h2 className={"font-bold"}>{this.props.summaryData.get('pmpm')}</h2>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                            <table className="table table-striped table-bordered table-hover scoresTable" style={{marginBottom: 0}} id="editable" >
                            <thead >
                                <tr>
                                  <th className = "targeted-population-header">Age</th>
                                  <th className = "targeted-population-header">Gender</th>
                                  <th className = "targeted-population-header">Member Key</th>
                                  <th className = "targeted-population-header">Member ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="thinRow">
                                  <td className={"rowVal"}>{this.props.summaryData.get('age')}</td>
                                  <td className={"rowVal" }>{this.props.summaryData.get('gender')}</td>
                                  <td className={"rowVal" }>{this.props.summaryData.get('member_key')}</td>
                                  <td className={"rowVal "}>{this.props.summaryData.get('member_id')}</td>
                                </tr>
                            </tbody>
                            </table>
                            <table className="table table-striped table-bordered table-hover scoresTable" id="editable" >
                                <thead >
                                  <tr>
                                      <th className = "targeted-population-header">Member Months</th>
                                      <th className = "targeted-population-header">Total Paid</th>
                                      <th className = "targeted-population-header">Total Allowed</th>
                                      <th className = "targeted-population-header">Admits</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="thinRow">
                                      <td className={"rowVal"}>{this.props.summaryData.get('mm')}</td>
                                      <td className={"rowVal" }>{this.props.summaryData.get('paid')}</td>
                                      <td className={"rowVal "}>{this.props.summaryData.get('allowed')}</td>
                                      <td className={"rowVal "}>{this.props.summaryData.get('admits')}</td>
                                  </tr>
                                </tbody>
                            </table>
                          </div>
                      </div>
                    </div>
                </Row>
                </Col>
              <Col md={3}></Col>
            </Row>
          </div>*/}




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
          </Row>
          <Row>
            <Col md={2}></Col>
                <Col md={8}>
                    <AltContainer stores = {[ProfileDataStore]}
                    inject = {{
                        hcgData : () => ProfileDataStore.getState().enrAndClaimsData,
                        dateRange : () => ProfileDataStore.getState().dateRange.toJS(),
                        sliderData : () => ProfileDataStore.getState().enrAndClaimsData
                    }} 
                    >
                    <HcgServicesBubbleChart/>
                    </AltContainer>
                </Col>
              <Col md={2}></Col>
          </Row>*/}
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



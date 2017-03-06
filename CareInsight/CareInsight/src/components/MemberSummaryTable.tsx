import * as React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import {MemberSummaryTablePageProps} from '../containers/MemberSummaryTableContainer'

export default class MemberSummaryTable extends React.Component<MemberSummaryTablePageProps,any>{
  constructor(props:MemberSummaryTablePageProps){
        super(props);
    }

  render() {
    return (
       <div className='col-lg-12 allCharts'>
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
                                            <h2 className={"font-bold "}>{this.props.summaryData.member_name}</h2>
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
                                            <h2 className={"font-bold"}>{this.props.summaryData.pmpm}</h2>
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
                                  <td className={"rowVal"}>{this.props.summaryData.age}</td>
                                  <td className={"rowVal" }>{this.props.summaryData.gender}</td>
                                  <td className={"rowVal" }>{this.props.summaryData.member_key}</td>
                                  <td className={"rowVal "}>{this.props.summaryData.member_id}</td>
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
                                      <td className={"rowVal"}>{this.props.summaryData.mm}</td>
                                      <td className={"rowVal" }>{this.props.summaryData.paid}</td>
                                      <td className={"rowVal "}>{this.props.summaryData.allowed}</td>
                                      <td className={"rowVal "}>{this.props.summaryData.admits}</td>
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
          </div> 
    )
  }
}

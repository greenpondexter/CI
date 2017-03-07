import * as React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import {TargetedPopTablePageProps} from '../containers/TargetedPopTableContainer'
import {Column, Table} from 'react-virtualized';

export default class TargetedPopTable extends React.Component<TargetedPopTablePageProps,any>{
  constructor(props: TargetedPopTablePageProps){
        super(props);   
    }
  
  render () {

    return (
      <div >
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
              <Table
                  width={1300}
                  height={300}
                  headerHeight={50}
                  rowHeight={40}
                  rowCount={this.props.tableSet.length}
                  rowGetter={({index}) => this.props.tableSet[index]}
                  onRowClick={(d)=>{this.props.onPageSwitch( 'MEMBER_PROFILE', (d as any).rowData.member_key)}
                             }
                >
                  <Column
                    label='ID'
                    dataKey='member_key'
                    width={70}
                  />
                  <Column
                    width={140}
                    label='Attrib PCP'
                    dataKey='attrib_pcp'
                  />
                  <Column
                    width={70}
                    label='Age'
                    dataKey='age'
                  />
                  <Column
                    width={150}
                    label='Last PCP Visit'
                    dataKey='last_visit'
                  />
                <Column
                  width={170}
                  label='Prior Pro Risk'
                  dataKey='prev_pros_risk_score'
                />
                <Column
                  label='Cur. Pro Risk'
                  dataKey='cur_pros_risk_score'
                  width={170}
                />
                <Column
                  label='Cur. IP Risk Prob'
                  dataKey='ip_prob'
                  width={170}
                />
                <Column
                  label='Cur. ER Risk Prob'
                  dataKey='ed_prob'
                  width={170}
                />
                <Column
                  label='Risk Strata'
                  dataKey='risk_strata'
                  width={170}
                />
                <Column
                  label='Proj Tot Cost'
                  dataKey='proj_tot_cost'
                  width={120}
                />
                <Column
                  label='Proj Rx Cost'
                  dataKey='proj_rx_cost'
                  width={120}
                />
            </Table>
        </Col>
        <Col md={1}></Col>
       </Row>
      </div>
    );
  }
}



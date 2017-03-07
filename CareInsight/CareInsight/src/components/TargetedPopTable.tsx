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
                    width={40}
                    label='MM'
                    dataKey='mm_count'
                  />
                  <Column
                    width={70}
                    label='Age'
                    dataKey='age'
                  />
                  <Column
                    width={150}
                    label='CCHG'
                    dataKey='cchg'
                  />
                  <Column
                  width={110}
                  label='Paid'
                  dataKey='amt_paid'
                />
                <Column
                  label='Allowed'
                  dataKey='amt_allowed'
                  width={110}
                />
                <Column
                  width={110}
                  label='ED Cases'
                  dataKey='qty_ed_admits'
                />
                <Column
                  label='Admits'
                  dataKey='qty_admits'
                  width={90}
                />
                <Column
                  width={140}
                  label='PCP Visits'
                  dataKey='qty_pcp_visits'
                />
                <Column
                  label='Spec Visits'
                  dataKey='qty_spec_visits'
                  width={140}
                />
                <Column
                  width={170}
                  label='Pre. Pro Risk'
                  dataKey='prev_pros_risk_score'
                />
                <Column
                  label='Cur. Pro Risk'
                  dataKey='cur_pros_risk_score'
                  width={170}
                />
                <Column
                  label='Cur. OP Risk'
                  dataKey='cur_pro_op'
                  width={170}
                />
                <Column
                  label='Cur. ER Risk'
                  dataKey='cur_pro_ip'
                  width={170}
                />
            </Table>
        </Col>
        <Col md={1}></Col>
       </Row>
      </div>
    );
  }
}



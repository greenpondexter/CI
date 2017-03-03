import * as React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import {Row, Col} from 'react-bootstrap';
import {TargetedPopTablePageProps} from '../containers/TargetedPopTableContainer'
import {Column, Table} from 'react-virtualized';

//import 'react-virtualized/styles.css';

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
                  rowGetter={({ index }) => this.props.tableSet[index]}
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
                  width={90}
                  label='Paid'
                  dataKey='amt_paid'
                />
                <Column
                  label='Allowed'
                  dataKey='amt_allowed'
                  width={90}
                />
                <Column
                  width={110}
                  label='ED Cases'
                  dataKey='qty_ed_admits'
                />
                <Column
                  label='Admits'
                  dataKey='qty_admits'
                  width={70}
                />
                <Column
                  width={170}
                  label='Prev. Prosp Risk'
                  dataKey='cur_pros_risk_score'
                />
                <Column
                  label='Cur. Prosp Risk'
                  dataKey='prev_pros_risk_score'
                  width={170}
                />
                <Column
                  width={170}
                  label='Prev. OP Risk'
                  dataKey='prev_pro_op'
                />
                <Column
                  label='Cur. OP Risk'
                  dataKey='cur_pro_op'
                  width={170}
                />
                <Column
                  width={170}
                  label='Prev. Prosp ER'
                  dataKey='prev_pro_ip'
                />
                <Column
                  label='Cur. Prosp ER'
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


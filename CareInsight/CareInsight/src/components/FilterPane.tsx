import * as React from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import * as _ from 'lodash';
import {FilterPanePageProps} from '../containers/FilterPaneContainer'
import {Panel, FormGroup, FormControl, ControlLabel, Row, Col} from 'react-bootstrap';

export default class FilterPane extends React.Component<FilterPanePageProps, any>{
    
    cchgVals: Array<any>;
    payerVals: Array<any>;
    ageVals: Array<any>; 

  constructor(props: FilterPanePageProps){
        super(props);

        this.cchgVals = [];
        this.payerVals = [];
        this.ageVals = [];

        this.loadFilters.bind(this);
  }

  componentWillMount(){
    this.loadFilters()
  }

  componentWillUpdate(){
    this.loadFilters()
  }

  loadFilters(){
       this.cchgVals = _.map(this.props.filters.cchgFilter.values, (d: string) => {
          return <option value="`${d}`" >{d}</option>
      })

      this.payerVals = _.map(this.props.filters.payerTypeFilter.values, (d: string) => {
          return <option value="`${d}`" >{d}</option>
      })

      this.ageVals = _.map(this.props.filters.ageFilter.values, (d: string) => {
          return <option value="`${d}`" >{d}</option>
      })
  }

  render() {
      
      if(this.props.filters.cchgVals === null) return (<div></div>)
      
      let self = this;

      return (
        <div>
         <Row>
            <Panel header="Filters" bsStyle="careinsight">
                <Row>
                  <Col md={2}></Col>
                  <Col md={3}>
                    <FormGroup controlId="formControlsSelect">
                    <ControlLabel>CCHG:</ControlLabel>
                    <FormControl componentClass="select" placeholder="select"
                       onChange={(evt)=>{
                        {self.props.onPopulationAnalyzerFilterUpdate('CCHG', evt)}
                    }}>
                        {self.cchgVals}
                    </FormControl>
                    </FormGroup>
                   </Col>
                   <Col md={3}>
                    <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Payer Type:</ControlLabel>
                    <FormControl componentClass="select" placeholder="select"
                       onChange={(evt)=>{
                        {self.props.onPopulationAnalyzerFilterUpdate('Payer', evt)}
                    }}>
                        {self.payerVals}
                    </FormControl>
                    </FormGroup>
                   </Col>
                   <Col md={2}>
                    <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Age:</ControlLabel>
                    <FormControl componentClass="select" placeholder="select"
                       onChange={(evt)=>{
                        {self.props.onPopulationAnalyzerFilterUpdate('Age', evt)}
                    }}>
                        {self.ageVals}
                    </FormControl>
                    </FormGroup>
                   </Col>
                   <Col md={2}></Col>
                </Row>
            </Panel>
          </Row>
        </div>
      );
  }

  

}

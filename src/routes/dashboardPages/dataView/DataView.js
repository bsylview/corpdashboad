import React, { PropTypes, Component  } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Pagination from 'react-bootstrap/lib/Pagination';
import Well from 'react-bootstrap/lib/Well';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DataView.css';
import _ from 'underscore-node';
import { Col,  ControlLabel,
  FormControl,  HelpBlock, FormGroup,  Checkbox,  Form,  Radio,
   InputGroup,  Glyphicon } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const title = 'Data View';
const cols = {
  submitted:"Submitted date",
  status:"Status",
  employee:"Employee",
  customer:"Customer",
  issue:"Issue"
};

function preprocessData(issues) {
  const data = [];
  for (let i = 0; i < issues.length; i++) {
    var status = (issues[i].status === 'open') ? issues[i].status : 'Closed: ' + issues[i].closed_timestamp;
    var customer = issues[i].customer_name + ": " +  issues[i].customer_email;
    data.push(
        {
          submitted:issues[i].submission_timestamp,
          status: status,
          employee:issues[i].employee_name,
          customer:customer,
          issue:issues[i].description
        });
  }
  console.log(data);
  return data;
};

function displayCharts(props, context) {
  context.setTitle(title);
  let rows = preprocessData(context.issues);
  return (
    <div>

      <div className="row">
        <div className="col-lg-12">
          <PageHeader>Data View</PageHeader>
        </div>
      </div>

        <div className='panel panel-default'>
              <div className='panel-body'>

                    <BootstrapTable
                      ref='table' data={rows}
                      search={ true } multiColumnSearch={ true } striped={true} hover={true} exportCSV={ true }
                    >
                        <TableHeaderColumn dataField="submitted" isKey={true} dataAlign="center" dataSort={true}>Submitted</TableHeaderColumn>
                        <TableHeaderColumn dataField="status"    dataSort={true} >Status</TableHeaderColumn>
                        <TableHeaderColumn dataField="employee"  dataSort={true}>Employee</TableHeaderColumn>
                        <TableHeaderColumn dataField="customer"  dataSort={true}>Customer</TableHeaderColumn>
                        <TableHeaderColumn dataField="issue"     dataSort={false}>Issue</TableHeaderColumn>
                    </BootstrapTable>


            </div>
        </div>


    </div>
  );
}


displayCharts.propTypes = {};

displayCharts.contextTypes = {
  setTitle: PropTypes.func.isRequired,
  issues: PropTypes.array,
};
export default withStyles(s)(displayCharts);

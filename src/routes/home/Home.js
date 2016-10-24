import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  MenuItem,
  DropdownButton,
  Panel, PageHeader, ListGroup, ListGroupItem, Button,
} from 'react-bootstrap';
import s from './Home.css';
import StatWidget from '../../components/Widget';
import Donut from '../../components/Donut';
import _ from 'underscore-node';
import {
  Tooltip,
  XAxis, YAxis, Area,
  CartesianGrid, AreaChart, Bar, BarChart,
  ResponsiveContainer,LineChart, Line, PieChart, Pie,Sector, Cell } from '../../vendor/recharts';

const COLORS = ['#0088FE', '#00C49F'];
const RADIAN = Math.PI / 180;

function plotData(customers) {
  const data = [];
  for (let i = 0; i < customers.length; i++) {
    data.push({ name: customers[i].weekNo, customers: customers[i].customers });
  }
  return data;
};

function Home(props, context) {
  let submittedIssues = _.countBy(props.issues,function(node){
      // const formatter = new Intl.DateTimeFormat("en", { month: "long" });
      // console.log(formatter.format(new Date(node.submission_timestamp)));
      // return formatter.format(new Date(node.submission_timestamp));
      return (new Date(node.submission_timestamp).getMonth()) + 1;
  });

  let sortedDesc = _.sortBy(props.issues,function(node){
      return - (new Date(node.submission_timestamp).getMonth());
  });

  let sortedAsc = _.sortBy(props.issues,function(node){
      return (new Date(node.submission_timestamp).getMonth());
  });
  let submittedIssuesByMonth = [
        {name: "Jan", value: submittedIssues[1]},
        {name: "Feb", value: submittedIssues[2]},
        {name: "Mar", value: submittedIssues[3]},
        {name: "Apr", value: submittedIssues[4]},
        {name: "May", value: submittedIssues[5]},
        {name: "Jun", value: submittedIssues[6]},
        {name: "Jul", value: submittedIssues[7]}
  ];
  let statusIssues = _.countBy(props.issues,'status');
  let statuses = [{name: "Open Issues", value: statusIssues.open}, {name:"Closed Issues", value: statusIssues.closed}]
  let customersData = plotData(props.customers);


  return  (
    <div>
        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Dashboard</PageHeader>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6">
            <StatWidget
              style="panel-primary"
              icon="fa fa-tasks fa-5x"
              headerText="Geospatial View"
              footerText="View Details"
              linkTo="/geospatialview"
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <StatWidget
              style="panel-green"
              icon="fa fa-tasks fa-5x"
              headerText="Key Metrics View"
              footerText="View Details"
              linkTo="/keymetricsview"
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <StatWidget
              style="panel-yellow"
              icon="fa fa-tasks fa-5x"
              headerText="Data View"
              footerText="View Details"
              linkTo="/dataview"
            />
          </div>
        </div>
    </div>
  );
}

Home.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  customers: PropTypes.arrayOf(PropTypes.shape({
    weekNo: PropTypes.number.isRequired,
    customers: PropTypes.number.isRequired,
  })).isRequired,
  issues: PropTypes.arrayOf(PropTypes.shape({
    submission_timestamp:PropTypes.string.isRequired,
    closed_timestamp: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    customer_name: PropTypes.string.isRequired,
    customer_email: PropTypes.string.isRequired,
    employee_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};
Home.contextTypes = {
};

export default withStyles(s)(Home);

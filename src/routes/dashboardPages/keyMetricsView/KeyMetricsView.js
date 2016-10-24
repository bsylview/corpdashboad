import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Donut from '../../../components/Donut';
import _ from 'underscore-node';

import {
  Tooltip,
  XAxis, YAxis, Area,
  CartesianGrid, AreaChart, Bar, BarChart,
  ResponsiveContainer,LineChart, Line, PieChart, Pie,Sector, Cell } from '../../../vendor/recharts';

const title = 'Key Metrics View';
const COLORS = ['#0088FE', '#00C49F'];
const RADIAN = Math.PI / 180;

function plotData(customers) {
  const data = [];
  for (let i = 0; i < customers.length; i++) {
    data.push({ name: customers[i].weekNo, customers: customers[i].customers });
  }
  return data;
};

function displayKeyMetricsView(props, context) {
  context.setTitle(title);
  let issues = context.issues;
  let customers = context.customers;
  let submittedIssues = _.countBy(issues,function(node){
      // const formatter = new Intl.DateTimeFormat("en", { month: "long" });
      // console.log(formatter.format(new Date(node.submission_timestamp)));
      // return formatter.format(new Date(node.submission_timestamp));
      return (new Date(node.submission_timestamp).getMonth()) + 1;
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
  let statusIssues = _.countBy(issues,'status');
  let statuses = [{name: "Open Issues", value: statusIssues.open}, {name:"Closed Issues", value: statusIssues.closed}]
  let customersData = plotData(customers);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader>Key Metrics View</PageHeader>
        </div>
      </div>

      <div className="row">
              <div className="col-lg-12">
                    <Panel header={<span>  <i className="fa fa-line-chart fa-fw" /> Paying customers/week</span>} >
                      <div>
                        <ResponsiveContainer width="100%" aspect={2}>
                          <LineChart data={customers} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="weekNo"/>
                            <YAxis  />
                            <Tooltip />
                            <Line type="monotone" dataKey="customers" stroke="#82ca9d" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </Panel>
              </div>
        </div>

        <div className="row">
            <div className="col-lg-6">
                  <Panel
                    header={<span>
                      <i className="fa fa-bar-chart-o fa-fw" /> Summitted issues - last 7 months
                      </span>}
                  >
                    <div>
                      <ResponsiveContainer width="100%" aspect={2}>
                        <BarChart data={submittedIssuesByMonth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
                          <CartesianGrid stroke="#ccc" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />

                          <Bar type="monotone" dataKey="value" fill="#ffc658" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel>
            </div>
            <div className="col-lg-6">
              <Panel header={<span>  <i className="fa fa-pie-chart fa-fw" />  <b>{statusIssues.open}</b> Open Issues</span>} >
                <div>
                  <ResponsiveContainer width="100%" aspect={2}>
                      <Donut data={statuses} color="#8884d8" innerRadius="60" outerRadius="80" />
                  </ResponsiveContainer>
                </div>
              </Panel>
            </div>

      </div>
    </div>
  );
}

displayKeyMetricsView.propTypes = {};

displayKeyMetricsView.contextTypes = {
    setTitle: PropTypes.func.isRequired,
    issues: PropTypes.array,
    customers: PropTypes.array,
};

export default displayKeyMetricsView;

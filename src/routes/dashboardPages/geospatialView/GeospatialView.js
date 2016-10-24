import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Donut from '../../../components/Donut';

import {
  LineChart, Tooltip,
  Line, XAxis, YAxis, Area,
  CartesianGrid, AreaChart, Bar, BarChart,
  ResponsiveContainer } from '../../../vendor/recharts';

const title = 'Geospatial View';

function displayGeoView(props, context) {
  context.setTitle(title);
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader>Geospatial View</PageHeader>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
              <Panel
                header={<span>
                  <i className="fa fa-bar-chart-o fa-fw" /> Employees by company locations
                  </span>}
              >
                <div>
                  <ResponsiveContainer width="100%" aspect={2}>
                    <BarChart data={context.employees} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
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

      </div>
    </div>
  );
}

displayGeoView.propTypes = {};

displayGeoView.contextTypes = {
    setTitle: PropTypes.func.isRequired,
    employees: PropTypes.array,
};

export default displayGeoView;

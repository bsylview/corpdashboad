
import React from 'react';
import KeyMetricsView from './KeyMetricsView';
import {csv, json, request, csvParse} from 'd3-request';
import moment from 'moment';

export default {

  path: '/keymetricsview',

  async action() {
    return <KeyMetricsView/>;
  },

};

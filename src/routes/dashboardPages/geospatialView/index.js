
import React from 'react';
import GeospatialView from './GeospatialView';
import {csv, json, request, csvParse} from 'd3-request';

export default {

  path: '/geospatialview',

  async action() {
      return <GeospatialView />;
  },

};

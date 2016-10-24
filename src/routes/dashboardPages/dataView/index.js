import React from "react";
import DataView from "./DataView";
import {csv, json, request, csvParse} from 'd3-request';
import moment from 'moment';

export default {

  path: '/dataview',

  async action() {
    return <DataView />;
  },

};

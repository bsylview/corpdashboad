/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLList as List } from 'graphql';
import fetch from '../../core/fetch';
import EmployeesType from '../types/EmployeesType';
import join from "mocha/lib/utils";

let items = [];
let lastFetchTask;
const EMPLOYEES = '../../content/employees.json';
const employees = {
  type: new List(EmployeesType),
  resolve() {
    fetch(EMPLOYEES)
        .then(response => response.json())
        .then(data => {
          if (data.responseStatus === 200) {
            items = data.responseData.feed.entries;
          }
          return items;
        })
        .finally(() => {
          return null;
        });
      if (items.length) {
        return items;
      }
  },
};

export default employees;

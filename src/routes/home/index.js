/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import {csv, json, request, csvParse} from 'd3-request';
import moment from 'moment';

// import fetch from '../../core/fetch';
export default {

  path: '/',

  async action() {

    let employeesByLocation = new Promise(function(resolve, reject) {
            request('/data/employees.json')
            .mimeType("application/json")
            .response(function(xhr) {
                  employeesByLocation = xhr.responseText;
                  resolve(employeesByLocation);
              })
            .get(function(error, data) {
                if (error){
                  console.log(error);
                  throw error;
                }
                employeesByLocation = JSON.stringify(data);
                resolve(employeesByLocation);
            });
      });

      let issues = new Promise(function(resolve, reject) {
              // request('/data/issues.json')
              // .mimeType("application/json")
              // .response(function(xhr) {
              //       issues = xhr.responseText;
              //       resolve(issues);
              //   })
              // .get(function(error, data) {
              //     if (error){
              //       console.log(error);
              //       throw error;
              //     }
              //     issues = data;
              //     resolve(issues);
              // });

              csv('/data/issues.csv',
                  function row(d) {
                      return {
                        submission_timestamp: moment(d.submission_timestamp).format('YYYY-MM-DD'),
                        closed_timestamp: moment(d.closed_timestamp).format('YYYY-MM-DD'),
                        status: d.status,
                        customer_name: d.customer_name,
                        customer_email: d.customer_email,
                        employee_name: d.employee_name,
                        description: d.description
                      };
                    },
                  function(error, data) {
                        if (error){
                          console.log(error);
                          throw error;
                        }
                        resolve(data);
                  });

        });


    let customers =  new Promise(function(resolve, reject) {

        csv('/data/customers.csv',
            function row(d) {
                return {
                  weekNo: parseInt(d.weekNo),
                  customers: parseInt(d.customers)
                };
              },
            function(error, data) {
                  if (error){
                    console.log(error);
                    throw error;
                  }
                  resolve(JSON.stringify(data));
            });
      });


    let employeesJson  = await employeesByLocation;
    let issuesJson = await issues;
    let customersJson = await customers;

    console.log(issuesJson);

    return <Home employees={JSON.parse(employeesJson)} customers={JSON.parse(customersJson)}  issues={issuesJson}/>;

  },

};

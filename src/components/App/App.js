/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component, PropTypes} from "react";
import emptyFunction from "fbjs/lib/emptyFunction";
import s from "./App.css";
import {csv, request} from 'd3-request';
import moment from 'moment';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
    issues: PropTypes.array,
    employees: PropTypes.array,
    customers: PropTypes.array,
  };

  static employeesArray = [];
  static issuesArray = [];
  static customersArray = [];

  getChildContext() {
    console.log("in component will mount!");
    const context = this.props.context;
    return {
      issues: this.getIssues(),
      employees: this.getEmployees(),
      customers:this.getCustomers(),
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    };
  };

  loadIssuesFromServer(){
    return new Promise(function(resolve, reject) {
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
        }).then(function(response){
         let issuesJson  = response;
         this.issuesArray = issuesJson;
         this.setState({issues:issuesJson});
         return this.issuesArray;
     }.bind(this)).catch(function(error){
       console.log(error);
     });
  };

  loadCustomersFromServer(){
    return new Promise(function(resolve, reject) {
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
      }).then(function(response){
         let customersJson  = response;
         this.customersArray = JSON.parse(customersJson);
         this.setState({customers:this.customersArray});
         return this.customersArray;
     }.bind(this)).catch(function(error){
       console.log(error);
     });
  }

  loadEmployeesFromServer(){
      return new Promise(function(resolve, reject) {
             request('/data/employees.json')
             .mimeType("application/json")
             .response(function(xhr) {
                   let employeesByLocation = xhr.responseText;
                   resolve(employeesByLocation);
               })
             .get(function(error, data) {
                 if (error){
                   console.log(error);
                   throw error;
                 }
                 let employeesByLocation = JSON.stringify(data);
                 resolve(employeesByLocation);
             });
       }).then(function(response){
           let employeesJson  = response;
           this.employeesArray = JSON.parse(employeesJson);
           console.log(this.employeesArray);
           this.setState({employees:JSON.parse(employeesJson)});
           return this.employeesArray;
       }.bind(this)).catch(function(error){
         console.log(error);
       });
  };

  getEmployees(){
    return this.employeesArray || [];
  };

  getCustomers(){
    return this.customersArray || [];
  };

  getIssues(){
    return this.issuesArray || [];
  };

  constructor(props) {
     super(props);
     this.loadEmployeesFromServer();
     setInterval(this.loadEmployeesFromServer.bind(this), 32000);
     this.loadIssuesFromServer();
     setInterval(this.loadIssuesFromServer.bind(this), 40000);
     this.loadCustomersFromServer();
     setInterval(this.loadCustomersFromServer.bind(this), 35000);
  };

  componentWillMount() {
    const {insertCss} = this.props.context;
    this.removeCss = insertCss(s);
  };

  componentWillUnmount() {
    this.removeCss();
  };

  render() {
    // console.log('\n********\n', this.props, '\n********\n');
    return this.props.children;
  };

}

export default App;

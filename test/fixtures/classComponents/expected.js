import React from 'react';
import { Component } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export class ClassComponentNamedExport extends React.Component {
  render() {
    return /*#__PURE__*/_jsx("div", {});
  }
}
ClassComponentNamedExport.displayName = "fixtures/classComponents/input/ClassComponentNamedExport";
export default class ClassComponentDefaultExport extends React.Component {
  render() {
    return /*#__PURE__*/_jsx("div", {});
  }
}
ClassComponentDefaultExport.displayName = "fixtures/classComponents/input/ClassComponentDefaultExport";
export class ClassComponentNamedExportExtendedComponent extends Component {
  render() {
    return /*#__PURE__*/_jsx("div", {});
  }
}
ClassComponentNamedExportExtendedComponent.displayName = "fixtures/classComponents/input/ClassComponentNamedExportExtendedComponent";
class ClassComponentWithStaticPropComponent extends Component {
  static get = () => {
    return /*#__PURE__*/_jsx("div", {});
  };
  render() {
    return /*#__PURE__*/_jsx("div", {});
  }
}
ClassComponentWithStaticPropComponent.displayName = "fixtures/classComponents/input/ClassComponentWithStaticPropComponent";
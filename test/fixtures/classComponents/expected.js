import React from 'react';
import { Component } from 'react';

export class ClassComponentNamedExport extends React.Component {
    render() {
        return React.createElement('div', null);
    }
}

ClassComponentNamedExport.displayName = 'ClassComponentNamedExport';
export default class ClassComponentDefaultExport extends React.Component {
    render() {
        return React.createElement('div', null);
    }
}

ClassComponentDefaultExport.displayName = 'ClassComponentDefaultExport';
export class ClassComponentNamedExportExtendedComponent extends Component {
    render() {
        return React.createElement('div', null);
    }
}

ClassComponentNamedExportExtendedComponent.displayName = 'ClassComponentNamedExportExtendedComponent';
class ClassComponentWithStaticPropComponent extends Component {
    render() {
        return React.createElement('div', null);
    }
}
ClassComponentWithStaticPropComponent.displayName = 'ClassComponentWithStaticPropComponent';

ClassComponentWithStaticPropComponent.get = () => {
    return React.createElement('div', null);
};

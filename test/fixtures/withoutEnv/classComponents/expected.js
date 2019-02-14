import React from 'react';
import { Component } from 'react';

export class ClassComponentNamedExport extends React.Component {
    render() {
        return React.createElement('div', null);
    }
}

ClassComponentNamedExport.displayName = 'withoutEnv/classComponents/input/ClassComponentNamedExport';
export default class ClassComponentDefaultExport extends React.Component {
    render() {
        return React.createElement('div', null);
    }
}

ClassComponentDefaultExport.displayName = 'withoutEnv/classComponents/input/ClassComponentDefaultExport';
export class ClassComponentNamedExportExtendedComponent extends Component {
    render() {
        return React.createElement('div', null);
    }
}

ClassComponentNamedExportExtendedComponent.displayName = 'withoutEnv/classComponents/input/ClassComponentNamedExportExtendedComponent';
class ClassComponentWithStaticPropComponent extends Component {
    render() {
        return React.createElement('div', null);
    }
}
ClassComponentWithStaticPropComponent.displayName = 'withoutEnv/classComponents/input/ClassComponentWithStaticPropComponent';

ClassComponentWithStaticPropComponent.get = () => {
    return React.createElement('div', null);
};

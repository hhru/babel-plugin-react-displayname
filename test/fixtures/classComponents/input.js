import React from 'react';
import { Component } from 'react';

export class ClassComponentNamedExport extends React.Component {
    render() {
        return <div />;
    }
}

export default class ClassComponentDefaultExport extends React.Component {
    render() {
        return <div />;
    }
}

export class ClassComponentNamedExportExtendedComponent extends Component {
    render() {
        return <div />;
    }
}

class ClassComponentWithStaticPropComponent extends Component {
    static get = () => {
        return <div />;
    };
    render() {
        return <div />;
    }
}

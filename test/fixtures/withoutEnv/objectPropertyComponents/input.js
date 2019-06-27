import React from 'react';

const ObjectPropertyComponent = {
    custom: {
        component: function Fetch() {
            return <p></p>;
        },
    },
};

const ObjectPropertyComponentArrowFunction = {
    custom: {
        component: () => {
            return <p></p>;
        },
    },
};

const ObjectPropertyComponent1 = {
    custom: function Fetch() {
        return <p></p>;
    },
};

const ObjectPropertyComponentArrowFunction2 = {
    custom: () => {
        return <p></p>;
    },
};

function FunctionComponent() {
    const ObjectPropertyComponent = {
        invariant: (content) => <div>{content}</div>,
    };

    return <ObjectPropertyComponent.invariant content="text content" />;
}

class ClassComponent extends React.Component {
    ObjectPropertyComponent2 = {
        invariant: (content) => <div>{content}</div>,
    };

    render() {
        const ObjectPropertyComponent2 = this.ObjectPropertyComponent2;
        return <ObjectPropertyComponent2.invariant content="text content" />;
    }
}

class ClassComponent1 extends React.Component {
    static ObjectPropertyComponent1 = {
        invariant: (content) => <div>{content}</div>,
    };
    
    render() {
        return <ClassComponent1.ObjectPropertyComponent1.invariant content="text content" />;
    }
}

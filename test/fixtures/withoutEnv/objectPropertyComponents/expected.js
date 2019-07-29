function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
const ObjectPropertyComponent = {
  custom: {
    component: function Fetch() {
      return React.createElement("p", null);
    }
  }
};
ObjectPropertyComponent.custom.component.displayName = "withoutEnv/objectPropertyComponents/input/ObjectPropertyComponent.custom.component";
const ObjectPropertyComponentArrowFunction = {
  custom: {
    component: () => {
      return React.createElement("p", null);
    }
  }
};
ObjectPropertyComponentArrowFunction.custom.component.displayName = "withoutEnv/objectPropertyComponents/input/ObjectPropertyComponentArrowFunction.custom.component";
const ObjectPropertyComponent1 = {
  custom: function Fetch() {
    return React.createElement("p", null);
  }
};
ObjectPropertyComponent1.custom.displayName = "withoutEnv/objectPropertyComponents/input/ObjectPropertyComponent1.custom";
const ObjectPropertyComponentArrowFunction2 = {
  custom: () => {
    return React.createElement("p", null);
  }
};
ObjectPropertyComponentArrowFunction2.custom.displayName = "withoutEnv/objectPropertyComponents/input/ObjectPropertyComponentArrowFunction2.custom";

function FunctionComponent() {
  const ObjectPropertyComponent = {
    invariant: content => React.createElement("div", null, content)
  };
  ObjectPropertyComponent.invariant.displayName = "withoutEnv/objectPropertyComponents/input/ObjectPropertyComponent.invariant";
  return React.createElement(ObjectPropertyComponent.invariant, {
    content: "text content"
  });
}

FunctionComponent.displayName = "withoutEnv/objectPropertyComponents/input/FunctionComponent";

class ClassComponent extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "ObjectPropertyComponent2", {
      invariant: content => React.createElement("div", null, content)
    });
  }

  render() {
    const ObjectPropertyComponent2 = this.ObjectPropertyComponent2;
    return React.createElement(ObjectPropertyComponent2.invariant, {
      content: "text content"
    });
  }

}

ClassComponent.displayName = "withoutEnv/objectPropertyComponents/input/ClassComponent";

class ClassComponent1 extends React.Component {
  render() {
    return React.createElement(ClassComponent1.ObjectPropertyComponent1.invariant, {
      content: "text content"
    });
  }

}

ClassComponent1.displayName = "withoutEnv/objectPropertyComponents/input/ClassComponent1";

_defineProperty(ClassComponent1, "ObjectPropertyComponent1", {
  invariant: content => React.createElement("div", null, content)
});
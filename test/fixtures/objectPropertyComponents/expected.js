import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const ObjectPropertyComponent = {
  custom: {
    component: function Fetch() {
      return /*#__PURE__*/_jsx("p", {});
    }
  }
};
ObjectPropertyComponent.custom.component.displayName = "fixtures/objectPropertyComponents/input/ObjectPropertyComponent.custom.component";
const ObjectPropertyComponentArrowFunction = {
  custom: {
    component: () => {
      return /*#__PURE__*/_jsx("p", {});
    }
  }
};
ObjectPropertyComponentArrowFunction.custom.component.displayName = "fixtures/objectPropertyComponents/input/ObjectPropertyComponentArrowFunction.custom.component";
const ObjectPropertyComponent1 = {
  custom: function Fetch() {
    return /*#__PURE__*/_jsx("p", {});
  }
};
ObjectPropertyComponent1.custom.displayName = "fixtures/objectPropertyComponents/input/ObjectPropertyComponent1.custom";
const ObjectPropertyComponentArrowFunction2 = {
  custom: () => {
    return /*#__PURE__*/_jsx("p", {});
  }
};
ObjectPropertyComponentArrowFunction2.custom.displayName = "fixtures/objectPropertyComponents/input/ObjectPropertyComponentArrowFunction2.custom";
function FunctionComponent() {
  const ObjectPropertyComponent = {
    invariant: content => /*#__PURE__*/_jsx("div", {
      children: content
    })
  };
  ObjectPropertyComponent.invariant.displayName = "fixtures/objectPropertyComponents/input/ObjectPropertyComponent.invariant";
  return /*#__PURE__*/_jsx(ObjectPropertyComponent.invariant, {
    content: "text content"
  });
}
FunctionComponent.displayName = "fixtures/objectPropertyComponents/input/FunctionComponent";
class ClassComponent extends React.Component {
  ObjectPropertyComponent2 = {
    invariant: content => /*#__PURE__*/_jsx("div", {
      children: content
    })
  };
  render() {
    const ObjectPropertyComponent2 = this.ObjectPropertyComponent2;
    return /*#__PURE__*/_jsx(ObjectPropertyComponent2.invariant, {
      content: "text content"
    });
  }
}
ClassComponent.displayName = "fixtures/objectPropertyComponents/input/ClassComponent";
class ClassComponent1 extends React.Component {
  static ObjectPropertyComponent1 = {
    invariant: content => /*#__PURE__*/_jsx("div", {
      children: content
    })
  };
  render() {
    return /*#__PURE__*/_jsx(ClassComponent1.ObjectPropertyComponent1.invariant, {
      content: "text content"
    });
  }
}
ClassComponent1.displayName = "fixtures/objectPropertyComponents/input/ClassComponent1";
const ObjectPropertyComponentElement = {
  vasya: /*#__PURE__*/_jsx(Vasiliy, {}),
  petya: /*#__PURE__*/_jsx(Petiliy, {
    children: "da"
  })
};
const FakeObjectProperty = ({
  someCondition
}) => {
  const randomArray = [];
  if (someCondition) {
    randomArray.push({
      Component: /*#__PURE__*/_jsx("div", {
        children: "fake"
      })
    });
  }
  return randomArray[0];
};
FakeObjectProperty.displayName = "fixtures/objectPropertyComponents/input/FakeObjectProperty";
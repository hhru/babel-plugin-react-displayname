import { jsx as _jsx } from "react/jsx-runtime";
const FunctionComponentVariableDeclarationWithList = list => {
  const content = list.map(({
    url,
    id,
    text
  }) => /*#__PURE__*/_jsx("div", {
    className: "item",
    children: /*#__PURE__*/_jsx("a", {
      href: url,
      target: "_blank",
      children: text
    })
  }, id));
  return content;
};
FunctionComponentVariableDeclarationWithList.displayName = "fixtures/variableDeclarationInComponent/input/FunctionComponentVariableDeclarationWithList";
const FunctionComponentVariableDeclarationWithList1 = list => {
  const content = /*#__PURE__*/_jsx("div", {
    children: list.map(({
      url,
      id,
      text
    }) => /*#__PURE__*/_jsx("div", {
      className: "item",
      children: /*#__PURE__*/_jsx("a", {
        href: url,
        target: "_blank",
        children: text
      })
    }, id))
  });
  return /*#__PURE__*/_jsx("div", {
    children: content
  });
};
FunctionComponentVariableDeclarationWithList1.displayName = "fixtures/variableDeclarationInComponent/input/FunctionComponentVariableDeclarationWithList1";
class ClassComponent extends React.Component {
  render() {
    const content = /*#__PURE__*/_jsx("div", {
      children: this.props.list.map(({
        url,
        id,
        text
      }) => /*#__PURE__*/_jsx("div", {
        className: "item",
        children: /*#__PURE__*/_jsx("a", {
          href: url,
          target: "_blank",
          children: text
        })
      }, id))
    });
    return /*#__PURE__*/_jsx("div", {
      children: content
    });
  }
}
ClassComponent.displayName = "fixtures/variableDeclarationInComponent/input/ClassComponent";
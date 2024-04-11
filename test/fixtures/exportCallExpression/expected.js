import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
const _generatedConstant = ({
  params
}) => /*#__PURE__*/_jsx(_Fragment, {
  children: params
});
_generatedConstant.displayName = "fixtures/exportCallExpression/input/Some";
export const Some = translation(otherParam, _generatedConstant);
const _generatedConstant2 = function vasiliy(params) {
  return /*#__PURE__*/_jsx(_Fragment, {
    children: params
  });
};
_generatedConstant2.displayName = "fixtures/exportCallExpression/input/Some2";
export const Some2 = translation(_generatedConstant2, otherParam);
const _generatedConstant3 = function (params) {
  return /*#__PURE__*/_jsx(_Fragment, {
    children: params
  });
};
_generatedConstant3.displayName = "fixtures/exportCallExpression/input/Some3";
export const Some3 = translation(_generatedConstant3);
export const Component1 = ({
  params
}) => {
  const render = useMemo(() => {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: params
    });
  }, []);
  return render();
};
Component1.displayName = "fixtures/exportCallExpression/input/Component1";
export function Component2({
  params
}) {
  const render = useMemo(() => {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: params
    });
  }, []);
  return render();
}
Component2.displayName = "fixtures/exportCallExpression/input/Component2";
const _generatedConstant4 = /*#__PURE__*/_jsx(Icon, {
  initial: IconColor.White,
  view: IconView.Arrow,
  scale: IconScale.Small,
  kind: IconKind.Up
});
_generatedConstant4.displayName = "fixtures/exportCallExpression/input/ICON_ARROW_UP";
const ICON_ARROW_UP = renderToString(_generatedConstant4);
export default ICON_ARROW_UP;
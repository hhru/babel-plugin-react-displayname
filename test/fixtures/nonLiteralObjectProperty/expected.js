import { jsx as _jsx } from "react/jsx-runtime";
const Variants = {
  One: 'oneVariant',
  Two: 'twoVariant'
};
const ComponentsObject = {
  [Variants.One]: /*#__PURE__*/_jsx("div", {
    children: "one"
  }),
  [Variants.Two]: /*#__PURE__*/_jsx("div", {
    children: "two"
  })
};
ComponentsObject[Variants.Two].displayName = "fixtures/nonLiteralObjectProperty/input/ComponentsObject[Variants.Two]";
ComponentsObject[Variants.One].displayName = "fixtures/nonLiteralObjectProperty/input/ComponentsObject[Variants.One]";
const ComponentWithVariants = ({
  variant
}) => {
  const Components = {
    [Variants.One]: /*#__PURE__*/_jsx("div", {
      children: "one"
    }),
    [Variants.Two]: /*#__PURE__*/_jsx("div", {
      children: "two"
    })
  };
  Components[Variants.Two].displayName = "fixtures/nonLiteralObjectProperty/input/Components[Variants.Two]";
  Components[Variants.One].displayName = "fixtures/nonLiteralObjectProperty/input/Components[Variants.One]";
  const Component = Components[variant];
  return /*#__PURE__*/_jsx(Component, {});
};
ComponentWithVariants.displayName = "fixtures/nonLiteralObjectProperty/input/ComponentWithVariants";
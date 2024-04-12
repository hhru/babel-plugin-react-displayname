import Strings from 'Utils/Strings';
import Currency from 'lux/components/Currency';
import { CurrencyType } from 'lux/models/currencies.types';
import { NON_BREAKING_SPACE } from 'lux/modules/symbols';
import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const ReturnRenderFunction = ({
  amount,
  currency,
  render = (amount, currencyNode) => /*#__PURE__*/_jsxs(_Fragment, {
    children: [amount, NON_BREAKING_SPACE, currencyNode]
  })
}) => {
  const currencyNode = /*#__PURE__*/_jsx(Currency, {
    value: currency
  });
  return render(amount, currencyNode);
};
ReturnRenderFunction.displayName = "fixtures/returnRenderFunction/input/ReturnRenderFunction";
export default ReturnRenderFunction;
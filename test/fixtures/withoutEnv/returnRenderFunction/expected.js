import Strings from 'Utils/Strings';
import Currency from 'lux/components/Currency';
import { CurrencyType } from 'lux/models/currencies.types';
import { NON_BREAKING_SPACE } from 'lux/modules/symbols';

const ReturnRenderFunction = ({
  amount,
  currency,
  render = (amount, currencyNode) => React.createElement(React.Fragment, null, amount, NON_BREAKING_SPACE, currencyNode)
}) => {
  const currencyNode = React.createElement(Currency, {
    value: currency
  });
  return render(amount, currencyNode);
};

ReturnRenderFunction.displayName = "withoutEnv/returnRenderFunction/input/ReturnRenderFunction";
export default ReturnRenderFunction;

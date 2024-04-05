import Strings from 'Utils/Strings';
import Currency from 'lux/components/Currency';
import { CurrencyType } from 'lux/models/currencies.types';
import { NON_BREAKING_SPACE } from 'lux/modules/symbols';

const ReturnRenderFunction = ({
   amount,
   currency,
   render = (amount, currencyNode) => (
       <>
           {amount}
           {NON_BREAKING_SPACE}
           {currencyNode}
       </>
   ),
}) => {
    const currencyNode = <Currency value={currency} />;
    return render(amount, currencyNode);
};

export default ReturnRenderFunction;

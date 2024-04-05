"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Strings = _interopRequireDefault(require("Utils/Strings"));

var _Currency = _interopRequireDefault(require("lux/components/Currency"));

var _currencies = require("lux/models/currencies.types");

var _symbols = require("lux/modules/symbols");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ReturnRenderFunction = function ReturnRenderFunction(_ref) {
  var amount = _ref.amount,
      currency = _ref.currency,
      _ref$render = _ref.render,
      render = _ref$render === void 0 ? function (amount, currencyNode) {
    return React.createElement(React.Fragment, null, amount, _symbols.NON_BREAKING_SPACE, currencyNode);
  } : _ref$render;
  var currencyNode = React.createElement(_Currency["default"], {
    value: currency
  });
  return render(amount, currencyNode);
};

ReturnRenderFunction.displayName = "env/returnRenderFunction/input/ReturnRenderFunction";
var _default = ReturnRenderFunction;
exports["default"] = _default;

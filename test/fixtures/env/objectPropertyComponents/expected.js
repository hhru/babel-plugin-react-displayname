"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectPropertyComponent = {
    custom: {
        component: function Fetch() {
            return _react2.default.createElement("p", null);
        }
    }
};

ObjectPropertyComponent.custom.component.displayName = "env/objectPropertyComponents/input/ObjectPropertyComponent.custom.component";
var ObjectPropertyComponentArrowFunction = {
    custom: {
        component: function component() {
            return _react2.default.createElement("p", null);
        }
    }
};

ObjectPropertyComponentArrowFunction.custom.component.displayName = "env/objectPropertyComponents/input/ObjectPropertyComponentArrowFunction.custom.component";
var ObjectPropertyComponent1 = {
    custom: function Fetch() {
        return _react2.default.createElement("p", null);
    }
};

ObjectPropertyComponent1.custom.displayName = "env/objectPropertyComponents/input/ObjectPropertyComponent1.custom";
var ObjectPropertyComponentArrowFunction2 = {
    custom: function custom() {
        return _react2.default.createElement("p", null);
    }
};

ObjectPropertyComponentArrowFunction2.custom.displayName = "env/objectPropertyComponents/input/ObjectPropertyComponentArrowFunction2.custom";
function FunctionComponent() {
    var ObjectPropertyComponent = {
        invariant: function invariant(content) {
            return _react2.default.createElement(
                "div",
                null,
                content
            );
        }
    };

    ObjectPropertyComponent.invariant.displayName = "env/objectPropertyComponents/input/ObjectPropertyComponent.invariant";
    return _react2.default.createElement(ObjectPropertyComponent.invariant, { content: "text content" });
}

FunctionComponent.displayName = "env/objectPropertyComponents/input/FunctionComponent";

var ClassComponent = function (_React$Component) {
    _inherits(ClassComponent, _React$Component);

    function ClassComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ClassComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ClassComponent.__proto__ || Object.getPrototypeOf(ClassComponent)).call.apply(_ref, [this].concat(args))), _this), _this.ObjectPropertyComponent2 = {
            invariant: function invariant(content) {
                return _react2.default.createElement(
                    "div",
                    null,
                    content
                );
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ClassComponent, [{
        key: "render",
        value: function render() {
            var ObjectPropertyComponent2 = this.ObjectPropertyComponent2;
            return _react2.default.createElement(ObjectPropertyComponent2.invariant, { content: "text content" });
        }
    }]);

    return ClassComponent;
}(_react2.default.Component);

ClassComponent.displayName = "env/objectPropertyComponents/input/ClassComponent";

var ClassComponent1 = function (_React$Component2) {
    _inherits(ClassComponent1, _React$Component2);

    function ClassComponent1() {
        _classCallCheck(this, ClassComponent1);

        return _possibleConstructorReturn(this, (ClassComponent1.__proto__ || Object.getPrototypeOf(ClassComponent1)).apply(this, arguments));
    }

    _createClass(ClassComponent1, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(ClassComponent1.ObjectPropertyComponent1.invariant, { content: "text content" });
        }
    }]);

    return ClassComponent1;
}(_react2.default.Component);

ClassComponent1.displayName = "env/objectPropertyComponents/input/ClassComponent1";
ClassComponent1.ObjectPropertyComponent1 = {
    invariant: function invariant(content) {
        return _react2.default.createElement(
            "div",
            null,
            content
        );
    }
};
ClassComponent1.ObjectPropertyComponent1.invariant.displayName = "env/objectPropertyComponents/input/ClassComponent1.ObjectPropertyComponent1.invariant";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClassComponentNamedExportExtendedComponent = exports.ClassComponentNamedExport = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassComponentNamedExport = exports.ClassComponentNamedExport = function (_React$Component) {
    _inherits(ClassComponentNamedExport, _React$Component);

    function ClassComponentNamedExport() {
        _classCallCheck(this, ClassComponentNamedExport);

        return _possibleConstructorReturn(this, (ClassComponentNamedExport.__proto__ || Object.getPrototypeOf(ClassComponentNamedExport)).apply(this, arguments));
    }

    _createClass(ClassComponentNamedExport, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);

    return ClassComponentNamedExport;
}(_react2.default.Component);

ClassComponentNamedExport.displayName = 'env/classComponents/input/ClassComponentNamedExport';

var ClassComponentDefaultExport = function (_React$Component2) {
    _inherits(ClassComponentDefaultExport, _React$Component2);

    function ClassComponentDefaultExport() {
        _classCallCheck(this, ClassComponentDefaultExport);

        return _possibleConstructorReturn(this, (ClassComponentDefaultExport.__proto__ || Object.getPrototypeOf(ClassComponentDefaultExport)).apply(this, arguments));
    }

    _createClass(ClassComponentDefaultExport, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);

    return ClassComponentDefaultExport;
}(_react2.default.Component);

ClassComponentDefaultExport.displayName = 'env/classComponents/input/ClassComponentDefaultExport';
exports.default = ClassComponentDefaultExport;

var ClassComponentNamedExportExtendedComponent = exports.ClassComponentNamedExportExtendedComponent = function (_Component) {
    _inherits(ClassComponentNamedExportExtendedComponent, _Component);

    function ClassComponentNamedExportExtendedComponent() {
        _classCallCheck(this, ClassComponentNamedExportExtendedComponent);

        return _possibleConstructorReturn(this, (ClassComponentNamedExportExtendedComponent.__proto__ || Object.getPrototypeOf(ClassComponentNamedExportExtendedComponent)).apply(this, arguments));
    }

    _createClass(ClassComponentNamedExportExtendedComponent, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);

    return ClassComponentNamedExportExtendedComponent;
}(_react.Component);

ClassComponentNamedExportExtendedComponent.displayName = 'env/classComponents/input/ClassComponentNamedExportExtendedComponent';

var ClassComponentWithStaticPropComponent = function (_Component2) {
    _inherits(ClassComponentWithStaticPropComponent, _Component2);

    function ClassComponentWithStaticPropComponent() {
        _classCallCheck(this, ClassComponentWithStaticPropComponent);

        return _possibleConstructorReturn(this, (ClassComponentWithStaticPropComponent.__proto__ || Object.getPrototypeOf(ClassComponentWithStaticPropComponent)).apply(this, arguments));
    }

    _createClass(ClassComponentWithStaticPropComponent, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);

    return ClassComponentWithStaticPropComponent;
}(_react.Component);

ClassComponentWithStaticPropComponent.displayName = 'env/classComponents/input/ClassComponentWithStaticPropComponent';

ClassComponentWithStaticPropComponent.get = function () {
    return _react2.default.createElement('div', null);
};

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FunctionComponentVariableDeclarationWithList = function FunctionComponentVariableDeclarationWithList(list) {
  var content = list.map(function (_ref) {
    var url = _ref.url,
        id = _ref.id,
        text = _ref.text;
    return React.createElement("div", {
      className: "item",
      key: id
    }, React.createElement("a", {
      href: url,
      target: "_blank"
    }, text));
  });
  return content;
};

FunctionComponentVariableDeclarationWithList.displayName = "env/variableDeclarationInComponent/input/FunctionComponentVariableDeclarationWithList";

var FunctionComponentVariableDeclarationWithList1 = function FunctionComponentVariableDeclarationWithList1(list) {
  var content = React.createElement("div", null, list.map(function (_ref2) {
    var url = _ref2.url,
        id = _ref2.id,
        text = _ref2.text;
    return React.createElement("div", {
      className: "item",
      key: id
    }, React.createElement("a", {
      href: url,
      target: "_blank"
    }, text));
  }));
  return React.createElement("div", null, content);
};

FunctionComponentVariableDeclarationWithList1.displayName = "env/variableDeclarationInComponent/input/FunctionComponentVariableDeclarationWithList1";

var ClassComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ClassComponent, _React$Component);

  function ClassComponent() {
    _classCallCheck(this, ClassComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(ClassComponent).apply(this, arguments));
  }

  _createClass(ClassComponent, [{
    key: "render",
    value: function render() {
      var content = React.createElement("div", null, this.props.list.map(function (_ref3) {
        var url = _ref3.url,
            id = _ref3.id,
            text = _ref3.text;
        return React.createElement("div", {
          className: "item",
          key: id
        }, React.createElement("a", {
          href: url,
          target: "_blank"
        }, text));
      }));
      return React.createElement("div", null, content);
    }
  }]);

  return ClassComponent;
}(React.Component);

ClassComponent.displayName = "env/variableDeclarationInComponent/input/ClassComponent";
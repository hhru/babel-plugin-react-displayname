"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FunctionComponentVariableDeclarationWithList = function FunctionComponentVariableDeclarationWithList(list) {
    var content = list.map(function (_ref) {
        var url = _ref.url,
            id = _ref.id,
            text = _ref.text;
        return React.createElement(
            "div",
            { className: "item", key: id },
            React.createElement(
                "a",
                { href: url, target: "_blank" },
                text
            )
        );
    });
    return content;
};

var FunctionComponentVariableDeclarationWithList1 = function FunctionComponentVariableDeclarationWithList1(list) {
    var content = React.createElement(
        "div",
        null,
        list.map(function (_ref2) {
            var url = _ref2.url,
                id = _ref2.id,
                text = _ref2.text;
            return React.createElement(
                "div",
                { className: "item", key: id },
                React.createElement(
                    "a",
                    { href: url, target: "_blank" },
                    text
                )
            );
        })
    );

    return React.createElement(
        "div",
        null,
        content
    );
};

FunctionComponentVariableDeclarationWithList1.displayName = "env/variableDeclarationInComponent/input/FunctionComponentVariableDeclarationWithList1";

var ClassComponent = function (_React$Component) {
    _inherits(ClassComponent, _React$Component);

    function ClassComponent() {
        _classCallCheck(this, ClassComponent);

        return _possibleConstructorReturn(this, (ClassComponent.__proto__ || Object.getPrototypeOf(ClassComponent)).apply(this, arguments));
    }

    _createClass(ClassComponent, [{
        key: "render",
        value: function render() {
            var content = React.createElement(
                "div",
                null,
                this.props.list.map(function (_ref3) {
                    var url = _ref3.url,
                        id = _ref3.id,
                        text = _ref3.text;
                    return React.createElement(
                        "div",
                        { className: "item", key: id },
                        React.createElement(
                            "a",
                            { href: url, target: "_blank" },
                            text
                        )
                    );
                })
            );

            return React.createElement(
                "div",
                null,
                content
            );
        }
    }]);

    return ClassComponent;
}(React.Component);

ClassComponent.displayName = "env/variableDeclarationInComponent/input/ClassComponent";
const FunctionComponentVariableDeclarationWithList = list => {
    const content = list.map(({ url, id, text }) => React.createElement(
        "div",
        { className: "item", key: id },
        React.createElement(
            "a",
            { href: url, target: "_blank" },
            text
        )
    ));
    return content;
};

const FunctionComponentVariableDeclarationWithList1 = list => {
    const content = React.createElement(
        "div",
        null,
        list.map(({ url, id, text }) => React.createElement(
            "div",
            { className: "item", key: id },
            React.createElement(
                "a",
                { href: url, target: "_blank" },
                text
            )
        ))
    );

    return React.createElement(
        "div",
        null,
        content
    );
};

FunctionComponentVariableDeclarationWithList1.displayName = "withoutEnv/variableDeclarationInComponent/input/FunctionComponentVariableDeclarationWithList1";
class ClassComponent extends React.Component {
    render() {
        const content = React.createElement(
            "div",
            null,
            this.props.list.map(({ url, id, text }) => React.createElement(
                "div",
                { className: "item", key: id },
                React.createElement(
                    "a",
                    { href: url, target: "_blank" },
                    text
                )
            ))
        );

        return React.createElement(
            "div",
            null,
            content
        );
    }
}
ClassComponent.displayName = "withoutEnv/variableDeclarationInComponent/input/ClassComponent";
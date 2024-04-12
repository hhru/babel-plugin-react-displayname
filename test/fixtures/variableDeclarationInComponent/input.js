const FunctionComponentVariableDeclarationWithList = (list) => {
    const content = list.map(({ url, id, text }) => (
        <div className="item" key={id}>
            <a href={url} target="_blank">
                {text}
            </a>
        </div>
    ));
    return content;
};

const FunctionComponentVariableDeclarationWithList1 = (list) => {
    const content = (
        <div>
            {list.map(({ url, id, text }) => (
                <div className="item" key={id}>
                    <a href={url} target="_blank">
                        {text}
                    </a>
                </div>
            ))}
        </div>
    );

    return <div>{content}</div>;
};

class ClassComponent extends React.Component {
    render() {
        const content = (
            <div>
                {this.props.list.map(({ url, id, text }) => (
                    <div className="item" key={id}>
                        <a href={url} target="_blank">
                            {text}
                        </a>
                    </div>
                ))}
            </div>
        );

        return <div>{content}</div>;
    }
}

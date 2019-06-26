function FunctionComponent(value) {
    return <div>{value}</div>
}

const FunctionComponentVariableDeclaration = function (value) {
    return <div>{value}</div>
}

export function FunctionComponentNamedExport(value) {
    return <div>{value}</div>
}

export const FunctionComponentVariableDeclarationNamedExport = function (value) {
    return <div>{value}</div>
}

let FunctionComponentVariableDeclarationAssignmentExpression;
FunctionComponentVariableDeclarationAssignmentExpression = function (value) {
    return <div>{value}</div>
}

const FunctionComponentVariableDeclarationReturnList = ({ list }) => {
    if (list.length === 0) {
        return null;
    }
    return list.map(({ url, id, text }) => (
        <div className="item" key={id}>
            <a href={url} target="_blank">
                {text}
            </a>
        </div>
    ));
};


export default function FunctionComponentDefaultExport (value) {
    return <div>{value}</div>
}

var FunctionComponentArrow = ({value}) => {
    return (
        <div>{value}</div>
    )
};


function FunctionComponentReturnList({ list }) {
    if (list.length === 0) {
        return null;
    }
    return list.map(({ url, id, text }) => (
        <div className="item" key={id}>
            <a href={url} target="_blank">
                {text}
            </a>
        </div>
    ));
}

const FunctionComponentVariableDeclarationVariableContent = () => {
    const content = (
        <Fragment>
            <p>tets</p>
        </Fragment>
    );
    
    return content;
};

export const Some = translation(otherParam, ({ params }) => (
    <>{params}</>
));

export const Some2 = translation(function vasiliy(params) {
    return <>{params}</>
}, otherParam);

export const Some3 = translation(function(params) {
    return <>{params}</>
});

export const Component1 = ({ params }) => {
    const render = useMemo(() => {
        return <>{params}</>
    }, []);

    return render();
}

export function Component2({ params }) {
    const render = useMemo(() => {
        return <>{params}</>
    }, []);

    return render();
}

export const ExportCallExpressionLiteralComponent = renderToString(
    <Icon initial={IconColor.White} view={IconView.Arrow} scale={IconScale.Small} kind={IconKind.Up} />
);

const Variants = {
    One: 'oneVariant',
    Two: 'twoVariant',
};

const ComponentsObject =  {
    [Variants.One]: <div>one</div>,
    [Variants.Two]: () => (<div>two</div>),
}

const ComponentWithVariants = ({ variant }) => {
    const Components =  {
        [Variants.One]: <div>one</div>,
        [Variants.Two]: () => (<div>two</div>)
    }

    const Component = Components[variant];
    return <Component />
}

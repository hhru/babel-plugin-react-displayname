const Variants = {
    One: 'oneVariant',
    Two: 'twoVariant',
};

const ComponentsObject =  {
    [Variants.One]: <Social someProp />,
    [Variants.Two]: <Social otherProp />
}

const ComponentWithVariants = ({ variant }) => {
    const Components =  {
        [Variants.One]: <Social someProp />,
        [Variants.Two]: <Social otherProp />
    }

    const Component = Components[variant];
    return <Component />
}

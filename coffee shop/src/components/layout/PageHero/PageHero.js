import Navigator from '../Navigator/Navigator';

const PageHero = ({ className, title, titleClassName, children }) => {
    return (
        <section className={className}>
            <div className="container">
                <Navigator />
                {title ? <h1 className={titleClassName}>{title}</h1> : null}
                {children}
            </div>
        </section>
    );
};

export default PageHero;

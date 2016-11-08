import React, { PropTypes} from 'react';


const fakeComponentCreator = name => (props) => <pre><h2>{name}</h2><code>{JSON.stringify(props, null, 4)}</code></pre>

function Layout({
    AppHeader,
    children,
    ConfirmWrapper,
    ErrorCenter,
    Footer,
    LoadingBar,
    menuType,
    Menu,
    MessageCenter,
    LoadingStatusBar,
    DevTools,
    OtherRootComponent,
    ...otherProps
}){
    const componentData = Menu ? { 'data-menu': 'left' } : {};
    return  (
        <div data-focus='layout' {...componentData} {...otherProps}>
            {LoadingBar && <LoadingBar />}
            <MessageCenter {...otherProps}/>
            {ErrorCenter && <ErrorCenter />}
            {ConfirmWrapper && <ConfirmWrapper />}
            <AppHeader />
            {Menu && <Menu />}
            <div data-focus='page-content'>
                {children}
            </div>
            {Footer &&
                <footer data-focus='footer'>
                    <Footer />
                </footer>
            }
            { DevTools && <DevTools /> }
            { OtherRootComponent && <OtherRootComponent /> }
        </div>
    );
}


Layout.defaultProps = {
    AppHeader: fakeComponentCreator('AppHeader'), //default app header.
    MessageCenter: fakeComponentCreator('MessageCenter'), // default message center
    ConfirmWrapper: fakeComponentCreator('ConfirmWrapper') // default confirm wrapper,
};

Layout.PropTypes = {
    AppHeader: PropTypes.func,
    ConfirmWrapper: PropTypes.func,
    ErrorCenter: PropTypes.func,
    Footer: PropTypes.func,
    LoadingBar: PropTypes.func,
    LoadingStatusBar: PropTypes.func,
    Menu: PropTypes.func,
    MessageCenter: PropTypes.func
};

export default Layout;

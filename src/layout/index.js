import React, {Component, PropTypes} from 'react';
const fakeComponentCreator = name => function(props){return <pre><h2>{name}</h2><code>{JSON.stringify(props, null, 4)}</code></pre>}
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
  return  <div data-focus='layout' data-menu={'left'} {...otherProps}>
            <LoadingBar />
            <MessageCenter />
            {ErrorCenter &&
                <ErrorCenter />
            }
            <ConfirmWrapper />
            <AppHeader />
            {Menu &&
                <Menu />
            }
            <div data-focus='page-content'>
                {children}
            </div>
            {Footer &&
                <footer data-focus='footer'>
                    <Footer />
                </footer>
            }
            { DevTools && <DevTools />}
            { OtherRootComponent && <OtherRootComponent /> }
        </div>;
}


Layout.defaultProps = {
    AppHeader: fakeComponentCreator('AppHeader'), //default app header.
    ErrorCenter: fakeComponentCreator('ErrorCenter'), // default error center
    LoadingBar: fakeComponentCreator('LoadingBar'), // default loading bar
    LoadingStatusBar: fakeComponentCreator('LoadingStatusBar'),
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

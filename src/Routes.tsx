import React, {Suspense, lazy} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';

/* loader component for Suspense*/
import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';

/* Used to render a lazy component with react-router */
const waitFor = (Tag: React.LazyExoticComponent<any>) => (props: any) => <Tag {...props}/>;

const Welcome = lazy(() => import('./components/Welcome/Welcome'));
const Buttons = lazy(() => import('./components/Elements/Buttons'));
const Cards = lazy(() => import('./components/Elements/Cards'));
const TableStandard = lazy(() => import('./components/Tables/TableStandard'));
const FormStandard = lazy(() => import('./components/Forms/FormStandard'));

const BlogList = lazy(() => import('./components/Blog/BlogList'));
const BlogPost = lazy(() => import('./components/Blog/BlogPost'));
const BlogArticle = lazy(() => import('./components/Blog/BlogArticles'));
const BlogEditor = lazy(() => import('./components/Blog/BlogEditor'));

const Login = lazy(() => import('./components/Pages/Login'));
// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages: Array<string> = [
    '/login',
    '/register',
    '/recover',
    '/lock',
    '/notfound',
    '/error500',
    '/maintenance'
];

class Routes extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        const animationName = 'rag-fadeIn'
        const currentKey = this.props.location!.pathname.split('/')[1] || '/';
        const timeout = {enter: 500, exit: 500};
        if (listofPages.indexOf(this.props.location!.pathname) > -1) {
            return (
                // Page Layout component wrapper
                <BasePage>
                    <Suspense fallback={<PageLoader/>}>
                        <Switch location={this.props.location}>
                            <Route path="/login" component={waitFor(Login)}/>
                        </Switch>
                    </Suspense>
                </BasePage>
            )
        } else {
            return (
                // Layout component wrapper
                // Use <BaseHorizontal> to change layout
                <Base>
                    <TransitionGroup>
                        <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                            <div>
                                <Suspense fallback={<PageLoader/>}>
                                    <Switch location={this.props.location}>

                                        <Route path="/welcome" component={waitFor(Welcome)}/>
                                        <Route path="/buttons" component={waitFor(Buttons)}/>
                                        <Route path="/cards" component={waitFor(Cards)}/>
                                        <Route path="/table-standard" component={waitFor(TableStandard)}/>
                                        <Route path="/form-standard" component={waitFor(FormStandard)}/>

                                        <Route path="/home" component={waitFor(BlogList)}/>
                                        <Route path="/blog-post" component={waitFor(BlogPost)}/>
                                        <Route path="/blog-articles" component={waitFor(BlogArticle)}/>
                                        <Route path="/blog-article-view" component={waitFor(BlogEditor)}/>
                                        <Redirect from="/" to="/home" exact /> 
                                    </Switch>
                                </Suspense>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Base>
            )
        }
    }
}

const stateToProps = (state: any) => {
    return {
        authenticated: state.session.authenticated,
    };
};

const dispatchToProps = (dispatch: any) => ({
    dispatch
});

export default connect(
    stateToProps,
    dispatchToProps
)(Routes);

// export default withRouter(Routes);

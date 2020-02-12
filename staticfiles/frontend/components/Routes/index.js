import React from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import './style.scss'
import languages from "../../../../../accounts/static/accounts/components/AccountService/lang";
import Header from "../Header";
import Footer from "../Footer";
import Dashboard from '../../../../../static/components/Dashboard';
import Home from "../Home";

let lang = languages[document.documentElement.lang];

const app_url_prefix = '/';

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        console.log("hello")

    }


    render() {
        return (
                <div className={'Router'}>

                    <Router>
                        <Header/>
                        <Switch {...this.props}>
                            <Route path={app_url_prefix + "Home"} render={(routeProps) => (
                                    <Home {...routeProps} />
                            )}/>
                            <Route path="*" render={(routeProps) => (
                                    <Home {...routeProps} />
                            )}/>
                        </Switch>
                        {/*<Footer/>*/}
                    </Router>
                </div>
        )
    }
}

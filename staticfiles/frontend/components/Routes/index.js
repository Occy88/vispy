import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import languages from "../../../../../accounts/static/accounts/components/AccountService/lang";
import './style.scss'

import Header from "../Header";
import Demo from "../Demo";
import WelcomePage from '../WelcomePage'

let lang = languages[document.documentElement.lang];

const app_url_prefix = '';

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log('RENDERINGF')
        console.log(app_url_prefix)
        console.log(app_url_prefix+"dashboard")
        return (
                <div className={'Router'}>

                    <Router>
                        {/*<Header/>*/}
                        <Switch {...this.props}>
                             <Route path={app_url_prefix + "/dashboard"} render={(routeProps) => (
                                    <Demo {...routeProps} />
                            )}/>
                            <Route path={app_url_prefix} render={(routeProps) => (
                                    <WelcomePage {...routeProps} />
                            )}/>

                        </Switch>
                        {/*<Footer/>*/}
                    </Router>
                </div>
        )
    }
}

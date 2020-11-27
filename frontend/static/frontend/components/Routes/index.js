import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import languages from "../../../../../accounts/static/accounts/components/AccountService/lang";
import './style.scss'

import Header from "../Header";
import Demo from "../Demo";
import WelcomePage from '../WelcomePage'
import AceExample from "../../../../../code_env_manager/static/code_env_manager/components/CodeDisplay";

let lang = languages[document.documentElement.lang];

const app_url_prefix = '';

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Router>
                <Header
                    logoUrl={'https://cdn.shopifycloud.com/hatchful-web/assets/6fcc76cfd1c59f44d43a485167fb3139.png'}
                    fluid={true} company={DEFAULT_COMPANY}/>
                <div className={'Router'}>

                    {/*<Header/>*/}
                    <Switch {...this.props}>
                        <Route path={app_url_prefix + "/dashboard"} render={(routeProps) => (
                            <Demo {...routeProps} />
                        )}/>
                        <Route path={app_url_prefix + '/code'} render={(routeProps) => (
                            <AceExample {...routeProps} />
                        )}/>
                        <Route path={app_url_prefix} render={(routeProps) => (
                            <WelcomePage {...routeProps} />
                        )}/>

                    </Switch>
                    {/*<Footer/>*/}
                </div>
            </Router>
        )
    }
}

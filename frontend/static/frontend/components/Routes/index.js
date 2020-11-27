import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import languages from "../../../../../accounts/static/accounts/components/AccountService/lang";
import './style.scss'

import Header from "../Header";
import Demo from "../Demo";
import WelcomePage from '../WelcomePage'
<<<<<<< HEAD
import AceExample from "../../../../../code_env_manager/static/code_env_manager/components/CodeDisplay";
=======
import Index from "../../../../../code_env_manager/static/code_env_manager/components/CodeStateManager";
>>>>>>> b297e6efba7cd3b835d905a71105e5c2c285f6fd

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
                            <Index {...routeProps} />
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

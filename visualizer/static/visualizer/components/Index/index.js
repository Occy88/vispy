import React from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import './style.css'
import languages from "../../../../../accounts/static/accounts/components/AccountService/lang";
import NetworkController from "../NetworkController";
import DeepLearningController from "../DeepLearningController";

let lang = languages[document.documentElement.lang];

const app_url_prefix = '/visualizer';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            example_state: "something?",
        }
    }


    render() {
        return (
            <div className="app">
                <div className="content">
                    <Router>
                        <Switch {...this.props}>
                            <Route path={app_url_prefix + "/knn"} render={(routeProps) => (
                                <NetworkController {...routeProps} />
                            )}/>
                            <Route path={app_url_prefix + "/deep-learning"} render={(routeProps) => (
                                <DeepLearningController {...routeProps} />
                            )}/>
                            <Route path="*" render={() => {
                                return (
                                    <h2 style={{"textAlign": "center", "padding": "30px"}}>Page Not Found</h2>
                                )
                            }}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        )
    }
}

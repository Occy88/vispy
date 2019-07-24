import React from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import './style.css'
import languages from "./lang.js"
import NetworkController from "../NetworkController/NetworkController.jsx";

let lang = languages[document.documentElement.lang];

const app_url_prefix = '/visualizer';

class Routes extends React.Component {
    constructor(props) {
        super(props);
        //keep company in global state as all modules want to be aware of it. company is updated by the header
        this.state = {
            example_state: "something?",
        }
    }


    render() {
        let router =
            <div>
                <Header
                    logoUrl={'https://cdn.shopifycloud.com/hatchful-web/assets/6fcc76cfd1c59f44d43a485167fb3139.png'}
                    fluid={true}/>
                {/*div for header offset...*/}
                <div className={"root"}>
                    <Switch>
                        <Route path={app_url_prefix + "/knn"} render={(routeProps) => (
                            <NetworkController {...routeProps} />
                        )}/>
                        {/*<Route path='/learn/:id' component={LearnTopic}/>*/}
                        <Route render={() => {
                            return (
                                <h2 style={{"textAlign": "center", "padding": "30px"}}>Page Not Found</h2>
                            )

                        }}/>

                    </Switch>
                </div>
            </div>;
        let footer = (<Footer
            logoUrl={'https://cdn.shopifycloud.com/hatchful-web/assets/6fcc76cfd1c59f44d43a485167fb3139.png'}/>);
        return (
            <div className="app">
                <div className="content">

                    <Router {...this.props}>
                        <div>
                            <div className="container">
                                {router}
                            </div>
                            {footer}
                        </div>
                    </Router>
                </div>
            </div>
        )
    }

}


export default Routes;
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "../Routes";
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 *
 * @param props
 * @return {*}
 * @constructor
 */
class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Routes/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));

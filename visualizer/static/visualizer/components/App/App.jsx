import React from 'react';
import ReactDOM from 'react-dom';
import Index from "../Index";

/**
 *
 * @param props
 * @return {*}
 * @constructor
 */
class App extends React.Component {
    render() {
        return (
                <Index/>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));

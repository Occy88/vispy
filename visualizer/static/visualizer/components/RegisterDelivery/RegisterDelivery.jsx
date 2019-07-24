import React from 'react';
import ReactDOM from 'react-dom';
import NetworkController from '../../js/TestStuff.jsx'

/**
 * Register a Delivery to a selected company
 * @param props
 * @return {*}
 * @constructor
 */
class App extends React.Component {
    render() {
        return (
            <NetworkController/>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("entry_point"));

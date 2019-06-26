import React from 'react';
import ReactDOM from 'react-dom';
import TestStuff from './TestStuff.jsx'
/**
 * Register a Delivery to a selected company
 * @param props
 * @return {*}
 * @constructor
 */
class App extends React.Component {
    render() {
        return (
            <TestStuff/>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("register_delivery_form"));

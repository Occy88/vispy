import React from 'react';
import ReactDOM from 'react-dom';
import AppTest from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.css'

/**
 * Register a Delivery to a selected company
 * @param props
 * @return {*}
 * @constructor
 */
class App extends React.Component {
    render() {
        return (
            <div>
                <AppTest/>
                {/*<TestStuff/>*/}
            </div>

        )
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));

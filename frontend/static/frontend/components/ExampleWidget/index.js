import React from "react";
import BaseWidget from "../../../../../static/components/BaseWidget";
import ListSelect from "../../../../../static/components/ListSelect";

/**
 * An Example of a simple widget to be used in the grid.
 *
 * Note: To be able to use a widget you must also:
 *  - Add it to the WidgetList in DashboardGrid
 *  - Create a button for it in the DashboardToolbar
 *
 * Any given widget must take the following parameters
 * @param {function} handleRemove callback used to remove this widget
 * @param {string} i unique identity of this widget.
 */
class ExampleWidget extends React.Component {
    // Create the content using the BaseWidget component.
    constructor(props) {
        super(props)
    }
    render() {
        const params = {w: 2, h: 2};
        return (
            <BaseWidget params={params} handleRemove={this.props.handleRemove} i={this.props.i} header="Example 1">
                <div>
                    <p>This is an example of some content for a widget</p>
                </div>
            </BaseWidget>)
    }
}

export default ExampleWidget;

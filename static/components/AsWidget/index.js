import React from "react";
import BaseWidget from '../BaseWidget'
import WidgetHeader from '../WidgetHeader'
import WidgetBody from '../WidgetBody'

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
class AsWidget extends React.Component {
    constructor(props) {
        super(props)
    }

    // Create the content using the BaseWidget component.
    render() {
        const element = React.createElement(this.props.component, this.props);
        const content = (
            <BaseWidget handleRemove={this.props.handleRemove}>
                {element}
            </BaseWidget>
        );
        return content
    }
}

export default AsWidget;

import React from "react";
import Button from "../Button";
import './style.scss'
import thin_black_cross from "../../img/thin_black_cross.png"

/**
 * The skeleton of any widget to be displayed on the grid.
 *
 * @param {function} handleRemove callback used to remove this widget
 * @param {string} i unique index of the widget
 * @param {string} header the name of the widget
 * @param {JSX.Element} chlidren the content to be displayed within the widget (children of the component).
 */
//{ handleRemove, i, header, children }
class BaseWidget extends React.Component {
    // Styles
    constructor(props) {
        super(props)
    }

    render() {


        // Create the interior of any given widget to be displayed.
        return (
            <div className={'BaseWidget'}>
                <Button
                    className="remove"
                    onClick={this.props.handleRemove}
                    image={STATIC_URL + thin_black_cross}>
                    x
                </Button >
                {this.props.children}
            </div>
        );
    };
}

export default BaseWidget;

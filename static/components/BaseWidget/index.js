import React from "react";

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

        const style_removeButton = {
            position: "absolute",
            right: "3%",
            top: 0,
            cursor: "pointer"
        };

        const style_interior = {
            margin: "2% 5%",
            fontFamily: "Montserrat"
        };

        const style_header = {
            textAlign: "left",
            fontSize: "0.8em",
            fontWeight: "bold",
            letterSpacing: "0.2em",
            paddingBottom: "2%"
        };

        // Create the interior of any given widget to be displayed.
        return (
            <div style={style_interior}>
                <div style={style_header}>{this.props.header}</div>
                <span
                    className="remove"
                    style={style_removeButton}
                    onClick={() => {
                        this.props.handleRemove(this.props.i);
                    }}>
          x
        </span>
                <div>{this.props.children}</div>
            </div>
        );
    };
}

export default BaseWidget;

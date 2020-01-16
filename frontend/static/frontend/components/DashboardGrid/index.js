import React from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
import './style.scss'
import AsWidget from "../../../../../static/components/AsWidget";

const ResponsiveGridLayout = WidthProvider(Responsive);

/**
 * Component that handles the grid system of widgets
 *
 * @param {[{i: string, x: number, y: number, type: number}]} items descriptors of all the widgets
 * @param {function} handleRemove callback to remove a widget
 */
export default class DashboardGrid extends React.Component {
    constructor(props) {
        super(props)
    }

    // Generate all the widgets as children of a ResponsiveGridLayout
    render() {
        return (
            <div className={'DashboardGrid'}>
                <ResponsiveGridLayout
                    rowHeight={100}
                    compactType={null}
                    draggableCancel={'.nonDraggable'}
                >
                    {this.props.items.map(item => {
                        return <div className={'widget'}
                                    itemevation={3}
                                    key={item.i}
                                    data-grid={item.gridData}>
                            <AsWidget
                                createSpecial={this.props.createSpecial}
                                component={item.content}
                                removeElement={this.props.removeElement}
                                elementToEval={this.props.elementToEval}
                                elementToRemove={this.props.elementToRemove}
                                handleRemove={() => {
                                    this.props.handleRemove(item.i)
                                }}/>
                        </div>
                    })}
                </ResponsiveGridLayout>
            </div>
        );
    }
}

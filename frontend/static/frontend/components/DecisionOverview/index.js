import React from "react";
import Table from "../../../../../static/components/Table";
import TableHeader from "../../../../../static/components/TableHeader";
import TableBody from "../../../../../static/components/TableBody";
import TableRow from "../../../../../static/components/TableRow";
import TableCell from "../../../../../static/components/TableCell";
import "./style.scss"
import WidgetHeader from "../../../../../static/components/WidgetHeader";
import WidgetBody from "../../../../../static/components/WidgetBody";
import Button from "../../../../../static/components/Button";
import CadexVis from "../CadexVis";
import _ from 'underscore'
import uuid from 'uuid'
import Routes from "../Routes";

class DecisionOverview extends React.Component {
    constructor(props) {
        super(props);
        this.removeDecision = this.removeDecision.bind(this);
        this.state = {
            decisions: [
                {id: 1, decision: "Rejected", wait: 11, system: "KNN"},
                {id: 2, decision: "Limited Approval", wait: 9, system: "KNN"},
                {id: 3, decision: "Rejected", wait: 8, system: "KNN"},
                {id: 5, decision: "Rejected", wait: 7, system: "KNN"},
                {id: 12, decision: "Rejected", wait: 5, system: "KNN"},
                {id: 13, decision: "Limited Approval", wait: 3, system: "KNN"},
                {id: 14, decision: "Rejected", wait: 2, system: "KNN"},
                {id: 15, decision: "Rejected", wait: 1, system: "KNN"},
                {id: 21, decision: "Rejected", wait: 1, system: "KNN"},
                {id: 23, decision: "Limited Approval", wait: 3, system: "KNN"},
                {id: 24, decision: "Rejected", wait: 3, system: "KNN"},
                {id: 25, decision: "Rejected", wait: 2, system: "KNN"}
            ]
        };
    }

    removeDecision(id) {
        console.log('clicked remove elemnt', id);
        this.setState({
            decisions: _.reject(this.state.decisions, {id: id})
        });
    }

    render() {
        const button_style = {
            color: "unset",
            border: "1px solid #3e3e3e"
        };

        const decision_col_style = {
            textAlign: "unset"
        };

        return (
            <div className={'DecisionOverview'}>
                {/* The children contained within the component will be displayed within */}
                <WidgetHeader>
                    <h5>Decisions Flagged for Review | Currently Pending</h5>
                </WidgetHeader>
                <WidgetBody>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell style={decision_col_style}>Decision</TableCell>
                                <TableCell>Wait</TableCell>
                                <TableCell>System</TableCell>
                                <TableCell>Review</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this.state.decisions.map((decision,) => <TableRow key={decision.id}>
                                <TableCell>{decision.id}</TableCell>
                                <TableCell style={decision_col_style}>{decision.decision}</TableCell>
                                <TableCell>{decision.wait}</TableCell>
                                <TableCell>{decision.system}</TableCell>
                                <TableCell>
                                    <Button style={button_style} onClick={() => {
                                        let compUid = uuid();
                                        this.props.handleCreate(CadexVis, compUid, null, null,2, 4, {
                                            onSubmit: () => {
                                                this.removeDecision(decision.id);
                                                this.props.handleRemove(compUid);
                                            }
                                        })
                                    }}>
                                        Review
                                    </Button>
                                </TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </WidgetBody>
            </div>
        )
    }
}

export default DecisionOverview;
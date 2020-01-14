import React from "react";
import BaseWidget from "../../../../../static/components/BaseWidget";
import Table from "../../../../../static/components/Table";
import TableHeader from "../../../../../static/components/TableHeader";
import TableBody from "../../../../../static/components/TableBody";
import TableRow from "../../../../../static/components/TableRow";
import TableCell from "../../../../../static/components/TableCell";
import WidgetHeader from "../WidgetHeader";
import WidgetBody from "../WidgetBody";
import "./style.scss"

class DecisionOverview extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const decisions = [
            {id: 12, decision: "Rejected", wait: 5, system: "KNN"},
            {id: 13, decision: "Limited Approval", wait: 3, system: "KNN"},
            {id: 14, decision: "Rejected", wait: 3, system: "KNN"},
            {id: 15, decision: "Rejected", wait: 2, system: "KNN"}
        ];

        return (
            <BaseWidget handleRemove={this.props.handleRemove}>
                {/* The children contained within the component will be displayed within */}
                <WidgetHeader>
                    Something
                </WidgetHeader>
                <WidgetBody>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Decision</TableCell>
                                <TableCell>Wait</TableCell>
                                <TableCell>System</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {decisions.map((decision) => <TableRow key={decision.id}>
                                <TableCell>{decision.id}</TableCell>
                                <TableCell>{decision.decision}</TableCell>
                                <TableCell>{decision.wait}</TableCell>
                                <TableCell>{decision.system}</TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </WidgetBody>
            </BaseWidget>
        )
    }
}

export default DecisionOverview;
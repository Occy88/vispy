import React from "react";
import BaseWidget from "../../../../../static/components/BaseWidget";
import ListSelect from "../../../../../static/components/ListSelect";
import Table from "../../../../../static/components/Table";
import TableHeader from "../../../../../static/components/TableHeader";
import TableBody from "../../../../../static/components/TableBody";
import TableRow from "../../../../../static/components/TableRow";
import TableCell from "../../../../../static/components/TableCell";

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
const DecisionOverviewWidget = (handleRemove, i) => {

  // these would be fetched.
  const decisions = [
      {id:12, decision: "Rejected", wait: 5, system: "KNN"},
      {id:13, decision: "Limited Approval", wait: 3, system: "KNN"},
      {id:14, decision: "Rejected", wait: 3, system: "KNN"},
      {id:15, decision: "Rejected", wait: 2, system: "KNN"}
  ];

  // Create the content using the BaseWidget component.
  const content = (
    <BaseWidget handleRemove={handleRemove} i={i} header="Pending Decisions">
      {/* The children contained within the component will be displayed within */}
      <Table>
          <TableHeader>
              <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Decision</TableCell>
                  <TableCell>Wait</TableCell>
                  <TableCell>System</TableCell>
                  {/*<TableCell>Review</TableCell>*/}
              </TableRow>
          </TableHeader>
          <TableBody>
              {decisions.map( (decision) => <TableRow key={decision.id}>
                  <TableCell>{decision.id}</TableCell>
                  <TableCell>{decision.decision}</TableCell>
                  <TableCell>{decision.wait}</TableCell>
                  <TableCell>{decision.system}</TableCell>
              </TableRow>)}
          </TableBody>
      </Table>
    </BaseWidget>
  );

  // The default dimensions in terms of the grid system
  const defaultDimen = { w: 6, h: 2 };

  /*
    Any widget MUST have the following return object structure:
    {
      content: The content to be displayed within the widget,
      w: the default width of this widget (in terms of the grid system),
      h: the default height of this widget (in terms of the grid system)
    }
  */
  return {
    content: content,
    w: defaultDimen.w,
    h: defaultDimen.h
  };
};

export default DecisionOverviewWidget;

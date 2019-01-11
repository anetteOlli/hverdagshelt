// @flow

/**
 * @fileOverview Formats data for MuiTable
 * @author Sindre H. Paulshus
 * @see MuiTable.js
 * How to use:
 * Use the function on an array of problems/events to be displayed.
 * The elements in the array need to have an id and title value.
 * */

let id = 0;
function createSingleData(eId, title, status) {
  id += 1;
  return { id, eId, title, status };
}

/** Primary function of createData.
 * @params elements: [], an array of problem/event objects with atleast id, title and status
 */
export default function createData(elements: []) {
  const rows = [];
  elements.map(e => rows.push(createSingleData(e.id, e.title, e.status)));
  return rows;
}

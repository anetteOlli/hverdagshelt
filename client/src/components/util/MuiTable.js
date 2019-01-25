// @flow
import React from 'react';
import withRoot from '../../withRoot';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

// Material-ui
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import {
  MenuItem,
  Button,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  SvgIcon,
  Icon,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CheckCircle } from '@material-ui/icons';
import { purple, red, green, orange, yellow } from '@material-ui/core/colors';

/**
 * @DEPRECATED
 * @SEE MuiTable-2.js
 * @fileOverview Material UI Table Component. Used with Events and problems.
 * @author Sindre H. Paulshus
 * @see https://material-ui.com/demos/tables/
 * How to use: import and use as any component, ie <MuiTable />
 * As props use 'rows' and 'onClick={e => code}'
 * 'rows' are the actual table rows and need to be formatted with createMuiData.js
 * 'onClick' represents when an item in the table is clicked. e is the event, so use e.rowData to get the data in the row. This data
 * will be the formatted one from createMuiData.js. Crosscheck e.rowData.eid with ids of the events you put in the table to get all the values.
 * */

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  tableRow: {
    cursor: 'pointer'
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: 'initial'
  }
});

/** Virtualized MU Table Component
 *  NB! Not to be used.
 *  @see MuiTable instead
 *  Icon colors: primary, secondary, action, error, disabled
 *  */
class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  getRowIndex = ({ index }) => {
    return index;
  };

  //const [expanded, setExpanded] = React.useState(null);
  expanded = false;

  handleChange = panel => (event, isExpanded) => {
    //setExpanded(isExpanded ? panel : false);
    this.expanded = isExpanded ? panel : false;
  };

  cellRenderer = ({ cellData, columnIndex = null, rowIndex }) => {
    const { columns, classes, rowHeight, onRowClick, isExpandable } = this.props;
    let icon = cellData == 'Unchecked' ? 0 : cellData == 'Checked' ? 1 : cellData == 'Working' ? 2 : -1;
    let status = icon >= 0 ? true : false;

    //console.log(rowIndex);
    //console.log(this.props);
    //console.log(cellData);
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {isExpandable ? (
          <ExpansionPanel expanded={this.expanded === rowIndex} onChange={this.handleChange(rowIndex)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="heading">{cellData}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id
                dignissim quam.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ) : status ? (
          icon == 0 ? (
            <CheckCircle className="material-icons" color="disabled" />
          ) : icon == 1 ? (
            <CheckCircle className="material-icons" color="primary" />
          ) : (
            <CheckCircle className="material-icons" color="error" />
          )
        ) : (
          cellData
        )}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc'
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: '100%' }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                    rowIndex: this.getRowIndex
                  });
              } else {
                renderer = this.cellRenderer;
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index
                    })
                  }
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 75
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

//Backup
const data = [['Frozen yoghurt'], ['Ice cream sandwich'], ['Eclair'], ['Cupcake'], ['Gingerbread']];

let id = 0;
function createSingleData(problem) {
  id += 1;
  return { id, problem };
}

const rowsDefault = [];
//Randomized
for (let i = 0; i < 3; i += 1) {
  const randomSelection = data[Math.floor(Math.random() * data.length)];
  rowsDefault.push(createSingleData(...randomSelection));
}

function createData(problems: []) {
  const rowsDefault = [];
  problems.map(e => rowsDefault.push(createSingleData(e.street)));
}

/** MuiTable Component. A table of problems/events
 * @params props: rows and onClick
 */
function MuiTable(props) {
  const rows = props.rows == null ? rowsDefault : props.rows;
  //console.log("Rows lower");
  //console.log(rows);
  let isExpandable = props.isExpandable;
  isExpandable = false;
  let columns = [
    {
      width: 100,
      flexGrow: 1.0,
      label: 'Status',
      dataKey: 'status'
    },
    {
      width: 200,
      flexGrow: 1.0,
      label: 'Problem',
      dataKey: 'title'
    }
  ];
  if (isExpandable) {
    columns = [
      {
        width: 100,
        flexGrow: 1.0,
        label: 'Problem',
        dataKey: 'title'
      }
    ];
  }
  return (
    <Paper style={{ height: 250, width: '100%' }}>
      <WrappedVirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={props.onClick}
        isExpandable={isExpandable}
        columns={columns}
        columnContent={({ index }) => props.columnContent[index]}
      />
    </Paper>
  );
}

export default withRoot(MuiTable);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import connect from 'react-redux/es/connect/connect';
import withRoot from '../../withRoot';
import { withSnackbar } from 'notistack';
import { getProblemById, goToProblemDetail } from '../../store/actions/problemActions';

let id = 0;
function createSingleInstanceData(problem_id, problem_title, status, support) {
  id += 1;
  return { id, problem_id, problem_title, status, support};
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'problem_title', numeric: false, disablePadding: true, label: 'Tittel: ' },
  { id: 'status', numeric: false, disablePadding: true, label: 'Status: ' },
  { id: 'support', numeric: true, disablePadding: false, label: 'Støtte: ' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip title="Sort" placement={row.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const styles = theme => ({

  main: {
    width: '100%',
    height: '100%'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    width: '100%'
  },
  paper: {
    height: '100%',
    width: '100%'
  },
  tableRow: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: '5%',
  paddingRight: '5%'
  },
  tableRowBottom: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: '5%',
    paddingRight: '5%'
  },
});

class Tabletest extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'problem_title',
    problem_id: 1,
    data: [],
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  handleClick = id => {
    this.props.goToProblemDetail(id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <div className={classes.main}>
        <Paper className={classes.paper} name="Main paper in table">
            <div name="Main div in table">
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    return (
                      <TableRow
                        name={n.id}
                        hover
                        onClick={() => this.handleClick(n.problem_id)}
                        tabIndex={-1}
                        key={n.problem_id}
                      >
                        <TableCell component="th" padding="none">
                          {n.problem_title}
                        </TableCell>
                        <TableCell className={classes.tableRow}>{n.status}</TableCell>
                        <TableCell className={classes.tableRow}>{n.support}</TableCell>
                      </TableRow>
                    );
                  })}
                {/*
                  emptyRows > 0 && (
                  <TableRow >
                    <TableCell colSpan={3} />
                  </TableRow>
                )
                */}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            className={classes.tableRowBottom}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.problems !== nextProps.problems) {
      const problems = nextProps.problems;
      console.log(problems);
      const data = problems
        ? problems.map((problem, index: number) =>
            createSingleInstanceData(problem.problem_id, problem.problem_title, problem.status, problem.support || 0)
          )
        : null;
      this.setState({
        data
      });
    }
  }
}

const mapStateToProps = state => {
  return {
    problems: state.problem.problems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToProblemDetail: (id: number) => dispatch(goToProblemDetail(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(Tabletest))));

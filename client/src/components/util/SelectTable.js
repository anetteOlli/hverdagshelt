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
import { getAllEntrepreneurs } from '../../store/actions/entrepreneurAction';

let id = 0;
function createSingleInstanceData(entrepreneur_id, bedriftnavn) {
  id += 1;
  return { id, entrepreneur_id, bedriftnavn };
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

const rows = [{ id: 'bedriftnavn', numeric: false, disablePadding: true, label: 'Bedriftnavn ' }];

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
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    width: '100%'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  paper: {
    height: '100%',
    width: '100%'
  }
});

class SelectTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'bedriftsnavn',
    problem_id: 1,
    data: [],
    page: 0,
    rowsPerPage: 5
  };

  handleClick = (id) => {

    /** HEEEER MÅ VI UPDATE entrepreneur felt og sette locked til true **/

    this.props.funccccc(id);
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, entrepreneurs } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    console.log('LENGTH:');
    console.log(data.length);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    console.log('Se her', this.props.entrepreneurs);
    if (entrepreneurs && entrepreneurs.length > 0) {
      return (
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
                        onClick={() => this.handleClick(n.entrepreneur_id)}
                        tabIndex={-1}
                        key={n.entrepreneur_id}
                      >
                        <TableCell component="th" scope="row" padding="none">
                          {n.bedriftnavn}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
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
      );
    } else {
      return <div>LOADING...</div>;
    }
  }


  componentDidMount() {
    this.props.getAllEntrepreneurs();
    //createSingleInstanceData(this.props.entrepreneur.entrepreneur_id, this.props.entrepreneur.bedriftnavn || 0)
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.entrepreneurs !== nextProps.entrepreneurs) {
      const entrepreneurs = nextProps.entrepreneurs;
      console.log(entrepreneurs);
      const data = entrepreneurs
        ? entrepreneurs.map((entrepreneur, index: number) =>
          createSingleInstanceData(entrepreneur.entrepreneur_id, entrepreneur.bedriftnavn || 0)
        )
        : null;
      console.log("data:");
      console.log(data);
      this.setState({
        data
      });
    }
  }


}



const mapStateToProps = state => {
  return {
    entrepreneurs: state.entrepreneur.entrepreneurs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllEntrepreneurs: () => dispatch(getAllEntrepreneurs())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(SelectTable))));

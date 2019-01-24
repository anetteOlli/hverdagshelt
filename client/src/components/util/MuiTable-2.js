// @flow
import React from 'react';
import withRoot from '../../withRoot';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

// Material-ui
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
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
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  tableSortLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  CardMedia
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CheckCircle, ThumbUp } from '@material-ui/icons';
import { purple, red, green, orange, yellow } from '@material-ui/core/colors';
import { easyDateFormat } from '../util/DateFormater';

/** Courtesy of https://material-ui.com/demos/expansion-panels/
 * Styles the expansionpanels!
 */
const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  },
  expanded: {
    margin: 'auto'
  }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
}))(MuiExpansionPanelDetails);

//Own material start
/** Props for MuiTable
 * The props are as following:
 * Rows are the item you want to show. Should have AT LEAST id, title, description, status, entrepreneur, imgURL
 * onClick is an OPTIONAL function
 */
type Props = {
  classes: PropTypes.object,
  rows: PropTypes.array,
  onClick: PropTypes.func
};

/** Component Class for MuiTable
 * @see Props
 */
class MuiTable2 extends React.Component<Props> {
  state = {
    expanded: '0',
    sort: 'nothing',
    direction: 'asc',
    rows: [
      {
        problem_id: 1,
        problem_title: 'Title1',
        problem_description: 'abc1',
        image_user: 'imgURL',
        entrepreneur_id: 'Bob1',
        status: 'Done',
        support: 1,
        date_made: '18-01-2019'
      },
      {
        problem_id: 2,
        problem_title: 'Title2',
        problem_description: 'abc1',
        image_user: 'imgURL',
        entrepreneur_id: 'Bob1',
        status: 'Done',
        support: 0,
        date_made: '20-02-2019'
      },
      {
        problem_id: 3,
        problem_title: 'Title3',
        problem_description: 'abc1',
        image_user: 'imgURL',
        entrepreneur_id: 'Bob1',
        status: 'Done',
        support: 5,
        date_made: '25-02-2019'
      },
      {
        problem_id: 4,
        problem_title: 'Title4',
        problem_description: 'abc1',
        image_user: 'imgURL',
        entrepreneur_id: 'Bob1',
        status: 'Done',
        support: 2,
        date_made: '01-02-2019'
      },
      {
        problem_id: 5,
        problem_title: 'Title5',
        problem_description: 'abc1',
        image_user: 'imgURL',
        entrepreneur_id: 'Bob1',
        status: 'Done',
        support: 12,
        date_made: '03-03-2019'
      },
      {
        problem_id: 6,
        problem_title: 'Title6',
        problem_description: 'abc1',
        image_user: 'imgURL',
        entrepreneur_id: 'Bob1',
        status: 'Done',
        support: 7,
        date_made: '01-01-2019'
      }
    ]
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  sortSupport = e => {
    console.log('Sorting by support');
    if (this.state.sort == 'support') {
      if (this.state.direction == 'asc') {
        this.setState({
          direction: 'desc'
        });
      } else {
        console.log('setting asc');
        this.setState({
          direction: 'asc'
        });
      }
    }
    this.setState({
      sort: 'support'
    });
  };

  sortDate = e => {
    console.log('Sorting by date');
    if (this.state.sort == 'date') {
      if (this.state.direction == 'asc') {
        this.setState({
          direction: 'desc'
        });
      } else {
        this.setState({
          direction: 'asc'
        });
      }
    }
    this.setState({
      sort: 'date'
    });
  };

  getSorted(rows) {
    let sort = rows;
    if (this.state.sort == 'support') {
      if (this.state.direction == 'asc') {
        sort
          .sort(function(a, b) {
            return a.support - b.support;
          })
          .reverse();
      } else {
        sort.sort(function(a, b) {
          return a.support - b.support;
        });
      }
    } else if (this.state.sort == 'date') {
      if (this.state.direction == 'asc') {
        sort
          .sort(function(a, b) {
            return a.date_made.localeCompare(b.date_made);
          })
          .reverse();
      } else {
        sort.sort(function(a, b) {
          return a.date_made.localeCompare(b.date_made);
        });
      }
    }
    return sort;
  }

  render() {
    const { expanded } = this.state;
    const { classes, rows, onSupportClick, onClick } = this.props;
    let color = 'disabled';
    let myRows = [];
    if (rows == undefined) {
      //myRows = this.getSorted(this.state.rows);
      myRows = undefined;
    } else if(myRows[0] == null){
      myRows = undefined;
    } else {
      myRows = this.getSorted(rows);
    }
    //console.log("My Rows after sort:");
    console.log("Muitable2", myRows);
    //console.log("My state");
    //console.log(this.state);
    return (
      <div>
        <Card align="center">
          <CardContent>
            <Button onClick={this.sortDate} variant="contained" size="small">
              {' '}
              <Typography variant="button" style={{ fontSize: 10 }}>
                {' '}
                Sorter på dato{' '}
              </Typography>{' '}
            </Button>
            <Button onClick={this.sortSupport} variant="contained" size="small">
              {' '}
              <Typography variant="button" style={{ fontSize: 10 }}>
                {' '}
                Sorter på støtte{' '}
              </Typography>{' '}
            </Button>
          </CardContent>
        </Card>
        {myRows == undefined ? (
          <Card>
            <CardContent>
              <Typography align="center"> Ingen problemer å vise </Typography>
            </CardContent>
          </Card>
        ) : (
          myRows.map(row => (
            <ExpansionPanel
              expanded={expanded === row.problem_id}
              onChange={onClick == null ? this.handleChange(row.problem_id) : e => onClick(row)}
              key={row.problem_id}
            >
              <ExpansionPanelSummary>
                <CheckCircle
                  className="material-icons"
                  color={row.status == 'Unchecked' ? 'disabled' : row.status == 'Checked' ? 'primary' : 'error'}
                />
                <Typography style={{ flexBasis: '100%', fontSize: 15 }}>{row.problem_title}</Typography>
                <Typography style={{ flexBasis: '30%', fontSize: 12 }}>{easyDateFormat(row.date_made)}</Typography>
                <ThumbUp className="material-icons" color="primary" size="50%" />
                <Typography align="right" style={{ flexBasis: '10%', fontSize: 10 }}>
                  {row.support}
                </Typography>

                <CheckCircle className="material-icons" color="disabled" size="50%" />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs container direction="column" alignItems="flex-start" lg={5} md={6} sm={12} sx={12}>
                  <Grid item xs>
                    <h4>Beskrivelse</h4>
                  </Grid>
                  <Grid item xs>
                    <Typography>{row.problem_description}</Typography>
                  </Grid>
                  <Grid item xs>
                    <h4>Entreprenør</h4>
                  </Grid>
                  <Grid item xs>
                    <Typography>{row.entrepreneur_id}</Typography>
                  </Grid>
                  <Grid item xs>
                    <h4>Status</h4>
                  </Grid>
                  <Grid item xs>
                    <Typography>{row.status}</Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        )}
      </div>
    );
  }
}

export default withRoot(MuiTable2);

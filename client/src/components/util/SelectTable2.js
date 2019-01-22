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
import { MenuItem, Button, Typography, Grid, Paper, Card, CardContent, SvgIcon, Icon,
  TableBody, TableHead, TableRow, TableCell, tableSortLabel,
  List, ListItem, ListItemText, ListSubheader, CardMedia
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CheckCircle } from '@material-ui/icons';
import { purple, red, green, orange, yellow } from '@material-ui/core/colors';

/** Courtesy of https://material-ui.com/demos/expansion-panels/
 * Styles the expansionpanels!
 */
const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
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
}

/** Component Class for MuiTable
 * @see Props
 */
class MuiTable2 extends React.Component<Props> {
  state = {
    expanded: '0',
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { expanded } = this.state;
    const { classes, rows, onSupportClick, onClick } = this.props;
    let color = "disabled";
    return (
      <div>
        <Typography>Trykk på en entrepreneur for å legge den til problemet</Typography>
        {rows.map(row => (
          <ExpansionPanel expanded={expanded === row.id}
                          onChange={(onClick == null) ? this.handleChange(row.id) : e => onClick(row)}
                          key={row.id}>
            <ExpansionPanelSummary>

              <Typography>{row.businessName}</Typography>


            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid item xs container
                    direction="column" alignItems="flex-start"
                    lg={5} md={6} sm={12} sx={12}
              >
                <Grid item xs>
                  <h4>Bedriftsnavn</h4>
                </Grid>
                <Grid item xs>
                  <Typography>{row.businessName}</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default withRoot(MuiTable2);

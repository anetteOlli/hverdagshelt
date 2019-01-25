import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Save } from '@material-ui/icons';
import { Grid, Card, CardContent } from '@material-ui/core';
import ProblemsByYear from './ProblemsByYear';
import ProblemsByCat from './ProblemsByCat';
import ProblemsByEnt from './ProblemsByEnt';
import ProblemsByMonth from './ProblemsByMonth';
import { connect } from 'react-redux';
import { getProblemsByMuni } from '../../store/actions/statisticsActions';
import { getUserInfo } from '../../store/actions/userActions';
import type { ReduxState } from '../../store/reducers';
import LoadingComponent from '../util/LoadingComponent';
import { Redirect } from 'react-router-dom';
import { convertSingleToPDF, convertMultipleToPDF } from '../util/ConvertPDF';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * @fileOverview The main statistic component that displays different data using rechart and also allow the user to download the charts to pdf format.
 */

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  chartContainer: {
    marginLeft: -22,
    paddingBottom: theme.spacing.unit * 5
  },
  tableContainer: {
    height: 320
  }
});

type Props = {
  ready: boolean,
  classes: Object
};
type state = {
  isLoadingPDF: boolean,
  indexLoadingPDF: number
};
const ref = React.createRef();

class StatisticPage extends React.Component<Props, State> {
  state = {
    isLoadingPDF: false,
    indexLoadingPDF: 0
  };

  handleClickPDF(index, doc, name) {
    this.setState({ isLoadingPDF: true, indexLoadingPDF: index });
    const input = document.getElementById(doc);
    convertSingleToPDF(input, this.props.currentMuni.municipality + name, 1000, 900, () => {
      this.setState({ isLoadingPDF: false });
    });
  }

  handleClickPDFAll = () => {
    this.setState({ isLoadingPDF: true, indexLoadingPDF: 0 });
    const input = [
      document.getElementById('ProblemsByMonth'),
      document.getElementById('ProblemsByYear'),
      document.getElementById('ProblemsByCat'),
      document.getElementById('ProblemsByEnt')
    ];
    convertMultipleToPDF(input, this.props.currentMuni.municipality + '_all_statistikk', 1000, 300, () => {
      this.setState({ isLoadingPDF: false });
    });
  };

  render() {
    const { classes, ready, priority } = this.props;
    if (priority !== 'Municipality' && priority !== 'Administrator') return <Redirect to="/" />;
    if (ready) {
      return (
        <div>
          <div ref={ref} className={classes.content}>
            <Typography variant="h2" gutterBottom component="h2" align="center">
              Statistikk i {this.props.currentMuni.municipality}
            </Typography>
            <div className="pdf-button-1">
              <Tooltip title="last ned under" placement="top">
                <Button
                  align="center"
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => this.handleClickPDF(1, 'ProblemsByMonth', '_problem_måneder')}
                >
                  <Save />
                  <Typography />
                  {this.state.isLoadingPDF && this.state.indexLoadingPDF == 1 && <CircularProgress size={24} />}
                </Button>
              </Tooltip>
            </div>
            <ProblemsByMonth/>
            <div className="pdf-button-2">
              <Tooltip title="last ned under" placement="top">
                <Button
                  align="center"
                  size="medium"
                  color="primary"
                  variant="outlined"
                  onClick={() => this.handleClickPDF(2, 'ProblemsByYear', '_problem_år')}
                >
                  <Save />
                  <Typography />
                  {this.state.isLoadingPDF && this.state.indexLoadingPDF == 2 && <CircularProgress size={24} />}
                </Button>
              </Tooltip>
            </div>
            <ProblemsByYear />
            <div className="pdf-button-3">
              <Tooltip title="last ned under" placement="top">
                <Button
                  align="center"
                  size="medium"
                  color="primary"
                  variant="outlined"
                  onClick={() => this.handleClickPDF(3, 'ProblemsByCat', '_problem_kategori')}
                >
                  <Save />
                  <Typography />
                  {this.state.isLoadingPDF && this.state.indexLoadingPDF == 3 && <CircularProgress size={24} />}
                </Button>
              </Tooltip>
            </div>
            <ProblemsByCat/>
            <div className="pdf-button-4">
              <Tooltip title="last ned under" placement="top">
                <Button
                  align="center"
                  size="medium"
                  color="primary"
                  variant="outlined"
                  onClick={() => this.handleClickPDF(4, 'ProblemsByEnt', '_problem_entreprenør')}
                >
                  <Save />
                  <Typography />
                  {this.state.isLoadingPDF && this.state.indexLoadingPDF == 4 && <CircularProgress size={24} />}
                </Button>
              </Tooltip>
            </div>
            <ProblemsByEnt  />
          </div>
          <div className="pdf-button-0">
            <Card align="center">
              <CardContent>
                <Tooltip title="Én PDF, med de valgene du har nå" placement="top">
                  <Button
                    align="center"
                    size="large"
                    color="primary"
                    variant="outlined"
                    onClick={this.handleClickPDFAll}
                  >
                    <Save />
                    <Typography>Last ned PDF av alt</Typography>
                    {this.state.isLoadingPDF && this.state.indexLoadingPDF == 0 && <CircularProgress size={24} />}
                  </Button>
                </Tooltip>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    } else {
      return <LoadingComponent />;
    }
  }

  componentDidMount(): void {
    this.props.getAllProblemsFromMuni();
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    ready: state.statistic.ready,
    priority: state.user.priority,
    currentMuni: state.user.currentMuni
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
    getAllProblemsFromMuni: () => dispatch(getProblemsByMuni())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StatisticPage));

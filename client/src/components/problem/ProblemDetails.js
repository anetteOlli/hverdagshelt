// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import createHashHistory from 'history/createHashHistory';
import { getProblem } from '../../store/actions/problemActions';
const history = createHashHistory();

const styles = (theme: Object) => ({
  main: {
    margin: 20,
    padding: 20,
    paddingBottom: 500
  },
  button: {
    //marginTop: theme.spacing.unit,

  },
  editBTN: {
    align: 'right'
  },
  addBTN: {
    align: 'right'
  },
  grid: {
    height: '100%',
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'flex-end',
  }

});

class ProblemDetails extends React.Component<Props, State> {
  state = {
    categories: [],
    isLoggedIn: false,
    problem_id: -1
  };

  onClickAdd = () => {
    // history.push('/lagproblem');
    console.log(this.state.problem_id);
  };

  onClickEdit() {
    history.push('/editbruker');
  }

  componentDidMount() {
    this.setState({
      problem_id: this.props.match.params.problem_id
    });
    console.log(this.state.problem_id);
  }

  render() {
    const { classes, problem, isLoggedIn } = this.props;
    console.log(problem);
    return (
      <div className={classes.main}>
        <Grid container spacing={24} className={classes.grid} name={"Main Grid"}>
        <Typography variant="h2" gutterBottom align="center">
          Problem informasjon
        </Typography>
        <div className="pdbtnwrapper">
          <Button className={classes.addBTN} onClick={this.onClickAdd}>
            Add entrepreneur
          </Button>
          <Button className={classes.editBTN}onClick={this.onClickEdit}>
            Edit Problem
          </Button>
        </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.problem_id;

  return {
    problem: state.problem.problem
  }
  /*
    getProblem(id).then(() => {
    return {
      problem: state.problem.problem
    };
  });
   */
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(withSnackbar(ProblemDetails))));

// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import {ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { signIn } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import Divider from "@material-ui/core/Divider/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";


type Props = {
  classes: Object
};

type state = {
  categories: []
};


class ProblemDetails extends React.Component<Props, State> {



  render() {
    return {




    }
  }

}

export default ProblemDetails;
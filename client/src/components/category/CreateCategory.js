import React from 'react';
import withRoot from '../../withRoot';
import connect from 'react-redux/es/connect/connect';
import { withStyles } from "@material-ui/core";
import { withSnackbar } from "notistack";




const styles = (theme: Object) => ({

  wrapper: {
    minWidth: 400,
    minHeight: 400
  }

});

class CreateCategory extends React.Component<Props, State> {




  render() {
    const {classes} = this.props;
    return(
      <div className = {classes.wrapper}>
        LEGG TIL KATEGORI

      </div>
    );
  }


  componentDidMount() {


  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(CreateCategory))));

// @flow
import React from 'react';
import withRoot from '../../withRoot';
import axios from 'axios'
type Props = {};

class MainPage extends React.Component<Props> {

  handleClick = () => {
    axios.get('/problems/1').then(resp => console.log(resp));
  };
  render() {
    return (
      <main>
        <div>Test</div>
        <button onClick={this.handleClick}> LOL XD HAHAHA</button>
      </main>
    );
  }
}

export default withRoot(MainPage);

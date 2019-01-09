// @flow
import React, { PropTypes, Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component<Props> {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  constructor(props) {
    super(props);
    this.props.center.lat = this.props.lat;
    this.props.center.lng = this.props.lng;
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event)}
        />
        <div>
          <p>
            {' '}
            {console.log(this.props.center, this.props.center.lat, this.props.center.lng)}
            {this.props.center.lat}{' '}
          </p>
        </div>
      </div>
    );
  }
}

export default SimpleMap;

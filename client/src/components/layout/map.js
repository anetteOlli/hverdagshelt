// @flow
import React, { PropTypes, Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ img_src, text }) => (
  <div>
    <img src={img_src} style={{ height: '10px', width: '10px' }} />
    <p> {text} </p>
  </div>
);

/**
 * Example of usage of SimpleMap
 */
class Map1 extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      cords: {
        lat: '',
        lng: ''
      }
    };
  }

  onclick(lat) {
    console.log(lat.lat, lat.lng);
    let cords = { lat: lat.lat, lng: lat.lng };
    this.setState({
      cords: cords
    });
  }
  render() {
    return (
      <div>
        <SimpleMap cords={this.state.cords} onClick={this.onclick.bind(this)} center={[45, 32]} />
      </div>
    );
  }
}

/**
 * A map with a default location set.
 * when using SimpleMap it's possible to pass in a prop.onClick() to track the location clicked on mapStateToProps
 * (see Map1 for example)
 *
 **/
class SimpleMap extends Component<Props> {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={(lat, lng) => {
            this.props.onClick(lat, lng);
          }}
        >
          <AnyReactComponent
            lat={this.props.cords.lat}
            lng={this.props.cords.lng}
            text="you are here"
            img_src="http://cdn.grid.fotosearch.com/CSP/CSP808/k8080955.jpg"
          />
        </GoogleMapReact>
        <div>
          <p>
            {' '}
            {console.log(this.props.center, this.props)}
            {this.props.center.lat}{' '}
          </p>
        </div>
      </div>
    );
  }
}

export default Map1;

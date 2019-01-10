// @flow
import React, { PropTypes, Component } from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from './SearchBox';
import { updateMap } from '../../store/actions/mapActions';

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

  onclick(cords) {
    console.log(cords);
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
  constructor(props) {
    super(props);

    this.searchbar = React.createRef();

    this.state = {
      mapsApiLoaded: false,
      mapInstance: null,
      mapsapi: null,
      map: null,
      googlemaps: null
    };
  }

  apiHasLoaded(map, maps) {
    console.log('apiHasLoaded', maps);
    if (map && maps) {
      this.setState({
        apiReady: true,
        map: map,
        googlemaps: maps,
        mapsapi: maps
      });
      console.log(this.state.map);
    }
  }

  render({ apiReady, googlemaps, map, mapsapi } = this.state) {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        {apiReady && <SearchBox map={this.state.map} mapsapi={this.state.mapsapi} googlemaps={this.state.googlemaps} />}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE', libraries: ['places'] }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onClick={(lat, lng) => {
            this.props.updateMap(lat, lng);
          }}
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
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

const mapStateToProps = state => {
  return {
    lat: state.map.lat,
    lng: state.map.lng
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMap: cords => dispatch(updateMap(cords))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(Map1))));

// @flow
import React from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from './SearchBox';
import { updateMap } from '../../store/actions/mapActions';
import { connect } from 'react-redux';
import withRoot from '../../withRoot';

const AnyReactComponent = ({ img_src, text }) => (
  <div>
    <img src={img_src} style={{ height: '10px', width: '10px' }} />
    <p> {text} </p>
  </div>
);

type State1 = {};
type Props1 = {};

/**
 * Example of usage of SimpleMap
 */
/*
class Map1 extends Component<Props1> {
  render() {
    return (
      <div>
        <SimpleMap />
      </div>
    );
  }
}
*/
type Props2 = {
  apiReady: any,
  googlemaps: any,
  map: any,
  mapsapi: any,
  center: {
    lat: number,
    lng: number
  },
  zoom: number,
  updateMap: Function,
  lat: number,
  lng: number
};

type State2 = {
  mapsApiLoaded: boolean,
  mapInstance: any,
  mapsapi: any,
  map: any,
  googlemaps: any,
  apiReady: boolean
};

/**
 * A map with a default location set.
 * when using SimpleMap it's possible to pass in a prop.onClick() to track the location clicked on mapStateToProps
 * (see Map1 for example)
 **/
class SimpleMap extends React.Component<Props2, State2> {
  state = {
    mapsApiLoaded: false,
    mapInstance: null,
    mapsapi: null,
    map: null,
    googlemaps: null,
    apiReady: false
  };
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11,
    lat: 59.95,
    lng: 30.33
  };

  apiHasLoaded(map, maps) {
    console.log('apiHasLoaded', maps);
    if (map && maps) {
      this.setState({
        apiReady: true,
        map: map,
        googlemaps: maps,
        mapsapi: maps
      });
    }
  }

  render() {
    var { apiReady, googlemaps, map, mapsapi } = this.state;
    console.log(this.props);
    console.log('Lat from redux: ', this.props.lat);
    console.log('Lng from redux ', this.props.lng);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        {apiReady && <SearchBox map={this.state.map} mapsapi={this.state.mapsapi} googlemaps={this.state.googlemaps} />}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE', libraries: ['places'] }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onClick={cords => {
            console.log(cords);
            this.props.updateMap(cords.lat, cords.lng);
          }}
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          <AnyReactComponent
            lat={this.props.lat}
            lng={this.props.lng}
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
    lat: state.lat,
    lng: state.lng,
    center: state.center,
    zoom: state.zoom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMap: cords => dispatch(updateMap(cords.lat, cords.lng))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(SimpleMap));

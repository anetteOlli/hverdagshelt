// @flow
import React from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from '../layout/SearchBox';
import { updateMap } from '../../store/actions/mapActions';
import { connect } from 'react-redux';
import Marker from '@material-ui/icons/AddLocation';
import withRoot from '../../withRoot';

type Props = {
  updateMap: Function,
  lat: number,
  lng: number
};

type State = {
  mapsapi: any,
  map: any,
  googlemaps: any,
  apiReady: boolean,
  center: {
    lat: number,
    lng: number
  },
  zoom: number
};

/**
 * A map with a default location set.
 * when using SimpleMap it's possible to pass in a prop.onClick() to track the location clicked on mapStateToProps
 * (see Map1 for example)
 **/
class SimpleMap extends React.Component<Props, State> {
  state = {
    mapsapi: null,
    map: null,
    googlemaps: null,
    apiReady: false,
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  handleApiLoad = (map, maps) => {
    console.log('apiHasLoaded', maps);
    if (map && maps) {
      this.setState({
        apiReady: true,
        map: map,
        googlemaps: maps,
        mapsapi: maps
      });
    }
  };

  //        {apiReady && <SearchBox map={map} mapsapi={mapsapi} googlemaps={googlemaps} />}
  render() {
    const { apiReady, googlemaps, map, mapsapi, center, zoom } = this.state;
    return (
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE', libraries: ['places'] }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onClick={this.props.updateMap}
          onGoogleApiLoaded={this.handleApiLoad}
        >
          {this.props.lat && <Marker lat={this.props.lat} lng={this.props.lng} />}
        </GoogleMapReact>
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
    updateMap: cords => dispatch(updateMap(cords.lat, cords.lng))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(SimpleMap));

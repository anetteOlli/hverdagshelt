// @flow
import React from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from '../layout/SearchBox';
import { updateMap, changePlaceName } from '../../store/actions/mapActions';
import { connect } from 'react-redux';
import Marker from '@material-ui/icons/AddLocation';
import withRoot from '../../withRoot';

let imgsrc = './geotag.png';
let API_KEY = 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE';

type Props = {};

type State = {
  mapsapi: any,
  map: any,
  googlemaps: any,
  apiReady: boolean,
  zoom: number
};

/**
 * Difference between 'lat', 'lng' and 'Center', lat and lng is used for placing marker, center is used for centering map
 * as we don't want the map to load each time a user clicks on the map, we are splitting those variables into to different locations
 *
 **/
class MapMarkers extends React.Component<Props, State> {
  state = {
    mapsapi: null,
    map: null,
    googlemaps: null,
    apiReady: false,
    center: {
      lat: 63.42656212314987,
      lng: 10.393969503996345
    },
    zoom: 13
  };

  apiHasLoaded = (map, maps) => {
    console.log('apiHasLoaded', map);
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
        {apiReady && <SearchBox map={map} mapsapi={mapsapi} googlemaps={googlemaps} />}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE', libraries: ['places'] }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(MapMarkers));

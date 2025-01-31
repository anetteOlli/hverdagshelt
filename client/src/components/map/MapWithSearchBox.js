// @flow
import React from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from './SearchBox';
import { updateMap, changePlaceName } from '../../store/actions/mapActions';
import { connect } from 'react-redux';
import Marker from '@material-ui/icons/AddLocation';
import withRoot from '../../withRoot';
import { Pointer } from './pointer';
/**
 * @fileOverview Map component that can will place marker when user clicks on map or uses the SearchBox. Uses API_KEY from google api.
 */

const API_KEY = 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE';

type Props = {
  updateMap: Function,
  updateMapName: Function,
  lat: number,
  lng: number,
  center: {
    lat: number,
    lng: number
  },
  street: string,
  municipality: string,
  city: string
};

type State = {
  mapsapi: any,
  map: any,
  googlemaps: any,
  apiReady: boolean,
  zoom: number,
  center: {
    lat: number,
    lng: number
  }
};

/**
 *  @params lat : latitude of the marker placed on the map
 * @params lng: longitude of the marker placed on the map
 * @params Center: lat & lng of the center of the map. Cannot be changed once the google-map-react component has loaded.
 * @return the map component with a single map marker
 * @params zoom: how detailed the map will displayed
 * @params mapsApiLoaded: used by google-map-react component. Once the mapsApiLoaded is true, the component is ready to use google-map api
 * @params mapsapi: google-map object
 * @params hasLoaded: ensures that the map does not load before the center has been chosen.
 **/
class SimpleMap extends React.Component<Props, State> {
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

  onRecievingLocation = cords => {
    this.props.updateMap(cords);
    this.fromCordsToPlace(cords);
  };

  apiHasLoaded = (map, maps) => {
    if (map && maps) {
      this.setState({
        apiReady: true,
        map: map,
        googlemaps: maps,
        mapsapi: maps
      });
    }
  };
  /**
   * @params cords: lat, lng of the marker
   *
   */
  fromCordsToPlace(cords) {
    let url =
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + cords.lat + ',' + cords.lng + '&key=' + API_KEY;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.results.length > 5) {
          if (responseJson.results[2].address_components.length > 6) {
            //chosing responseJson.results[2].address_components because it has the most accurate results
            let address_components = responseJson.results[2].address_components;
            let place = {
              street: address_components.filter(e => e.types[0] == 'route')[0].long_name,
              city: address_components.filter(e => e.types[0] == 'postal_town')[0].long_name,
              municipality: address_components
                .filter(e => e.types[0] == 'administrative_area_level_2')[0]
                .long_name.replace(' kommune', ''),
              county: address_components.filter(e => e.types[0] == 'administrative_area_level_1')[0].long_name,
              country: address_components.filter(e => e.types[0] == 'country')[0].long_name
            };
            if (place.country === 'Norge' || place.country === 'Norway') {
              this.props.updateMapName(place.street, place.municipality, place.county, place.city);
            } else {
              console.log('place', place);
            }
          }
        }
      });
  }

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
          onClick={this.onRecievingLocation}
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {// $FlowFixMe
          this.props.lat && <Pointer lat={this.props.lat} lng={this.props.lng} />}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lat: state.map.currentMarker.lat,
    lng: state.map.currentMarker.lng
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMap: cords => dispatch(updateMap(cords.lat, cords.lng)),
    updateMapName: (street, municipality, county, city) => dispatch(changePlaceName(street, municipality, county, city))
  };
};
// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(SimpleMap));

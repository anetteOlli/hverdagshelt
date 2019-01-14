// @flow
import React from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from '../layout/SearchBox';
import { updateMap, changePlaceName } from '../../store/actions/mapActions';
import { connect } from 'react-redux';
import Marker from '@material-ui/icons/AddLocation';
import withRoot from '../../withRoot';
import { getProblemsByState, goToProblemDetail } from '../../store/actions/problemActions';

let imgsrc = './geotag.png';
let API_KEY = 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE';

type Props = {
  problems: problem[],
  currentProblemId: number,
  getProblemsByState: Function,
  match: { params: { municipality: string } }
};
type problem = {
  lat: string,
  lng: string,
  id: number,
  title: string,
  description: string,
  locked: string,
  img_user: string,
  date_made: string,
  last_edited: string,
  street: string,
  status: string,
  municipality: string,
  county: string,
  city: string
};

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

  componentWillMount() {
    this.props.getProblemsByState('Oppland');
  }

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

  render() {
    const { apiReady, googlemaps, map, mapsapi, center, zoom } = this.state;
    return (
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          // create array.map functionality here
          {this.props.problems.map(problem => (
            <div key={problem.id}>
              {console.log('uskrift av problemet i map', problem)}
              <Marker
                color="primary"
                lat={problem.lat}
                lng={problem.lng}
                onClick={this.props.goToProblemDetail(problem.id)}
              />
            </div>
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //placeholder:
    problems: state.problem.problems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToProblemDetail: id => dispatch(goToProblemDetail(id)),
    getProblemsByState: state => dispatch(getProblemsByState(state))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(MapMarkers));

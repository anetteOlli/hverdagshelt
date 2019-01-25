// @flow
import React from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from './SearchBox';
import { changeCenter } from '../../store/actions/mapActions';
import { connect } from 'react-redux';
import withRoot from '../../withRoot';
import { getProblemsByMuni, goToProblemDetail } from '../../store/actions/problemActions';
import { Pointer, PointerCurrent } from './pointer';

/** API_KEY from google api.
 * @fileOverview MapMarkers component, modified so that it only places one marker.
 *
 **/
const API_KEY = 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE';

type Props = {
  problems: problem[],
  currentProblemId: number,
  getProblemsByMuni: Function,
  match: { params: { municipality: string } },
  goToProblemDetail: Function,
  center: {
    lat: number,
    lng: number
  },
  currentProblem: problem
};
type problem = {
  latitude: string,
  longitude: string,
  problem_id: number,
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
  zoom: number,
  center: {
    lat: number,
    lng: number
  },
  hasLoaded: boolean
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
class MapMarkers extends React.Component<Props, State> {
  // $FlowFixMe
  state = {
    zoom: 13,
    mapsApiLoaded: false,
    mapsapi: null,
    map: null,
    googlemaps: null,
    hasLoaded: false
  };

  componentDidMount() {
    if (this.props.currentProblem) {
      this.setState({
        hasLoaded: true
      });
    }
  }

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

  render() {
    // $FlowFixMe
    const { apiReady, googlemaps, map, mapsapi, zoom, hasLoaded } = this.state;
    const { problems, currentProblemId } = this.props;
    if (hasLoaded) {
      return (
        <div style={{ height: '80vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={this.props.center}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          >
            {problems &&
              problems.map(problem =>
                problem.problem_id == currentProblemId ? (
                  <PointerCurrent
                    onClick={() => this.props.goToProblemDetail(problem.problem_id)}
                    key={problem.problem_id}
                    lat={problem.latitude}
                    lng={problem.longitude}
                    text={problem.problem_id}
                  />
                ) : null
              )}
          </GoogleMapReact>
        </div>
      );
    } else {
      return <div>LOADING MAP....</div>;
    }
  }
}

const mapStateToProps = state => {
  const problems = state.problem.problems;
  const currentProblemId = state.problem.currentProblemId;
  const currentProblem = problems.filter(problem => {
    // console.log(problem);
    if (problem.problem_id == currentProblemId) {
      return problem;
    }
  })[0];
  //console.log('currentProblem', currentProblem);
  const center = currentProblem
    ? { lat: parseFloat(currentProblem.latitude), lng: parseFloat(currentProblem.longitude) }
    : {
        lat: 69.6489,
        lng: 18.95508
      };
  return {
    problems,
    center,
    currentProblem,
    currentProblemId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToProblemDetail: currentProblemId => dispatch(goToProblemDetail(currentProblemId)),

    changeCenter: (lat: string, lng: string) => dispatch(changeCenter(lat, lng))
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(MapMarkers));

// @flow
import React from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from './SearchBox';
import { changeCenter } from '../../store/actions/mapActions';
import { connect } from 'react-redux';
import withRoot from '../../withRoot';
import { getProblemsByMuni, goToProblemDetail } from '../../store/actions/problemActions';
import { Pointer, PointerCurrent } from './pointer';

let API_KEY = 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE';

type Props = {
  problems: problem[],
  currentProblemId: number,
  getProblemsByMuni: Function,
  match: { params: { municipality: string } },
  goToProblemDetail: Function,
  center: {
    lat: number,
    lng: number
  }
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
 * Difference between 'lat', 'lng' and 'Center', lat and lng is used for placing marker, center is used for centering map
 * as we don't want the map to load each time a user clicks on the map, we are splitting those variables into to different locations
 *
 **/
class MapMarkers extends React.Component<Props, State> {
  state = {
    zoom: 13,
    mapsApiLoaded: false,
    mapInstance: null,
    mapsapi: null,
    map: null,
    googlemaps: null,
    hasLoaded: false
  };

  componentDidMount() {
    this.props.getProblemsByMuni('Nord-Fron', 'Oppland').then(() => this.setState({ hasLoaded: true }));
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
                ) : (
                  <Pointer
                    onClick={() => this.props.goToProblemDetail(problem.problem_id)}
                    key={problem.problem_id}
                    lat={problem.latitude}
                    lng={problem.longitude}
                    text={problem.problem_id}
                  />
                )
              )}
          </GoogleMapReact>
          {console.log('this.props when hasLoaded=true', this.props)}
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
  const center = problems
    ? { lat: problems[0].latitude, lng: problems[0].longitude }
    : {
        lat: 69.6489,
        lng: 18.95508
      };
  console.log(center);
  return {
    problems,
    center,
    currentProblemId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToProblemDetail: currentProblemId => dispatch(goToProblemDetail(currentProblemId)),
    getProblemsByMuni: (muni, county) => dispatch(getProblemsByMuni(muni, county)),
    changeCenter: (lat: string, lng: string) => dispatch(changeCenter(lat, lng))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(MapMarkers));

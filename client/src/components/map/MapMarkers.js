// @flow
import React from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from '../layout/SearchBox';
import { updateMap, changePlaceName } from '../../store/actions/mapActions';
import { connect } from 'react-redux';
import Marker from '@material-ui/icons/AddLocation';
import withRoot from '../../withRoot';
import { getProblemsByMuni, goToProblemDetail } from '../../store/actions/problemActions';
import { changeCenter } from '../../store/actions/mapActions';
import styled from 'styled-components';

let imgsrc = './geotag.png';
let API_KEY = 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE';

type Props = {
  problems: problem[],
  currentProblemId: number,
  getProblemsByMuni: Function,
  match: { params: { municipality: string } },
  goToProblemDetail: Function
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
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;
const WrapperCurrent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background-color: blue;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Pointer = ({ onClick }) => <Wrapper onClick={onClick} />;
const PointerCurrent = ({ onClick }) => <WrapperCurrent onClick={onClick} />;

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
    const { problems } = this.props;
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
            {console.log('currentProblemId', this.props.currentProblemId)}
            {problems &&
              problems.map(problem =>
                problem.problem_id == this.props.currentProblemId ? (
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
          {console.log('this.props', this.props)}
        </div>
      );
    } else {
      return <div>LOADING MAP....</div>;
    }
  }
}

const mapStateToProps = state => {
  const problems = state.problem.problems;
  const center = problems
    ? { lat: problems[0].latitude, lng: problems[0].longitude }
    : {
        lat: 69.6489,
        lng: 18.95508
      };
  console.log(center);
  return {
    problems,
    center
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToProblemDetail: id => dispatch(goToProblemDetail(id)),
    getProblemsByMuni: (muni, county) => dispatch(getProblemsByMuni(muni, county)),
    changeCenter: (lat: string, lng: string) => dispatch(changeCenter(lat, lng))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(MapMarkers));

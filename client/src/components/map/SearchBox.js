import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateMarker, changePlaceName } from '../../store/actions/mapActions';
import { connect } from 'react-redux';
import withRoot from '../../withRoot';

type Props = {
  placeChanged: Function,
  lat: number,
  lng: number,
  updateMarker: Function
};

let API_KEY = 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE';

type State = {};
class SearchBox extends Component<Props, State> {
  static propTypes = {
    mapsapi: PropTypes.shape({
      places: PropTypes.shape({
        SearchBox: PropTypes.func
      }),
      event: PropTypes.shape({
        clearInstanceListeners: PropTypes.func
      })
    }).isRequired,
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func
  };

  static defaultProps = {
    placeholder: 'søk etter sted her, eller trykk på kartet',
    onPlacesChanged: null
  };

  constructor(props) {
    super(props);

    this.searchInput = React.createRef();

    this.state = {
      cords: {
        lat: '',
        lng: ''
      },
      location: ''
    };
  }

  componentDidMount() {
    const {
      mapsapi: { places }
    } = this.props;
    if (this.searchInput.current) {
      this.searchBox = new places.SearchBox(this.searchInput.current);
      this.searchBox.addListener('places_changed', this.onPlacesChanged);
    }
  }

  componentWillUnmount() {
    const {
      mapsapi: { event }
    } = this.props;

    event.clearInstanceListeners(this.searchBox);
  }

  onPlacesChanged = () => {
    const { onPlacesChanged } = this.props;
    let cords = {
      lat: this.searchBox.getPlaces()[0].geometry.location.lat(),
      lng: this.searchBox.getPlaces()[0].geometry.location.lng()
    };
    console.log('searchbox cords:', cords);

    let url =
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + cords.lat + ',' + cords.lng + '&key=' + API_KEY;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson, fromCordsToPlace()', responseJson.results);
        if (responseJson.results.length > 5) {
          if (responseJson.results[0].address_components.length > 3) {
            //chosing responseJson.results[2].address_components because it has the most accurate results
            let address_components = responseJson.results[0].address_components;
            let place = {
              street: address_components.filter(e => e.types[0] == 'route')[0].long_name,
              city: address_components.filter(e => e.types[0] == 'postal_town')[0].long_name,
              municipality: address_components.filter(e => e.types[0] == 'administrative_area_level_2')[0].long_name,
              county: address_components.filter(e => e.types[0] == 'administrative_area_level_1')[0].long_name,
              country: address_components.filter(e => e.types[0] == 'country')[0].long_name
            };
            console.log('street', place);
            if (place.country === 'Norge') {
              this.props.updateMapName(place.street, place.municipality, place.county, place.city);
            } else {
              console.log('ikke i norge');
            }
            this.props.updateMarker(cords);

            console.log('place is changed based on searchbox', place);
          }
        }
      });
  };

  render() {
    const { placeholder } = this.props;

    return (
      <input
        ref={this.searchInput}
        placeholder={placeholder}
        type="text"
        style={{
          width: '100%',
          height: '48px',
          fontSize: '20px',
          padding: '12px 104px 11px 64px'
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMarker: cords => dispatch(updateMarker(cords.lat, cords.lng)),
    updateMapName: (street, municipality, county, city) => dispatch(changePlaceName(street, municipality, county, city))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRoot(SearchBox));

// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
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
    placeholder: 'Search...',
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

    this.searchBox = new places.SearchBox(this.searchInput.current);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
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
    this.setState({
      cords: cords
    });
    console.log(
      'onPlacesChanged getPlaces()[0].geometry.location.lat()',
      this.searchBox.getPlaces()[0].geometry.location.lat()
    );
    console.log('this.state.cords', this.state.cords);
    console.log('onPlacesChanged', this.state.location);
    console.log('forsøker å skrive ut drit', this.props);

    if (onPlacesChanged) {
      onPlacesChanged(this.searchBox.getPlaces());
      console.log('place has changed', this.searchBox.getPlaces());
    }
  };

  render() {
    const { placeholder } = this.props;

    return (
      <input
        ref={this.searchInput}
        placeholder={placeholder}
        type="text"
        style={{
          width: '392px',
          height: '48px',
          fontSize: '20px',
          padding: '12px 104px 11px 64px'
        }}
      />
    );
  }
}

export default SearchBox;

  // note to self: wtf hvorfor får jeg s mye feil npr jeg puller kode fra de andre på teamet

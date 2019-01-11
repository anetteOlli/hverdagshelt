import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
let API_KEY = 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE';

class AnyReactComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      problem: {
        id: '',
        description: '',
        user: '',
        entrepreneur: '',
        street: '',
        municipality: ''
      },
      lat: this.props.lat,
      lng: this.props.lng
    };

  }

  componentDidMount(): void {
    this.onFill();
  }

  /**
   * Simple method to fill the marker with information if the
   */
  onFill = () => {
    if(this.props.problem !== undefined){
      this.setState({problem: this.props.problem});
      console.log('yay');
    }
    console.log('her uansett')
  };

  render(){
    return(
      <div onClick={() => this.props.change(this.state)}>
        <img src={this.props.imag} className="YOUR-CLASS-NAME" style={{'position':'absolute', 'height': '30px', 'width': '30px', 'left':'-15px', 'top': '-30px'}}/>
      </div>
    )
  }
}


class SimpleMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: {
              problem: {
                id: '',
                description: '',
                user: '',
                entrepreneur: '',
                street: '',
                municipality: ''
              },
              lat: '',
              lng: ''
            },
            center: [{
              problem: {
                id:'',
                description: '',
                user: '',
                entrepreneur: '',
                street: '',
                municipality: ''
              },
              lat: '',
              lng: ''
            }],
            zoom: 17,
            start_cords: {
              lat: 61.5966871,
              lng: 9.769488616282388
            }
        };
        this.changeCurrent = this.changeCurrent.bind(this);
        this.fromCordsToPlace = this.fromCordsToPlace.bind(this);
    }

  /***
   * Fetch method that serves as an connection function to google api's geocode reversing function
   * @param cords latitude and longitude for å specific problem or marker on the map
   */
  fromCordsToPlace = (cords) => {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + cords.lat + ',' + cords.lng + '&key=' + API_KEY;
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
              let place = {
                street: responseJson.results[2].address_components[1].long_name,
                city: responseJson.results[2].address_components[2].long_name,
                municipality: responseJson.results[2].address_components[3].long_name,
                county: responseJson.results[2].address_components[4].long_name,
                country: responseJson.results[2].address_components[5].long_name
              };
          })
    };

    _onClick = ({x, y, lat, lng, event}) => {
        let cords = {
            problem: {
              id:'',
              description: 'Made it bois',
              user: 'for yeet',
              entrepreneur: ' yeet',
            },
            lat: lat,
            lng: lng
        };
        let tempState = this.state.center;
        tempState.push(cords);
        this.setState({center: tempState });
        this.fromCordsToPlace(cords);
    };


    changeCurrent(problem){
      this.setState({current: problem})
    }
    
    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMap
                    bootstrapURLKeys={{ key:API_KEY}}
                    defaultCenter={this.state.start_cords}
                    defaultZoom={this.state.zoom}
                    onClick={this._onClick}
                >
                    {this.state.center.map((cords) => {
                        return(
                            <AnyReactComponent
                                lat={cords.lat}
                                lng={cords.lng}
                                imag={'https://darobin.github.io/breakup/specs/html-images/images/HTML5_Logo.png'}
                                problem={this.state.current.problem}
                                change={this.changeCurrent}
                            />
                        )
                    })}
                </GoogleMap>
            </div>
        );
    }
}

export default SimpleMap;


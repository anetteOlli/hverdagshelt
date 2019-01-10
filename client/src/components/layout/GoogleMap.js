import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

let imgsrc = './geotag.png';
let API_KEY = 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE';

const AnyReactComponent = ({  img_src }) => <div><img src={img_src} className="YOUR-CLASS-NAME" style={{'height':'10px', 'width':'10px'} } /></div>;


class SimpleMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            priority:'',
            center: [{
                lat: 61.5966871,
                lng: 9.769488616282388
            }],
            zoom: 17
        };
    }

    fromCordsToPlace(cords) {
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
    }
    
    _onClick = ({x, y, lat, lng, event}) => {
        console.log(x, y, lat, lng, event);
        let cords = {
            lat: lat,
            lng: lng
        };
        let tempState = this.state.center;
        tempState.push(cords);
        this.setState({center: tempState})
        this.fromCordsToPlace(cords);
    };
    
    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMap
                    bootstrapURLKeys={{ key:API_KEY}}
                    defaultCenter={this.state.center[0]}
                    defaultZoom={this.state.zoom}
                    onGoogleApiLoaded={({map, maps}) => console.log(map, maps)}
                    onClick={this._onClick}
                >
                    {this.state.center.map((cords) => {
                        return(
                            <AnyReactComponent
                                lat={cords.lat}
                                lng={cords.lng}
                                img_src={imgsrc}
                            />
                        )
                    })}
                    
                </GoogleMap>
            </div>
            
        );
    }
}

export default SimpleMap;


import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

let imgsrc = './geotag.png';
let API_KEY = 'AIzaSyC7JTJVIYcS0uL893GRfYb_sEJtdzS94VE';




const AnyReactComponent = ({  img_src }) => <div><img src={img_src} className="YOUR-CLASS-NAME" style={{'height':'10px', 'width':'10px'} } /></div>;


class SimpleMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: [{
                lat: 59.95,
                lng: 30.33
            }],
            zoom: 11
        };
    }

    fromCordsToPlace(cords) {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + cords.lat + ',' + cords.lon + '&key=' + API_KEY)
          .then((response) => response.json())
          .then((responseJson) => {
              console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
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
        console.log(this.state.center);
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


import React, { useState, useRef } from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";


const MyMapComponent = (props) => {
    const [position, setPosition] = useState({ lat: 30.3753, lng: 69.3451 });
    const myRef = useRef(null);
    const positionChanged = () => {
        setPosition({ lat: myRef.current.getPosition().lat(), lng: myRef.current.getPosition().lng() });
        props.setPosition(position);
    }

    return (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.lat, lng: props.lng }}>
            {
            props.isMarkerShown && 
               (<Marker ref={myRef} draggable onDragEnd={positionChanged} position={{ lat: position.lat, lng: position.lng }} />)
            }
        </GoogleMap>)
}
export default compose(

    withProps({
        /**
         * Note: create and replace your own key in the Google console.
         * https://console.developers.google.com/apis/dashboard
         * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
         */
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyAB4lXNMpCmn8O2uPQATOuvdtDSbTZ6cMg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `200px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap

)(MyMapComponent);
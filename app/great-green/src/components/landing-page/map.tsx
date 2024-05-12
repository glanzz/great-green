import React, { useEffect, useState } from 'react';
import { Card, CardMedia, Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";

type Props = {
    longitude: number,
    setLongitude: (v:number) => void,
    latitude: number,
    setLatitude: (v:number) => void,

}
function Maps(props: Props) {
    const {t} = useTranslation('common');
    const {longitude, setLatitude, setLongitude, latitude} = props;

    // Function to get the location
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            console.log("run")
        } else {
            console.log("Geo Location not supported by browser");
        }
    }

    // Function to retrieve the position
    function showPosition(position: { coords: { latitude: any; longitude: any; }; }) {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log(latitude)
        console.log(longitude)
    }

    useEffect(() => {
        getLocation();
    }, []); // Run only once on component mount

    return (
        <Card style={{height: '350px', width: '100%', maxWidth: "350px", padding: "20px"}}>
            <Typography style={{ fontSize:'font-size: xx-large'}}>
            {t('signup.content.location')}
            </Typography>
            <CardMedia>

            
                {latitude && longitude && (
                    <MapContainer center={[latitude, longitude]} zoom={20} style={{height: '50vh', width: '100%'}}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[latitude, longitude]}>
                            <Popup>
                                Your Current latitude {latitude} and longitude {longitude}.
                            </Popup>
                        </Marker>
                    </MapContainer>
                )}
            </CardMedia>
        </Card>
    );
}

export default Maps;

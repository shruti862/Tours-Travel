/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import "./Mapp.css";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import placeholderIcon from "../../public/placeholder.png";
import { Icon, LatLngBounds } from "leaflet";

// Create custom icon
const customIcon = new Icon({
  iconUrl: placeholderIcon,
  iconSize: [38, 38], // size of the icon
});
const MapBounds = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = new LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker.geocode));
      map.fitBounds(bounds);
    }
  }, [markers, map]);

  return null;
};
export default function Mapp({ locations }) {
  // Check if locations is defined and has at least one valid location
  const hasLocations = Array.isArray(locations) && locations.length > 0;

  // Set the default center position
  const defaultPosition = [48.8566, 2.3522]; // Default to Paris if no locations are provided

  // Determine the initial map center position
  const position = hasLocations
    ? [locations[0].coordinates[1], locations[0].coordinates[0]]
    : defaultPosition;

  // Create markers array
  const markers = [];
  if (hasLocations) {
    locations.forEach((loc) => {
      // Ensure loc.coordinates is an array with at least two elements
      if (
        loc.coordinates &&
        loc.coordinates.length >= 2 &&
        typeof loc.coordinates[0] === "number" &&
        typeof loc.coordinates[1] === "number"
      ) {
        // Create points
        markers.push({
          geocode: [loc.coordinates[1], loc.coordinates[0]], // latitude, longitude
          popUp: loc.description,
        });
      } else {
        console.error("Invalid coordinates:", loc.coordinates);
      }
    });
  }

  return (
    <div id="map">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        {/* OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds markers={markers} />
        {/* Mapping through the markers */}
        {markers.map((marker, i) => (
          <Marker position={marker.geocode} icon={customIcon} key={i}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}

        {/* Hard-coded markers (commented out) */}
        {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>This is popup 1</Popup>
        </Marker>
        <Marker position={[51.504, -0.1]} icon={customIcon}>
          <Popup>This is popup 2</Popup>
        </Marker>
        <Marker position={[51.5, -0.09]} icon={customIcon}>
          <Popup>This is popup 3</Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}

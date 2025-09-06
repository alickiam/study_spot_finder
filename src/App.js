// import React, { useEffect, useState } from "react";
// import './App.css';
// import 'leaflet/dist/leaflet.css';

// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import { Icon } from 'leaflet';

// import SearchBar from "./components/searchBar";

// function App() {
//   const [places, setPlaces] = useState([]);
//   const [searchArea, setSearchArea] = useState({
//     minLon: 10.716463143326969,
//     maxLat: 48.755151258420966,
//     maxLon: 10.835314015356737,
//     minLat: 48.680903341613316
//   });

//   const customIcon = new Icon({
//     iconUrl: require('./img/pin.png'),
//     iconSize: [38, 38]
//   });

//   useEffect(() => {
//     if (!searchArea) return;

//     const { minLon, maxLat, maxLon, minLat } = searchArea;
//     const url = `https://api.geoapify.com/v2/places?categories=catering.cafe,education.library,office.coworking&filter=rect:${minLon},${maxLat},${maxLon},${minLat}&limit=20&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`;

//     fetch(url)
//       .then(response => response.json())
//       .then(result => {
//         if (result.features) {
//           setPlaces(result.features);
//         }
//       })
//       .catch(error => console.log('error', error));
//   }, [searchArea]);

//   const RecenterMap = ({ places }) => {
//     const map = useMap();

//     useEffect(() => {
//       if (places.length > 0) {
//         const bounds = places.map(p => [
//           p.geometry.coordinates[1], // lat
//           p.geometry.coordinates[0]  // lon
//         ]);
//         map.fitBounds(bounds);
//       }
//     }, [places, map]);

//     return null;
//   };

//   return (
//     <div>
//       <SearchBar onSearch={setSearchArea} />
//       <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "90vh", width: "100%" }}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
//         />

//         {places.map((place, index) => (
//           <Marker
//             key={index}
//             position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]}
//             icon={customIcon}
//           >
//             <Popup>
//               {place.properties.name || "Unnamed café"} <br />
//               {/* {place.properties.address_line1} <br /> */}
//               {place.properties.address_line2}
//             </Popup>
//           </Marker>
//         ))}

//         <RecenterMap places={places} />
//       </MapContainer>
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';

import CitySearchBar from "./components/CitySearchBar";

function App() {
  const [places, setPlaces] = useState([]);
  const [searchArea, setSearchArea] = useState(null);

  const customIcon = new Icon({
    iconUrl: require('./img/pin.png'),
    iconSize: [38, 38]
  });

  useEffect(() => {


    if (!searchArea) return;

    const { minLon, maxLat, maxLon, minLat } = searchArea;
    console.log("Rect bounds:", minLon, minLat, maxLon, maxLat);
    const rectValue = `rect:${minLon},${minLat},${maxLon},${maxLat}`;
    const url = `https://api.geoapify.com/v2/places?categories=catering.cafe,education.library,office.coworking&filter=${rectValue}&limit=20&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`;

    // const url = `https://api.geoapify.com/v2/places?categories=catering.cafe,building.library,office.coworking&filter=rect:${minLon},${minLat},${maxLon},${maxLat}&limit=20&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (result.features) {
          setPlaces(result.features);
        }
      })
      .catch(error => console.log('error', error));
  }, [searchArea]);

  const RecenterMap = ({ places }) => {
    const map = useMap();

    useEffect(() => {
      if (places.length > 0) {
        const bounds = places.map(p => [
          p.geometry.coordinates[1],
          p.geometry.coordinates[0]
        ]);
        map.fitBounds(bounds);
      }
    }, [places, map]);

    return null;
  };

  return (
    <div>
      <CitySearchBar onSearch={setSearchArea} />
      <MapContainer center={[43.7, -79.4]} zoom={12} style={{ height: "90vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {places.map((place, index) => (
          <Marker
            key={index}
            position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]}
            icon={customIcon}
          >
            <Popup>
              {place.properties.name || "Unnamed place"} <br />
              {/* {place.properties.address_line1} <br /> */}
              {place.properties.address_line2}
            </Popup>
          </Marker>
        ))}

        <RecenterMap places={places} />
      </MapContainer>
    </div>
  );
}

export default App;

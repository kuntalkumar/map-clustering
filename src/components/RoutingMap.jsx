import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "leaflet-routing-machine"; // Import the routing machine
import "leaflet-control-geocoder"; // Import geocoding control for address lookup

const locations = [
    {
      lat: 12.989380979635508,
      lng: 77.5929541095342,
      place: "Kelsa office",
      url: "https://kelsa.io/",
    },
    {
      lat: 12.991098115325512,
      lng: 77.61311887293854,
      place: "Mirlay Eye Care, a unit of Dr Agarwals Eye Hospital",
      url: "https://www.dragarwal.com/eye-hospital/shivaji-nagar/?utm_source=locator&utm_medium=googleplaces",
    },
    {
      lat: 12.983613811087848,
      lng: 77.60436813342845,
      place: "Bowring and Lady Curzon Hospital",
      url: "https://sabvmcri.karnataka.gov.in/",
    },
  
    {
      lat: 12.991415282640071,
      lng: 77.5640441366946,
      place: "Bandi Reddy Circle",
      url: "https://www.google.com/maps/dir/12.9826816,77.594624/Bandi+Reddy+Circle,+6th+Cross+Rd,+Bashyam+Nagar,+Lakshminarayanapuram,+Rajajinagar,+Bengaluru,+Karnataka+560021/@12.9878197,77.5587334,6463m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bae1620f6de2f7d:0x11aaaf41b2f5dbdd!2m2!1d77.564042!2d12.991408?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      lat: 12.990698247152652,
      lng: 77.56652672152927,
      place: "Majestic",
      url: "https://www.google.com/maps/place/Majestic+Bus+Stand/@12.9765535,77.5672927,808m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bae1611e769cde7:0x894619e9bd80d061!8m2!3d12.9765483!4d77.5721636!16s%2Fg%2F11dylxbm74?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      lat: 12.987289830433157,
      lng: 77.56761920734118,
      place: "Bashyam Nagara Okalipuram",
      url: "https://maps.app.goo.gl/af9djwPMNTBUt5TQ9",
    },
    {
      lat: 12.98342640302932,
      lng: 77.56265737793792,
      place: "Sujatha Talkies",
      url: "https://maps.app.goo.gl/kgBB3vJp5yVMVVRT7",
    },
  
    {
      lat: 12.99053628083106,
      lng: 77.57080041893998,
      place: "Sampige Road",
      url: "https://maps.app.goo.gl/vdv8kVDyRmBVqFz2A",
    },
    {
      lat: 12.98366002640793,
      lng: 77.59758647607285,
      place: "Cubbon Park",
      url: "https://maps.app.goo.gl/EhKELozin3gJw9br8",
    },
    {
      lat: 12.9824890778253,
      lng: 77.59226494324332,
      place: "Dr. B.R. Ambedkar Station Vidhana Soudha",
      url: "https://maps.app.goo.gl/TCrdrZ7dfHNefZeC9",
    },
    {
      lat: 12.976968991105917,
      lng: 77.58333855199177,
      place: "Sir M. Visveshwaraya Station, Central College",
      url: "https://maps.app.goo.gl/FWT9gaCcJZyTVxbp8",
    },
    {
      lat: 12.978809033632464,
      lng: 77.564970785378,
      place: "Krantivira Sangolli Rayanna-Railway Station",
      url: "https://maps.app.goo.gl/yuUsiiKRbBLXqALi7",
    },
    {
      lat: 12.962248160807883,
      lng: 77.57492714485089,
      place: "Krishna Rajendra Market",
      url: "https://maps.app.goo.gl/3K5ne5i9fWtuW8JS6",
    },
  ];
  

const img = "https://www.svgrepo.com/show/513317/location-pin.svg";

const MiniMap = () => {
  const mapRef = useRef(null);
  const minimapRef = useRef(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const routingControlRef = useRef(null); 
  const [distance, setDistance] = useState(null);
  const [showSelectionModal, setShowSelectionModal] = useState(false);

  useEffect(() => {
    if (mapRef.current !== null) return;

    mapRef.current = L.map("mainMap").setView(
      [12.989380979635508, 77.5929541095342],
      12
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
    }).addTo(mapRef.current);

    const customIcon = L.icon({
      iconUrl: img,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    const markers = L.markerClusterGroup();

    locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: customIcon,
      })
        .bindPopup(location.place)
        .on("click", () => handleMarkerClick(location));
      markers.addLayer(marker);
    });

    mapRef.current.addLayer(markers);

    if (minimapRef.current === null) {
      minimapRef.current = L.map("minimap", {
        center: mapRef.current.getCenter(),
        zoom: mapRef.current.getZoom() - 2,
        dragging: true,
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
      }).addTo(minimapRef.current);

      mapRef.current.on("move", () => {
        minimapRef.current.setView(mapRef.current.getCenter(), minimapRef.current.getZoom() - 2);
      });

      minimapRef.current.on("click", (e) => {
        mapRef.current.setView(e.latlng, mapRef.current.getZoom());
      });
    }

  }, []);

  const handleMarkerClick = (location) => {
    console.log(location.place);
  };

  const openSelectionModal = () => {
    setShowSelectionModal(true);
  };

  const closeSelectionModal = () => {
    setShowSelectionModal(false);
  };

  const handleSelection = (source, destination) => {
    setStartPoint(source);
    setEndPoint(destination);
    closeSelectionModal();
    calculateRoute(destination, source);
  };

  const calculateRoute = (destination, origin) => {
    if (routingControlRef.current) {
      routingControlRef.current.remove();
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(origin.lat, origin.lng),
        L.latLng(destination.lat, destination.lng), 
      ],
      lineOptions: {
        styles: [{ color: "#b7eb0e", weight: 4 }],
      },
      createMarker: () => null, 
      routeWhileDragging: true,
    }).addTo(mapRef.current);

    routingControlRef.current.on("routesfound", (e) => {
      const routes = e.routes;
      const summary = routes[0].summary;
      const totalDistance = summary.totalDistance / 1000;
      setDistance(totalDistance);
    });
  };

  return (
    <div>
      <h2 style={{ display: "flex", justifyContent: "center" }}>Map with Dynamic Routing</h2>


      {distance !== null && (
        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "18px" }}>
          <strong>Distance: {distance.toFixed(2)} km</strong>
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={openSelectionModal}>Select Route Points</button>
      </div>

      {showSelectionModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>Select Source and Destination</h3>
            <div>
              <label>Source:</label>
              <select onChange={(e) => setStartPoint(locations[e.target.value])}>
                <option value="">Select Source</option>
                {locations.map((location, index) => (
                  <option key={index} value={index}>
                    {location.place}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Destination:</label>
              <select onChange={(e) => setEndPoint(locations[e.target.value])}>
                <option value="">Select Destination</option>
                {locations.map((location, index) => (
                  <option key={index} value={index}>
                    {location.place}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={() => handleSelection(startPoint, endPoint)} disabled={!startPoint || !endPoint}>
              Calculate Route
            </button>
            <button onClick={closeSelectionModal}>Close</button>
          </div>
        </div>
      )}
      <div style={{ position: "relative" }}>
        {/* Main Map */}
        <div id="mainMap" style={{ height: "80vh", width: "100%" }}></div>
        {/* Minimap */}
        <div
          id="minimap"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            height: "150px",
            width: "150px",
            border: "2px solid black",
            zIndex: 1000,
          }}
        ></div>
      </div>
    
    </div>
  );
};

// Modal styles
const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalContentStyles = {
  background: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

export default MiniMap;

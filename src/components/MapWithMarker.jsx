import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

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
const MapWithMarkers = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current !== null) return;

    mapRef.current = L.map("map").setView(
      [12.989380979635508, 77.5929541095342],
      3
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 25,
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
        .on("click", () => {
          window.open(location.url);
        });
      markers.addLayer(marker);
    });

    mapRef.current.addLayer(markers);
  }, []);

  return (
    <div>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Map for kelsa office
      </h2>
      <div id="map" style={{ height: "620px", width: "100%" }}></div>;
    </div>
  );
};

export default MapWithMarkers;

# React Leaflet Map Integration Project

## Overview
This project demonstrates how to integrate **Leaflet**, an open-source library for interactive maps, into both **plain HTML/CSS/JavaScript** applications and **React** applications. Leaflet is an excellent alternative to Google Maps API, especially when you want to avoid billing complexities and prefer a lightweight, customizable map solution.

## Features
- **Leaflet Integration**: Incorporates the Leaflet library to display interactive maps.
- **Marker Clustering**: Demonstrates how to cluster markers to enhance map performance and clarity.
- **React-Leaflet Setup**: Shows how to implement Leaflet maps in a React environment using the React-Leaflet library.

## Getting Started

### 1. Using Leaflet in Plain HTML/CSS/JavaScript

To integrate Leaflet into a non-React project, follow these steps:

1. **Include Leaflet’s CSS and JS files in your HTML:**
   ```html
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
   <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>

2. **Set up a map container in your HTML:**

```html
<div id="map" style="height: 400px;"></div>
```


3. **Initialize your map with JavaScript:**

```js
const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const marker = L.marker([51.505, -0.09]).addTo(map);
marker.bindPopup('Hello, Leaflet!').openPopup();
```

### 2. Using Leaflet in React with React-Leaflet

To integrate Leaflet into a React project:

1. **Install the necessary packages:**

    ```bash
    npm install react-leaflet leaflet
    ```
2. **Import Leaflet’s CSS in your index.js or App.js:**

```React
import 'leaflet/dist/leaflet.css';
```
3. **Create a React component for the map:**

```React
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MyMap = () => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    I am a popup marker!
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MyMap;
```
### 3. Marker Clustering in React
For projects with multiple markers, clustering helps keep the map clear and optimized. Here’s how to add clustering to your React-Leaflet map:

1. **Install the MarkerCluster plugin:**

```
npm install react-leaflet-markercluster
```

2. **Use MarkerClusterGroup to group markers:**
```import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

const ClusteredMap = () => {
    const markers = [
        { id: 1, position: [51.505, -0.09] },
        { id: 2, position: [51.515, -0.1] },
        { id: 3, position: [51.525, -0.08] }
    ];

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            <MarkerClusterGroup>
                {markers.map(marker => (
                    <Marker key={marker.id} position={marker.position}>
                        <Popup>Marker {marker.id}</Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default ClusteredMap;
```



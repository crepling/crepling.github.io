//define access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiMjcxNDQ0OGUiLCJhIjoiY2t6eTY3OHZ0MDhraDJ2cXV1MjVuazR1NCJ9.9kyXetlE7BtxHCDXl-VADA";

//create map
const map = new mapboxgl.Map({
  container: "map",
  
//default coordinates and zoom level  
  style: "mapbox://styles/2714448e/cl0hygien003515ql29t989ip",
  center: [-105.574, 38.983], 
  zoom: 6.15
});

//create pointer style cursor
map.on("load", () => {
  map.getCanvas().style.cursor = "pointer";
});


//create scale bar and define settings
const scale = new mapboxgl.ScaleControl({
  maxWidth: 200,
  unit: "imperial"
});
map.addControl(scale,"bottom-right");



//create navigation features
map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

//create geolocation tool
map.addControl(new mapboxgl.GeolocateControl(), "top-right");

//create popup
const popup = new mapboxgl.Popup({ offset: [0, 10], className: "my-popup" })

//establish mouseover function for popups
map.on("mouseover", "2020-roadkill-points", (event) => {
    const features = map.queryRenderedFeatures(event.point, {layers: ["2020-roadkill-points"],
    });
    
  if (!features.length) {
    return;
  }
  
  const feature = features[0];

  //establish zoom threshold for popups, popup heading and paragraph information 
if(map.getZoom()>10){
    popup.setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>Roadkill Incident</h3> 
  <p>Species: ${feature.properties.Species}</p>
  <p>Month: ${feature.properties.Month_}</p>
  <p>Day: ${feature.properties.Day_}</p>
  <p>Highway: ${feature.properties.Hwy}</p>
  <p>Milemarker: ${feature.properties.MP}</p>`
    )
    .addTo(map);
}
});
//close popups when cursor leaves point circle
map.on("mouseleave", "2020-roadkill-points", (event)=>{
       popup.remove()
       });
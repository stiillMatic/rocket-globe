export const PASADENA = { lat: 34.1478, lng: -118.1445 };

export const LAUNCH_SITES = [
  { name: "Vandenberg SFB", country: "USA", lat: 34.7420, lng: -120.5724, highlight: true },
  { name: "Cape Canaveral", country: "USA", lat: 28.4889, lng: -80.5778 },
  { name: "Kennedy Space Center", country: "USA", lat: 28.5729, lng: -80.6490 },
  { name: "Baikonur Cosmodrome", country: "Kazakhstan", lat: 45.9650, lng: 63.3050 },
  { name: "Wenchang", country: "China", lat: 19.6144, lng: 110.9511 },
  { name: "Kourou", country: "French Guiana", lat: 5.2360, lng: -52.7750 },
    { name: "Tanegashima", country: "Japan", lat: 30.4000, lng: 130.9700 },
    { name: "Satish Dhawan", country: "India", lat: 13.7199, lng: 80.2304 },
{ name: "Plesetsk", country: "Russia", lat: 62.9574, lng: 40.5748 },
{ name: "Rocket Lab LC-1", country: "New Zealand", lat: -39.2622, lng: 177.8647 },
];

export const VANDENBERG_TO_PASADENA = [{
  startLat: 34.7420,
  startLng: -120.5724,
  endLat: PASADENA.lat,
  endLng: PASADENA.lng,
  color: ["#00d9ff", "#00d9ff"],
}];
# Rocket Watch PCC

> See tonight's rocket launch — from campus.

An interactive landing page that turns tonight's Vandenberg launch into something you can walk outside and see. Real-time countdown, compass bearing from Pasadena, and a 3D globe showing every major launch site on Earth.

Built in 12 hours at **[LancerHacks 1.0](https://lancerhacks1-0.devpost.com/)** — Pasadena City College, October 30 2026.

---

## The problem

Most LA students have no idea they can actually see rocket launches from campus. Launch schedules exist on NASA and SpaceX sites, but nobody translates *"liftoff at 9:02 PM from Vandenberg"* into *"step outside, look west-northwest, 15° above the horizon."* We did.

## What it does

- Real-time countdown to the next Vandenberg launch (Launch Library 2 API)
- 3D interactive globe with 10 major launch sites marked worldwide
- Vandenberg → Pasadena sight-line visualized as an animated arc
- Scroll-triggered camera animation — zooms from a close view of Vandenberg out to a full-earth perspective
- SpaceX-inspired HUD aesthetic with real NASA satellite imagery as the globe texture

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + Vite |
| 3D rendering | `react-globe.gl` (Three.js) |
| Launch data | [Launch Library 2](https://ll.thespacedevs.com/) by The Space Devs |
| Earth texture | NASA GIBS — MODIS Terra true-color composite |
| Typography | Orbitron (display) · Space Grotesk (body) · JetBrains Mono (HUD) |

## Run locally

**Prereq**: Node.js 18+ ([nodejs.org](https://nodejs.org))

```bash
git clone https://github.com/stiillMatic/rocket-globe.git
cd rocket-globe
npm install
npm run dev
```

Open http://localhost:5173/

**Note on the earth texture**: `public/earth-8k.jpg` is included in the repo. If you want a fresher NASA snapshot:

```bash
cd public
curl -L -o earth-8k.jpg "https://wvs.earthdata.nasa.gov/api/v1/snapshot?REQUEST=GetSnapshot&TIME=2026-10-27&BBOX=-90,-180,90,180&CRS=EPSG:4326&LAYERS=MODIS_Terra_CorrectedReflectance_TrueColor&FORMAT=image/jpeg&WIDTH=4096&HEIGHT=2048"
```

## Project structure

```
rocket-globe/
├── public/
│   └── earth-8k.jpg          # NASA satellite composite
├── src/
│   ├── App.jsx               # Scroll-triggered two-stage layout
│   ├── components/
│   │   ├── GlobeBackground/
│   │   │   ├── GlobeBackground.jsx   # 3D globe + camera animation
│   │   │   ├── launchSites.js        # Launch site coordinates
│   │   │   └── globe.css
│   │   └── Stars/
│   │       └── Stars.jsx             # Canvas-based starfield
│   └── main.jsx
├── index.html                # Google Fonts loaded here
└── vite.config.js
```

## Challenges we ran into

- **Globe texture resolution** — initial 2K texture looked blurry at close camera distances; swapped to a 4K NASA GIBS composite and pulled the camera back a touch.
- **Scroll animation glitching** — a 100ms camera transition was being interrupted on every scroll frame. Switched to CSS-style discrete stages (near / far) with a single 1.2s eased transition on crossing a scroll threshold.
- **Label collision on the globe** — HUD labels for nearby sites (Vandenberg + Pasadena are only 235 km apart) overlapped. Solved with manual per-label offsets and a `row-reverse` flex trick for left-side labels.

## What's next

- Push notifications when a launch is imminent
- Phone AR mode — overlay the bearing arrow on the camera view
- Support for East Coast campuses (Cape Canaveral viewing)
- Integration with the main Streamlit app (compass + live stream)

## Team

- *(Kewei Chen, Alex Aung, Zane Kantar, Patrick Marqueses, Ahmed Dhia)*

## Built at

[**LancerHacks 1.0**](https://lancerhacks1-0.devpost.com/) · Pasadena City College · October 30 2026 · Hosted by She.Codes, STEM Competition Society, AI Club, Data Science Club, and B.E.T. Club.

## License

MIT
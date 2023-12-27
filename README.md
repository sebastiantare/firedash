# MVP firedash
Chilean Fires Dashboard is an application to see real-time wildfires and forecast places that have the highest likelihood of fire.

## Clone

```
git clone https://github.com/sebastiantare/firedash.git
```

## Setup

You need to create a app/secret.js file with the following data:

```
export const mapboxStyleUrl = 'mapbox://styles/sebastiantare/clqk4x12t00fo01qu0wdw0860';
export const mapboxAccessToken = 'your_mapbox_token';
```

## Install

```
cd firedash/app
npm install
```

## Dev

```
npm run dev
```

## Build

```
npm run build
```

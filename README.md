# react-geolocation-hook

A React hook to track / get the user's geolocation with loading and error handling

## Installation

```bash
npm install react-geolocation-hook
```

## Usage

```js
import { useGeolocation } from 'use-geolocation-hook';

const MyGeolocationComponent = () => {
  const { coordinates, isLoading, error } = useGeolocation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Coordinates: {coordinates[0]}, {coordinates[1]}</div>;
};
```

## API
```js
const { coordinates, error, isLoading, isSuccess, isFetched } = useGeolocation();
```
Returns an object with the following properties
- ```coordinates: [number, number] | null```: The latitude and longitude of the user's current position, or null if not available.
- ```error: string | null```: Any error encountered while fetching the geolocation, or null if no error occurred
- ```isLoading: boolean```: Whether the geolocation request is in progress.
- ```isSuccess: boolean```: Whether the geolocation request is resolved.
- ```isFetched: boolean```: Whether the geolocation request is complete, can be resolved or rejected.

## Options
```js
const geoLocation = useGeolocation({
  watchPosition: true,
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
})
```
An optional object including the following parameters:
- ```maximumAge (optional)```: A positive long value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device must return a cached position regardless of its age. Default: 0.
- ```timeout (optional)```: A positive long value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. The default value is Infinity, meaning that getCurrentPosition() won't return until the position is available.
- ```enableHighAccuracy (optional)```: A boolean value that indicates the application would like to receive the best possible results. If true and if the device is able to provide a more accurate position, it will do so. Note that this can result in slower response times or increased power consumption (with a GPS chip on a mobile device for example). On the other hand, if false, the device can take the liberty to save resources by responding more quickly and/or using less power. Default: false.
- ```watchPosition (optional)```: Updates coordinates automatically each time the position of the device changes.
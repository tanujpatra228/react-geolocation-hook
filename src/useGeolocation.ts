"use strict"
"use client"
import { useState, useEffect, useRef } from 'react';

type LatLngTuple = [number, number];

/**
 * Get the geo coordinates of user using javascript navigator API
 * @returns {Object} GeoLocationStateType - coordinates, error, isLoading, isSuccess, isFetched
 */
export function useGeolocation(options?: GeolocationOptions): GeoLocationStateType {
    const [geoLocationState, setGeoLocationState] = useState<GeoLocationStateType>({
        coordinates: null,
        error: null,
        isLoading: true,
        isSuccess: false,
        isFetched: false,
    });
    const watchId = useRef<number>(0);

    function handlePositionSuccess(position: GeolocationPosition) {
        setGeoLocationState({
            coordinates: [position.coords.latitude, position.coords.longitude],
            error: null,
            isLoading: false,
            isSuccess: true,
            isFetched: true,
        });
    }
    function handlePositionError(err: GeolocationPositionError) {
        setGeoLocationState({
            coordinates: null,
            error: err.message,
            isLoading: false,
            isSuccess: false,
            isFetched: true,
        });
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setGeoLocationState({
                coordinates: null,
                error: "Geolocation is not supported by this browser.",
                isLoading: false,
                isSuccess: false,
                isFetched: true,
            });
            return;
        }

        if (options?.watchPosition) {
            watchId.current = navigator.geolocation.watchPosition(handlePositionSuccess, handlePositionError, options);
        } else {
            navigator.geolocation.getCurrentPosition(handlePositionSuccess, handlePositionError, options);
        }

        return () => {
            if (options?.watchPosition && watchId.current) {
                navigator.geolocation.clearWatch(watchId.current);
            }
        };
    }, []);

    return geoLocationState;
}

type GeoLocationStateType = {
    coordinates: LatLngTuple | null,
    error: string | null,
    isLoading: boolean,
    isSuccess: boolean,
    isFetched: boolean,
}

type GeolocationOptions = {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
    watchPosition?: boolean;
}
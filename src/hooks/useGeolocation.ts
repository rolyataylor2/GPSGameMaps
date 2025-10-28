import { useEffect, useState } from 'react';

interface GeoState {
  coords: { lat: number; lng: number } | null;
  loading: boolean;
  error?: string;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ coords: null, loading: true });

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setState({ coords: null, loading: false, error: 'Geolocation unavailable' });
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setState({
        coords: { lat: position.coords.latitude, lng: position.coords.longitude },
        loading: false,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setState({
        coords: null,
        loading: false,
        error: error.message,
      });
    };

    const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      maximumAge: 10_000,
      timeout: 20_000,
    });

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return state;
}

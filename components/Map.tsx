import { icons } from '@/constants';
import { calculateRegion } from '@/lib/map';
import { useDriverStore, useLocationStore } from '@/store';
import { MarkerData } from '@/types/type';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const drivers = [
    {
        "id": "1",
        "first_name": "James",
        "last_name": "Wilson",
        "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
        "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
        "car_seats": 4,
        "rating": "4.80"
    },
    {
        "id": "2",
        "first_name": "David",
        "last_name": "Brown",
        "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
        "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        "car_seats": 5,
        "rating": "4.60"
    },
    {
        "id": "3",
        "first_name": "Michael",
        "last_name": "Johnson",
        "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
        "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
        "car_seats": 4,
        "rating": "4.70"
    },
    {
        "id": "4",
        "first_name": "Robert",
        "last_name": "Green",
        "profile_image_url": "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
        "car_image_url": "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
        "car_seats": 4,
        "rating": "4.90"
    }
]

const Map = () => {
    const {
        userLongitude, 
        userLatitude, 
        destinationLatitude, 
        destinationLongitude
    } = useLocationStore();

    const { selectedDriver, setDrivers, drivers: storeDrivers } = useDriverStore();

    // Initialize markers from store or empty array
    const [markers, setMarkers] = useState<MarkerData[]>(storeDrivers || []);

    // Handle initial driver data setup
    useEffect(() => {
        const defaultLat = 28.6139;
        const defaultLng = 77.2090;
        
        const currentLat = userLatitude || defaultLat;
        const currentLng = userLongitude || defaultLng;

        // Make sure drivers array exists
        if (!drivers || !Array.isArray(drivers)) return;

        try {
            const formattedDrivers = drivers.map(driver => ({
                id: parseInt(driver.id),  // Use id instead of driver_id to match MarkerData
                first_name: driver.first_name,
                last_name: driver.last_name,
                profile_image_url: driver.profile_image_url,
                car_image_url: driver.car_image_url,
                car_seats: driver.car_seats,
                rating: parseFloat(driver.rating),
                latitude: currentLat + (Math.random() - 0.5) * 0.01,
                longitude: currentLng + (Math.random() - 0.5) * 0.01,
                title: `${driver.first_name} ${driver.last_name}`
            }));

            setDrivers(formattedDrivers);
            setMarkers(formattedDrivers);
        } catch (error) {
            console.error('Error formatting drivers:', error);
            setMarkers([]);
            setDrivers([]);
        }
    }, [userLatitude, userLongitude, setDrivers]);

    const region = calculateRegion({
        userLongitude: userLongitude || 77.2090,
        userLatitude: userLatitude || 28.6139,
        destinationLatitude,
        destinationLongitude
    })

    console.log(region, 'REGIONS+948')

    return (
        <MapView 
        provider={PROVIDER_GOOGLE} 
        className='w-full h-full rounded-2xl'
        tintColor='black'
        mapType={Platform.OS === 'ios' ? 'mutedStandard' : 'standard'}
        showsPointsOfInterest={false}
        initialRegion={region}
        showsUserLocation={true}
        userInterfaceStyle='light'
        >
            {Array.isArray(markers) && markers.map((marker) => {
                if (!marker || !marker.latitude || !marker.longitude) return null;
                return (
                    <Marker 
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                        title={`${marker.first_name} ${marker.last_name}`}
                        image={
                            selectedDriver === marker.id ?
                            icons.selectedMarker : 
                            icons.marker
                        }
                    />
                );
            })}
        </MapView>
    );
}

export default Map;

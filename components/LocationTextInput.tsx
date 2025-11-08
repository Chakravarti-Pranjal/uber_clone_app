import { icons } from '@/constants';
import { GoogleInputProps } from '@/types/type';
import debounce from 'lodash/debounce';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MAPBOX_API_KEY = process.env.EXPO_PUBLIC_MAPBOX_API_KEY || 'YOUR_MAPBOX_API_KEY';

interface Suggestion {
    place_name: string;
    center: [number, number];
}

const LocationTextInput = ({
    icon, 
    initialLocation, 
    containerStyle, 
    textInputBackgroundColor, 
    handlePress
}: GoogleInputProps) => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchPlaces = async (query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    query
                )}.json?access_token=${MAPBOX_API_KEY}&limit=5`
            );
            const data = await response.json();
            setSuggestions(data.features || []);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };

    const debouncedSearch = useCallback(
        debounce((text: string) => {
            searchPlaces(text);
        }, 300),
        []
    );

    const handleTextChange = (text: string) => {
        setSearchText(text);
        setShowSuggestions(true);
        debouncedSearch(text);
    };

    const handleSuggestionPress = (suggestion: Suggestion) => {
        const [longitude, latitude] = suggestion.center;
        handlePress({
            latitude,
            longitude,
            address: suggestion.place_name,
        });
        setSearchText(suggestion.place_name);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    return (
        <View className={`flex flex-col relative z-50 ${containerStyle}`}>
            <View className="flex-row items-center bg-white rounded-xl px-4 py-2">
                <View className="justify-center items-center w-6 h-6 mr-2">
                    <Image 
                        source={icon ? icon : icons.search} 
                        className="w-6 h-6"
                        resizeMode="contain"
                    />
                </View>
                <TextInput
                    value={searchText}
                    onChangeText={handleTextChange}
                    placeholder={initialLocation ?? "Where do you want to go?"}
                    placeholderTextColor="grey"
                    className="flex-1 text-base font-semibold"
                    style={{
                        backgroundColor: textInputBackgroundColor || 'white',
                    }}
                />
            </View>
            
            {showSuggestions && suggestions.length > 0 && (
                <ScrollView 
                    className="absolute top-16 w-full bg-white rounded-xl shadow-lg max-h-64 z-50"
                    keyboardShouldPersistTaps="always"
                >
                    {suggestions.map((suggestion, index) => (
                        <TouchableOpacity
                            key={index}
                            className="p-4 border-b border-gray-100"
                            onPress={() => handleSuggestionPress(suggestion)}
                        >
                            <Text className="text-gray-800">{suggestion.place_name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default LocationTextInput;
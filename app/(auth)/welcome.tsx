import CustomButton from '@/components/CustomButton';
import { onboarding } from '@/constants';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0)
    const isLastSlice = activeIndex === onboarding.length - 1;

    return (
        <SafeAreaView className='flex-1 h-full items-center justify-between bg-white'>
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(auth)/sign-up")
                }}
                className='w-full flex justify-end items-end p-3'
            >
                <Text className='text-black text-md font-JakartaBold'>Skip</Text>
            </TouchableOpacity>

                <Swiper ref={swiperRef}
                loop={false}
                dot={<View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />}
                activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286ff]" />}
                onIndexChanged={(index) => setActiveIndex(index)}
                >
                    {onboarding.map((item) => (
                        <View key={item.id} className="flex items-center justify-center p-5">
                            <Image source={item?.image} className="w-full h-[400px]" resizeMode="contain" />
                            
                            <View className='flex flex-row items-center justify-center w-full mt-10'>
                                <Text className='text-black text-3xl font-bold mx-11 text-center'>{item?.title}</Text>
                            </View>
                            <Text className='text-lg font-JakartaSemiBold text-center text-[#858585] mx-8 mt-5'>{item?.description}</Text>
                        </View>
                    ))}
                </Swiper>

            <CustomButton 
                title={isLastSlice ? "Get Started" : "Next"} className="w-10/12 my-10 "
                onPress={() => isLastSlice ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)}
            />
        </SafeAreaView>
    );
}


export default Onboarding;

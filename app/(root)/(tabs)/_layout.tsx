import { icons } from "@/constants"
import { Tabs } from "expo-router"
import { Image, View } from "react-native"

const TabIcon = ({focused, source}) => (
    <View className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300": ""}`}>
        <View className={`rounded-full items-center justify-center w-12 h-12 ${focused ? 'bg-general-400': ""}`}>
            <Image source={source} tintColor="white" resizeMode="contain" className="w-7 h-7" />
        </View>
    </View>
)

const TabLayout = () => {
    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor :"white",
                tabBarInactiveTintColor: "white", 
                tabBarShowLabel: false,
                tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#333333',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 25,
                height: 70,
                paddingBottom: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderTopWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 6,
                }
            }}
        >
            <Tabs.Screen 
                name='home'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} source={icons.home} />
                }}
            />

            <Tabs.Screen 
                name='rides'
                options={{
                    title: 'Rides',
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} source={icons.list} />
                }}
            />

            <Tabs.Screen 
                name='chat'
                options={{
                    title: 'Chat',
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} source={icons.chat} />
                }}
            />

            <Tabs.Screen 
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} source={icons.profile} />
                }}
            />

        </Tabs>
    )
}

export default TabLayout;
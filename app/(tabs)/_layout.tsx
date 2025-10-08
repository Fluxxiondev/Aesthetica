import { Tabs } from "expo-router";
import CustomTabBar from "../../components/CustomTabBar";
import { palette } from "../../theme";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                animation: 'shift',
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: palette.tabIconActive,
                tabBarInactiveTintColor: palette.tabIconInactive,

            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                }}
            />
            <Tabs.Screen
                name="upload"
                options={{
                    title: "Upload",

                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Favorites",

                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",

                }}
            />
        </Tabs >
    );
}

import { Tabs, useRouter } from "expo-router";
import { useEffect } from 'react';
import CustomTabBar from "../../components/CustomTabBar";
import { useAppSelector } from '../../store/hooks';
import { palette } from "../../theme";

export default function TabsLayout() {
    const router = useRouter();
    const { user } = useAppSelector(s => s.auth);
        useEffect(() => {
        if (!user) {
            router.replace({ pathname: '/(auth)/login' } as any);
        }
    }, [user]);

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

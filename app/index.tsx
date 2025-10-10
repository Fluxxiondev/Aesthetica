import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { useAppSelector } from '../store/hooks';
import { NavigationDarkTheme } from "../theme";

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAppSelector(s => s.auth);
  useEffect(() => {
    if (loading) return; // wait for restore
    if (user) router.replace('/(tabs)');
    else router.replace('/(auth)/login');
  }, [user, loading]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: NavigationDarkTheme.colors.background }}>
      <ActivityIndicator />
    </View>
  );
}

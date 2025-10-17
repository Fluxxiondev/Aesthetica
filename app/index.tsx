import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { useAppSelector } from '../store/hooks';
import { NavigationDarkTheme } from "../theme";

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAppSelector(s => s.auth);
  const [checkedOnboarding, setCheckedOnboarding] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem('hasSeenOnboarding');
        setHasSeenOnboarding(v === 'true');
      } finally {
        setCheckedOnboarding(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!checkedOnboarding || loading) return;
    if (user) {
      router.replace('/(tabs)');
      return;
    }
    if (!hasSeenOnboarding) {
      router.replace('/onboarding');
    } else {
      router.replace('/(auth)/login');
    }
  }, [user, loading, checkedOnboarding, hasSeenOnboarding]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: NavigationDarkTheme.colors.background }}>
      <ActivityIndicator />
    </View>
  );
}

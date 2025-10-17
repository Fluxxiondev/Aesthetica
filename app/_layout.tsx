import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import "../global.css";
import supabase from '../lib/supabaseClient';
import { getSessionService } from '../services/authService';
import store from '../store';
import { setUser } from '../store/authSlice';
import { NavigationDarkTheme } from "../theme";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const data = await getSessionService();
        const u = data?.session?.user;
        store.dispatch(setUser(u ? { id: u.id, email: u.email } : null));
      } finally {
        setReady(true);
      }
    })();
  }, []);

  // Keep Redux in sync with Supabase auth events
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user;
      store.dispatch(setUser(u ? { id: u.id, email: u.email } : null));
    });
    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  if (!ready) {
    return (

        <SafeAreaProvider>
          <ThemeProvider value={NavigationDarkTheme}>
            <StatusBar style="light" />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: NavigationDarkTheme.colors.background }}>
              <ActivityIndicator />
            </View>
          </ThemeProvider>
        </SafeAreaProvider>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider value={NavigationDarkTheme}>
          <StatusBar style="light" />
          <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

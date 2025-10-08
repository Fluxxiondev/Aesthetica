 import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { NavigationDarkTheme } from "../theme";

 export default function RootLayout() {
   return (
     <SafeAreaProvider>
       <ThemeProvider value={NavigationDarkTheme}>
         <StatusBar style="light" />
         <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         </Stack>
       </ThemeProvider>
     </SafeAreaProvider>
   );
 }

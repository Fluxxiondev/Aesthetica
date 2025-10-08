import React from "react";
import { Text, View } from "react-native";
import { palette } from "../../theme";

export default function HomeScreen() {
  return (
    <View
      style={{ flex: 1, backgroundColor: palette.background }}
      className="items-center justify-center"
    >
      <Text className="text-2xl font-semibold" style={{ color: palette.text }}>
        Aesthetica
      </Text>
      <Text className="mt-2" style={{ color: palette.textSecondary }}>
        Crafted wallpapers and design shots
      </Text>
    </View>
  );
}

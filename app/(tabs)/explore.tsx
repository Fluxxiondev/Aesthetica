import React from "react";
import { View, Text } from "react-native";
import { palette } from "../../theme";

export default function ExploreScreen() {
  return (
    <View
      style={{ flex: 1, backgroundColor: palette.background }}
      className="items-center justify-center"
    >
      <Text className="text-xl font-semibold" style={{ color: palette.text }}>
        Explore
      </Text>
      <Text className="mt-2" style={{ color: palette.textSecondary }}>
        Discover categories and trending aesthetics
      </Text>
    </View>
  );
}

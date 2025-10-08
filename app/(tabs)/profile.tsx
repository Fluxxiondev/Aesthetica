import React from "react";
import { View, Text } from "react-native";
import { palette } from "../../theme";

export default function ProfileScreen() {
  return (
    <View
      style={{ flex: 1, backgroundColor: palette.background }}
      className="items-center justify-center"
    >
      <Text className="text-xl font-semibold" style={{ color: palette.text }}>
        Profile
      </Text>
      <Text className="mt-2" style={{ color: palette.textSecondary }}>
        Manage your account and settings
      </Text>
    </View>
  );
}

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { palette } from "../theme";

type TabItemProps = {
  focused: boolean;
  label: string;
  color: string;
  onPress: () => void;
  children: React.ReactNode; // icon
};

function TabItem({ focused, label, color, onPress, children }: TabItemProps) {
  const progress = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: focused ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [focused, progress]);

  const labelAnimatedStyle = {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }),
      },
    ],
  } as const;

  const iconAnimatedStyle = {
    transform: [
      {
        translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }),
      },
      {
        scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] }),
      },
    ],
  } as const;

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center mx-1.5 py-2 px-2.5 rounded-2xl"
    >
      <View className="items-center justify-center relative">
        <Animated.View style={iconAnimatedStyle}>{children}</Animated.View>
        <Animated.Text
          className="text-[12px] font-semibold"
          style={[{ color, position: "absolute", top: 20 }, labelAnimatedStyle]}
          numberOfLines={1}
        >
          {label}
        </Animated.Text>
      </View>
    </Pressable>
  );
}

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

  return (
    <View
      className="w-[95%] self-center h-[70px] rounded-3xl flex-row items-center justify-around "
      style={{
        bottom: 50,
        backgroundColor: palette.tabBar,
        shadowColor: palette.tabIconActive,
        elevation: 5,
      }}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
              ? options.title
              : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        const color = focused ? palette.tabIconActive : palette.tabIconInactive;

        const renderIcon = () => {
          switch (route.name) {
            case "index":
              return <Ionicons name="home" size={24} color={color} />;
            case "explore":
              return <Ionicons name="compass" size={24} color={color} />;
            case "upload":
              return (
                <MaterialCommunityIcons name="plus-circle" size={28} color={color} />
              );
            case "favorites":
              return <Ionicons name="heart" size={24} color={color} />;
            case "profile":
              return <Ionicons name="person" size={24} color={color} />;
            default:
              return <Ionicons name="ellipse" size={22} color={color} />;
          }
        };

        return (
          <TabItem
            key={route.key}
            focused={focused}
            label={label}
            color={color}
            onPress={onPress}
          >
            {renderIcon()}
          </TabItem>
        );
      })}
    </View>
  );
}

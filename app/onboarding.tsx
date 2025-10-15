import { slides } from '@/utils/slidesData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, useWindowDimensions, View } from 'react-native';
import UiText from '../components/UiText';
import { palette } from '../theme';
import { hp, wp } from '../utils/responsive';

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setIndex(viewableItems[0].index ?? 0);
    }
  }).current;


  const next = () => {
    if (index < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    }
  };

  const getStarted = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    } catch { }
    router.replace('/(auth)/login');
  };

  const renderItem = ({ item }: { item: (typeof slides)[number] }) => (
    <View className="justify-center items-center" style={{ width, paddingHorizontal: wp(6) }}>
      <View
        className="w-full rounded-2xl overflow-hidden items-center justify-center"
        style={{ height: width * 0.8, marginBottom: hp(4), borderRadius: wp(6) }}
      >
        <LottieView source={item.animation as any} autoPlay loop style={{ width: '100%', height: '100%' }} />
      </View>
      <UiText size={20} weight="semibold" className="text-center" style={{ color: palette.text }}>{item.title}</UiText>
      <UiText size={12} className="text-center" style={{ color: palette.textSecondary, marginTop: hp(1) }}>{item.description}</UiText>
    </View>
  );

  const dots = useMemo(() => (
    <View className="flex-row justify-center items-center" style={{ gap: wp(2), marginBottom: hp(5) }}>
      {slides.map((_, i) => (
        <View key={i} style={{ width: i === index ? wp(6) : wp(2), height: wp(2), borderRadius: wp(1), backgroundColor: i === index ? palette.primary : palette.softerGray }} />
      ))}
    </View>
  ), [index]);

  return (
    <View className="flex-1" style={{ backgroundColor: palette.background, paddingBottom: hp(8) }}>
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />

      {dots}

      <View className="mt-0 flex-row items-center justify-between" style={{ paddingHorizontal: wp(5), paddingVertical: hp(1) }}>
        <Pressable onPress={getStarted} className="items-center" hitSlop={10}>
          <UiText weight="medium" style={{ color: palette.textSecondary }}>Skip</UiText>
        </Pressable>

        {index < slides.length - 1 ? (
          <Pressable onPress={next} className="items-center" hitSlop={10}>
            <UiText weight="medium" style={{ color: palette.primary }}>Next</UiText>
          </Pressable>
        ) : (
          <Pressable onPress={getStarted} className="items-center" hitSlop={10}>
            <UiText weight="medium" style={{ color: palette.primary }}>Get Started</UiText>
          </Pressable>
        )}
      </View>
    </View>
  );
}

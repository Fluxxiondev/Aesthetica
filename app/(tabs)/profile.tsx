import { useRouter } from 'expo-router';
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { signOutService } from '../../services/authService';
import { setError, setLoading, setUser } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { palette } from "../../theme";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading } = useAppSelector(s => s.auth);

  const logout = async () => {
    try {
      dispatch(setLoading(true));
      await signOutService();
      dispatch(setUser(null));
      router.replace({ pathname: '/(auth)/login' } as any);
    } catch (err: any) {
      dispatch(setError(err.message ?? 'Signout failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: palette.background }}
      className="items-center justify-center"
    >
      <Text className="text-xl font-semibold" style={{ color: palette.text }}>
        {user ? `Hello, ${user.email ?? user.id}` : 'Profile'}
      </Text>
      <Text className="mt-2" style={{ color: palette.textSecondary }}>
        Manage your account and settings
      </Text>

      <Pressable onPress={logout} className="mt-6 p-3 rounded-lg items-center" style={{ backgroundColor: palette.danger }}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff' }}>Log out</Text>}
      </Pressable>
    </View>
  );
}

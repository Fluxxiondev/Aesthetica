import AuthBackground from '@/components/AuthBackground';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import UiText from '../../components/UiText';
import UiTextInput from '../../components/UiTextInput';
import { signInService } from '../../services/authService';
import { setError, setLoading, setUser } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { palette } from '../../theme';
import { hp, wp } from '../../utils/responsive';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, user } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
      ToastAndroid.show('Login successful', ToastAndroid.LONG);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(error, ToastAndroid.LONG);
      } else {
        Alert.alert('Error', error);
      }
      // clear after showing
      dispatch(setError(null));
    }
  }, [error]);


  const submit = async () => {
    const e = email.trim();
    const p = password;
    if (!e || !p) return;
    try {
      dispatch(setLoading(true));
      const data = await signInService(e, p);
      // @ts-ignore supabase types
      const u = data?.user;
      dispatch(setUser(u ? { id: u.id, email: u.email } : null));
    } catch (err: any) {
      dispatch(setError(err.message ?? 'Signin failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      {/*background */}
      <AuthBackground />

      {/* Content */}
      <View style={{ width: '100%', marginHorizontal: hp(2), marginTop: hp(20) }} className='justify-center '>
        <UiText size={24} weight="medium" style={{ color: palette.text }}>Welcome Back</UiText>
        <UiText size={12} style={{ color: palette.text }}>Hey! Good to see you again</UiText>
      </View>
      <View className="px-2 py-20">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: hp(20) }} showsVerticalScrollIndicator={false}>

            <View
              style={styles.formCard}>
              <UiTextInput
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                inputMode="email"
                labelStyle={styles.inputLabel}
                style={styles.inputContainer}
                leftIconName='mail-outline'
                leftIconColor={palette.black}
                leftIconSize={20}
              />

              <View className="mt-2">
                <UiTextInput
                  label="Password"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.inputContainer}
                  labelStyle={styles.inputLabel}
                  leftIconName='lock-closed-outline'
                  leftIconColor={palette.black}
                  leftIconSize={20}

                />
              </View>

              {error ? (
                <UiText style={{ color: palette.danger }} className="mt-3">{error}</UiText>
              ) : null}

              <Pressable
                disabled={loading || !email || !password}
                onPress={submit}
                className="mt-3 p-4  items-center rounded-full"
                style={{ backgroundColor: (loading || !email || !password) ? palette.softerGray : palette.primary }}
              >
                {loading ? <ActivityIndicator color="#fff" size={'large'} /> : <UiText weight="semibold" style={{ color: palette.text }}>Sign in</UiText>}
              </Pressable>

              <Pressable onPress={() => router.push({ pathname: '/(auth)/signup' } as any)} className="mt-4 items-center pt-4">
                <UiText size={12} style={{ color: palette.textSecondary }}>New User ? <UiText weight='bold' size={12} style={{ color: palette.primary }}>Create an account</UiText></UiText>
              </Pressable>
            </View>

          </ScrollView>

        </KeyboardAvoidingView>
      </View >
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '95%',
    padding: wp(4),
    borderRadius: wp(4),
    backgroundColor: palette.card,
    // Even shadow around (iOS)
    shadowColor: '#ffff',
    shadowOpacity: 0.5,
    shadowRadius: wp(4),
    shadowOffset: { width: 0, height: 0 },
    // Android
    elevation: 8,


  },
  inputContainer: {
    backgroundColor: 'transparent',
  },
  inputLabel: {
    marginLeft: wp(1)
  }
});

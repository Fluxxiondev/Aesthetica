import AuthBackground from '@/components/AuthBackground';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import UiText from '../../components/UiText';
import UiTextInput from '../../components/UiTextInput';
import { signUpService } from '../../services/authService';
import { setError, setLoading, setUser } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { palette } from '../../theme';
import { hp, wp } from '../../utils/responsive';

export default function SignupScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, user } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (user) {
  //     router.replace('/(tabs)');
  //   }
  // }, [user]);

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(error, ToastAndroid.LONG);
      } else {
        Alert.alert('Error', error);
      }
      dispatch(setError(null));
    }
  }, [error]);

  const submit = async () => {
    const e = email.trim();
    const p = password;
    const cp = confirmPassword;
    setLocalError(null);
    if (!e || !p || !cp) return;
    if (p !== cp) {
      setLocalError('Passwords do not match');
      return;
    }
    try {
      dispatch(setLoading(true));
      const data = await signUpService(e, p);
      const u = data?.user;
      dispatch(setUser(u ? { id: u.id, email: u.email } : null));
    } catch (err: any) {
      console.log('signup error:', err?.message);

      dispatch(setError(err.message ?? 'Signup failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      {/*background */}
     <AuthBackground/>

      {/* Content */}
      <View style={{ width: '100%', marginHorizontal: hp(2), marginTop: hp(15) }} className='justify-center '>
        <UiText size={24} weight="medium" style={{ color: palette.text }}>Create Account</UiText>
        <UiText size={12} style={{ color: palette.text }}>Join us to get started</UiText>
      </View>

      {/* Form: scroll only this card on keyboard */}
      <View className="px-2 py-10">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: hp(20) }} showsVerticalScrollIndicator={false}>
            <View style={styles.formCard}>
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

              <View className="mt-2">
                <UiTextInput
                  label="Confirm Password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  style={styles.inputContainer}
                  labelStyle={styles.inputLabel}
                  leftIconName='lock-closed-outline'
                  leftIconColor={palette.black}
                  leftIconSize={20}
                />
              </View>

              {localError ? (
                <UiText style={{ color: palette.danger }} className="mt-3">{localError}</UiText>
              ) : null}
              {error ? (
                <UiText style={{ color: palette.danger }} className="mt-3">{error}</UiText>
              ) : null}

              <Pressable
                disabled={loading || !email || !password || !confirmPassword}
                onPress={submit}
                className="mt-3 p-4  items-center rounded-full"
                style={{ backgroundColor: (loading || !email || !password) ? palette.softerGray : palette.primary }}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <UiText weight="semibold" style={{ color: palette.text }}>Sign up</UiText>}
              </Pressable>

              <Pressable onPress={() => router.push({ pathname: '/(auth)/login' } as any)} className="mt-4 items-center pt-4">
                <UiText size={12} style={{ color: palette.textSecondary }}>Already have an account? <UiText weight='bold' size={12} style={{ color: palette.primary }}>Sign in</UiText></UiText>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
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
    // Even shadow around (iOS) — mirror login styling
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

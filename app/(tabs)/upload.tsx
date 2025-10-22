import { hp } from "@/utils/responsive";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import supabase from "../../lib/supabaseClient";
import { useAppSelector } from "../../store/hooks";
import { palette } from "../../theme";

export default function UploadScreen() {
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const tagsArray = tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
  console.log({ tagsArray })
  const canUpload = !!title.trim() && !!imageUri && !loading;

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "We need access to your photos to select an image.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.9,
      });

      if (result.canceled) return;
      const uri = result.assets?.[0]?.uri;
      if (uri) setImageUri(uri);
    } catch (e) {
      Alert.alert("Image Picker Error", "Something went wrong while picking the image.");
    }
  };

  const handleUpload = async () => {
    try {
      if (!user?.id) {
        Alert.alert("Not signed in", "You need to be logged in to upload.");
        return;
      }
      if (!title.trim() || !imageUri) {
        Alert.alert("Missing fields", "Please select an image and enter a title.");
        return;
      }

      setLoading(true);

      const res = await fetch(imageUri);
      const arrayBuffer = await (res as any).arrayBuffer();
      const extGuess = imageUri.split(".").pop()?.split("?")[0] || "jpg";
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${extGuess}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase
        .storage
        .from("wallpapers")
        .upload(filePath, new Uint8Array(arrayBuffer), { contentType: `image/${extGuess}` });
      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage.from("wallpapers").getPublicUrl(filePath);
      const imageUrl = publicData.publicUrl;
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const { error: insertError } = await supabase
        .from("wallpapers")
        .insert({
          title: title.trim(),
          tags: tagsArray,
          image_url: imageUrl,
          user_id: user.id,
        });
      if (insertError) throw insertError;

      ToastAndroid.show('Your wallpaper has been uploaded.', ToastAndroid.LONG);

      setTitle("");
      setTags("");
      setImageUri(null);
    } catch (e: any) {
      console.error(e?.message)
      ToastAndroid.show(e?.message ?? "Something went wrong.", ToastAndroid.LONG);

    } finally {
      setLoading(false);
    }
  };

  return (
    <View

      style={{ flex: 1 }}>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <ScrollView
          style={{ backgroundColor: palette.background, }}
          contentContainerStyle={{ padding: 16, paddingTop: hp(5) }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-6">
            <Text className="text-2xl font-semibold" style={{ color: palette.text }}>
              Upload
            </Text>
            <Text className="mt-1" style={{ color: palette.textSecondary }}>
              Share your creations with the community
            </Text>
          </View>

          <View className="w-full mb-4">
            <View
              className="w-full rounded-xl overflow-hidden items-center justify-center"
              style={{ height: hp(25), backgroundColor: palette.card }}
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: '100%', height: "100%" }}
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center justify-center px-8">
                  <View
                    className="w-16 h-16 rounded-full items-center justify-center mb-3"
                    style={{ backgroundColor: palette.border }}
                  >
                    <Text className="text-xl" style={{ color: palette.textSecondary }}>🖼️</Text>
                  </View>
                  <Text className="text-base font-medium" style={{ color: palette.text }}>
                    No image selected
                  </Text>
                  <Text className="mt-1 text-center" style={{ color: palette.textSecondary }}>
                    Choose a wallpaper or design shot from your device gallery
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePickImage}
              className="mt-5 rounded-xl items-center justify-center py-3"
              style={{ backgroundColor: palette.primary }}
            >
              <Text className="font-medium" style={{ color: palette.text }}>
                {imageUri ? "Change Image" : "Pick Image"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full mb-4 mt-6">
            <Text className="mb-2 font-medium" style={{ color: palette.text }}>
              Title
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter a descriptive title"
              placeholderTextColor={palette.textSecondary}
              className="rounded-xl px-4 py-3"
              style={{ backgroundColor: palette.card, color: palette.text }}
              returnKeyType="done"
            />
          </View>

          <View className="w-full mb-6 mt-5">
            <Text className="mb-2 font-medium" style={{ color: palette.text }}>
              Tags (optional)
            </Text>
            <TextInput
              value={tags}
              onChangeText={setTags}
              placeholder="e.g. nature, minimal, neon"
              placeholderTextColor={palette.textSecondary}
              className="rounded-xl px-4 py-3"
              style={{ backgroundColor: palette.card, color: palette.text }}
              returnKeyType="done"
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!canUpload}
            onPress={handleUpload}
            className="rounded-xl items-center justify-center py-3 mt-5"
            style={{ backgroundColor: canUpload ? palette.primary : palette.border }}
          >
            {loading ? (
              <ActivityIndicator color={palette.primary} />
            ) : (
              <Text className="font-semibold" style={{ color: canUpload ? palette.text : palette.textSecondary }}>
                Upload
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

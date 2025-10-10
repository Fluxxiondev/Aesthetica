import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { palette } from '../theme/colors';
import UiText from './UiText';

export type UiTextInputProps = TextInputProps & {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  leftIconName?: string; // Ionicons name for left icon
  leftIconColor?: string;
  leftIconSize?: number;
};

const UiTextInput: React.FC<UiTextInputProps> = ({
  label,
  containerStyle,
  style,
  labelStyle,
  placeholderTextColor = palette.textSecondary,
  leftIconName,
  leftIconColor,
  leftIconSize,
  ...rest
}) => {
  const [isSecure, setIsSecure] = useState<boolean>(!!rest.secureTextEntry);

  const isPasswordField = useMemo(() => !!rest.secureTextEntry, [rest.secureTextEntry]);
  return (
    <View style={containerStyle}>
      {label ? (
        <UiText size={12} weight='medium' color={palette.text} style={labelStyle}>
          {label}
        </UiText>
      ) : null}
      <View className='flex-row items-center  mt-5 mb-5
      
      w-full bg-white rounded-full' >
        {leftIconName ? (
          <Ionicons
            name={leftIconName as any}
            size={leftIconSize ?? 20}
            color={leftIconColor ?? palette.textSecondary}
            style={{ marginLeft: 12 }}
          />
        ) : null}

        <TextInput
          {...rest}
          secureTextEntry={isPasswordField ? isSecure : undefined}
          placeholderTextColor={placeholderTextColor}
          className="px-4 py-4 rounded-full"
          style={[{ backgroundColor: palette.surface, color: palette.black, flex: 1 }, style]}
        />

        {isPasswordField ? (
          <Pressable onPress={() => setIsSecure(prev => !prev)} style={{ marginRight: 12 }}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={palette.black}
            />
          </Pressable>
        ) : null}
      </View>

    </View>
  );
};

export default UiTextInput;

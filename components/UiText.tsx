import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { palette } from '../theme/colors';
import { RFValue } from '../utils/responsive';

export type UiTextProps = TextProps & {
  size?: number; // base font size in dp; will be run through RFValue
  color?: string;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  style?: StyleProp<TextStyle>;
};

const weightMap = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const UiText: React.FC<UiTextProps> = ({
  size = 14,
  color = palette.text,
  weight = 'regular',
  style,
  children,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        { fontSize: RFValue(size), color, fontWeight: weightMap[weight] },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default UiText;

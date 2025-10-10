// Responsive helpers using react-native-responsive-screen
import { Dimensions, PixelRatio } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local RFValue helper (similar behavior to react-native-responsive-fontsize)
const RFValue = (fontSize: number, standardScreenHeight = 680) => {
  const { height } = Dimensions.get('window');
  const heightPercent = (fontSize * height) / standardScreenHeight;
  return Math.round(PixelRatio.roundToNearestPixel(heightPercent));
};

export { wp, hp, RFValue };

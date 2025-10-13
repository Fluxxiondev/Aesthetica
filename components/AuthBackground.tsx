import { palette } from '@/theme'
import { hp, wp } from '@/utils/responsive'
import React from 'react'
import { View } from 'react-native'

const AuthBackground = () => {
    return (
        <View style={{ position: 'absolute', inset: 0 }}>
            <View
                style={{
                    position: 'absolute', width: wp(70), height: hp(30), borderRadius: 9999,
                    backgroundColor: palette.secondary, opacity: 0.5, top: -100, right: -100,
                }}
            />
            <View
                style={{
                    position: 'absolute', width: wp(40), height: hp(15), borderRadius: 9999,
                    backgroundColor: palette.secondary, opacity: 1, top: 100, right: -80,
                }}
            />
            <View
                style={{
                    position: 'absolute', width: wp(120), height: hp(40), borderTopRightRadius: 1400, borderTopLeftRadius: 400, borderBottomRightRadius: 100,

                    backgroundColor: palette.secondary, opacity: 0.5, bottom: -40, left: wp(-15)
                }}
            />

        </View>
    )
}

export default AuthBackground
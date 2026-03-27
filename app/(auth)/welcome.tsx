import Button from '@/components/Button'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"

const Welcome = () => {
    const router = useRouter();

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* login button & image */}
                <View>
                    <TouchableOpacity onPress={() => router.navigate("/(auth)/login")} style={styles.loginButton}>
                        <Typo fontWeight={"500"}>Sign in</Typo>
                    </TouchableOpacity>

                    <Animated.Image
                        entering={FadeIn.duration(500)}
                        source={require("../../assets/images/custom-Image/vecteezy_flat-isometric-concept-illustration-investment-business_6202308.jpg")}
                        style={styles.welcomeImage}
                        resizeMode='contain'
                    />
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <Animated.View entering={FadeInDown.duration(1000).springify().damping(12)} style={{ alignItems: "center" }}>
                        <Typo size={30} fontWeight={"800"}>Always take control</Typo>
                        <Typo size={30} fontWeight={"800"}>of your finances</Typo>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.duration(1000).delay(100).springify().damping(12)} style={{ alignItems: "center", gap: 2 }}>
                        <Typo size={17}>Finances must be arranged to set a better</Typo>
                        <Typo size={17}>lifestyle in future</Typo>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.duration(1000).delay(200).springify().damping(12)} style={styles.buttonContainer}>
                        <Button onPress={() => router.navigate("/(auth)/register")}>
                            <Typo size={22} color={colors.white} fontWeight={"600"}>Get Started</Typo>
                        </Button>
                    </Animated.View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: spacingY._7,
    },
    welcomeImage: {
        width: "90%",
        height: verticalScale(300),
        alignSelf: "center",
        marginTop: verticalScale(100),
        mixBlendMode: "darken"
    },
    loginButton: {
        alignSelf: "flex-end",
        marginRight: spacingX._20
    },
    footer: {
        backgroundColor: colors.light,
        alignItems: "center",
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingY._20,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -10 },
        elevation: 10,
        shadowRadius: 10,
        shadowOpacity: 0.05
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._25
    }
})
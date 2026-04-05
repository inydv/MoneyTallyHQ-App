import { colors } from "@/constants/theme";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const index = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} resizeMode="contain" source={require("../assets/images/custom-Image/logo.webp")} />
    </View>
  )
}

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
  },
  logo: {
    height: "30%",
    aspectRatio: 1,
  }
})
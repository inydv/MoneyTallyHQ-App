import { colors, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Icons from "phosphor-react-native";
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
    const tabbarIcons: any = {
        index: (isFocused: boolean) => (
            <Icons.HouseIcon
                size={verticalScale(30)}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? colors.BtnBg : colors.black}
            />
        ),
        income: (isFocused: boolean) => (
            <Icons.WalletIcon
                size={verticalScale(30)}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? colors.BtnBg : colors.black}
            />
        ),
        budget: (isFocused: boolean) => (
            <Icons.ChartPieSliceIcon
                size={verticalScale(30)}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? colors.BtnBg : colors.black}
            />
        ),
        goal: (isFocused: boolean) => (
            <Icons.TargetIcon
                size={verticalScale(30)}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? colors.BtnBg : colors.black}
            />
        ),
        profile: (isFocused: boolean) => (
            <Icons.UserIcon
                size={verticalScale(30)}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? colors.BtnBg : colors.black}
            />
        )
    };

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        // href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabbarItem}
                    >
                        {
                            tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        flexDirection: 'row',
        width: '100%',
        height: Platform.OS == "ios" ? verticalScale(73) : verticalScale(55),
        backgroundColor: colors.light,
        justifyContent: "space-around",
        alignItems: "center",
        borderTopColor: colors.black,
        borderTopWidth: 1
    },
    tabbarItem: {
        marginBottom: Platform.OS == "ios" ? spacingY._10 : spacingY._5,
        justifyContent: "center",
        alignItems: "center"
    }
})
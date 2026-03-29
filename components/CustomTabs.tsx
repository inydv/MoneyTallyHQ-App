import { colors } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Icons from 'phosphor-react-native';
import { JSX } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CustomTabs({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const tabbarIcons: Record<string, (isFocused: boolean) => JSX.Element> = {
        index: (isFocused: boolean) => (
            <Icons.HouseIcon
                size={verticalScale(22)}
                weight={isFocused ? 'fill' : 'regular'}
                color={isFocused ? colors.white : colors.black}
            />
        ),
        income: (isFocused: boolean) => (
            <Icons.WalletIcon
                size={verticalScale(22)}
                weight={isFocused ? 'fill' : 'regular'}
                color={isFocused ? colors.white : colors.black}
            />
        ),
        budget: (isFocused: boolean) => (
            <Icons.ChartPieSliceIcon
                size={verticalScale(22)}
                weight={isFocused ? 'fill' : 'regular'}
                color={isFocused ? colors.white : colors.black}
            />
        ),
        goal: (isFocused: boolean) => (
            <Icons.TargetIcon
                size={verticalScale(22)}
                weight={isFocused ? 'fill' : 'regular'}
                color={isFocused ? colors.white : colors.black}
            />
        ),
        profile: (isFocused: boolean) => (
            <Icons.UserIcon
                size={verticalScale(22)}
                weight={isFocused ? 'fill' : 'regular'}
                color={isFocused ? colors.white : colors.black}
            />
        ),
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

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={styles.tabbarItem}
                        activeOpacity={0.9}
                    >
                        <View
                            style={[
                                styles.iconContainer,
                                isFocused && styles.activeIconContainer,
                            ]}
                        >
                            {tabbarIcons[route.name]?.(isFocused)}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 20 : 12,
        left: 16,
        right: 16,

        flexDirection: 'row',
        height: verticalScale(70),
        backgroundColor: colors.white,
        borderRadius: 999,

        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,

        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 6,
    },

    tabbarItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconContainer: {
        width: verticalScale(46),
        height: verticalScale(46),
        borderRadius: 999,
        backgroundColor: colors.light,
        justifyContent: 'center',
        alignItems: 'center',
    },

    activeIconContainer: {
        backgroundColor: colors.green,
    },
});
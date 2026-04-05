import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Input from '@/components/Input'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { updateUserRequest } from '@/config/api'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { UserDataType } from '@/constants/types'
import { useAuth } from '@/contexts/authContext'
import { getProfileImage } from '@/service/imageService'
import { scale, verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import * as ImagePicker from "expo-image-picker"
import { useRouter } from 'expo-router'
import * as Icons from "phosphor-react-native"
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

const ProfileModal = () => {
    const { user, setUser } = useAuth();

    const router = useRouter();

    const [userData, setUserData] = useState<UserDataType>({ name: "", photoUrl: null });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUserData({
            name: user?.name || "",
            photoUrl: user?.photoUrl || null
        })
    }, []);

    const onPickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert('Permission to access gallery is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setUserData({ ...userData, photoUrl: result.assets[0] })
        }
    }

    const onSubmit = async () => {
        let { name } = userData;

        if (!name.trim()) {
            Alert.alert("User", "Please fill all the fields");
        }

        setLoading(true);

        const res = await updateUserRequest(userData);

        setLoading(false);

        if (res.success) {
            if (res?.user) {
                setUser(res.user);
            }

            router.back();
        } else {
            Alert.alert("User", res.msg);
        }
    }

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header title='Update Profile' leftIcon={<BackButton />} style={{ marginBottom: spacingY._10 }} />

                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={getProfileImage(userData.photoUrl)} contentFit='cover' transition={100} />

                        <TouchableOpacity onPress={onPickImage} style={styles.editIcon}>
                            <Icons.PencilIcon size={verticalScale(20)} color={colors.black} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Typo color={colors.black}>Name</Typo>
                        <Input placeholder='Name' value={userData.name} onChangeText={(value) => { setUserData({ ...userData, name: value }) }} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Typo color={colors.black}>Currency</Typo>
                        <Input placeholder='Currency' value={userData.name} onChangeText={(value) => { setUserData({ ...userData, name: value }) }} />
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Button onPress={onSubmit} style={{ flex: 1 }} loading={loading}>
                    <Typo color={colors.white} fontWeight={'700'}>Update</Typo>
                </Button>
            </View>
        </ModalWrapper>
    )
}

export default ProfileModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: spacingY._20
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        marginBottom: spacingY._5,
    },
    form: {
        gap: spacingY._30,
        marginTop: spacingY._15,
    },
    avatarContainer: {
        position: "relative",
        alignSelf: "center",
    },
    avatar: {
        alignSelf: "center",
        backgroundColor: colors.black,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
        borderColor: colors.black
    },
    editIcon: {
        position: "absolute",
        bottom: spacingY._5,
        right: spacingY._7,
        borderRadius: 100,
        backgroundColor: colors.light,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
        padding: spacingY._7
    },
    inputContainer: {
        gap: spacingY._10,
    }
})
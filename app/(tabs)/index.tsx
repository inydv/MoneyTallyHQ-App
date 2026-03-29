import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { useAuth } from '@/contexts/authContext';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Home = () => {
    const { user } = useAuth();

    const handleLogout = async () => {
        // await SignOut(auth);
    }

    return (
        <ScreenWrapper>
            <Text>Home</Text>
            <Button onPress={handleLogout}>
                <Typo>Logout</Typo>
            </Button>
        </ScreenWrapper>
    )
}

export default Home

const styles = StyleSheet.create({})
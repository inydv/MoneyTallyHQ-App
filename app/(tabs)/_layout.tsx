import CustomTabs from '@/components/CustomTabs'
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

/* 
All Expenses & Bills:

Income:
Income Show & Analytics

Budgets:
Budgets Show & Manage Budgets & Analytics & Add expense in budget & Income v/s Expense Trend

Goals:

Profile:
1. Setting
2. Logout
3. About
4. How to
5. Teams & Invitations
6. Expense Types
*/

const _layout = () => {
    return (
        <Tabs tabBar={(props) => <CustomTabs {...props} />} screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='index' />
            <Tabs.Screen name='income' />
            <Tabs.Screen name='budget' />
            <Tabs.Screen name='goal' />
            <Tabs.Screen name='profile' />
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})
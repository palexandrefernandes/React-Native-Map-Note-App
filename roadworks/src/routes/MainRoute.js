import * as React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotesRoute from './NotesRoute';

const Tab = createBottomTabNavigator();

export default function MainRoute(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Notes" component={NotesRoute} options/>
            <Tab.Screen name="s" component={T}/>
        </Tab.Navigator>
    )
}

function T(){
    return (
        <View>
            <Text>Test</Text>
        </View>
    )
}
import * as React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotesRoute from './NotesRoute';
import Map from '../screens/map/Map';
import EditRoute from './EditRoute';

const Tab = createBottomTabNavigator();

export default function MainRoute(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Map" component={Map}/>
            <Tab.Screen name="My Points" component={EditRoute}/>
            <Tab.Screen name="Notes" component={NotesRoute}/>
        </Tab.Navigator>
    )
}
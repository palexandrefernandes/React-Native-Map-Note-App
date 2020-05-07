import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PointList from '../screens/point_list/PointList';
import EditPoint from '../screens/edit_point/EditPoint';

const Stack = createStackNavigator();

export default function NotesRoute(props){
    return (
        <Stack.Navigator>
            <Stack.Screen name="PointList" component={PointList} />
            <Stack.Screen name="EditPoint" component={EditPoint} />
        </Stack.Navigator>
    )
}
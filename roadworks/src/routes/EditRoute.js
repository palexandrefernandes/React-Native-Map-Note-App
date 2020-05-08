import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PointList from '../screens/point_list/PointList';
import EditPoint from '../screens/edit_point/EditPoint';
import {LanguageContext} from '../translation/TranslationProvider';

const Stack = createStackNavigator();

export default function NotesRoute(props){
    const language = React.useContext(LanguageContext);

    return (
        <Stack.Navigator>
            <Stack.Screen name="PointList" component={PointList} options={{title: language.myPoint}}/>
            <Stack.Screen name="EditPoint" component={EditPoint} options={{title: language.editPoint}}/>
        </Stack.Navigator>
    )
}
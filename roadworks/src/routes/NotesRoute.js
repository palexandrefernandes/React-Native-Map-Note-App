import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NoteList from '../screens/notes/ListNotes';
import NoteCreator from '../screens/create_note/NoteCreator';

const Stack = createStackNavigator();

export default function NotesRoute(props){
    return (
        <Stack.Navigator>
            <Stack.Screen name="NoteList" component={NoteList} />
            <Stack.Screen name="NoteCreator" component={NoteCreator} />
        </Stack.Navigator>
    )
}
import * as React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import NoteList from '../screens/notes/ListNotes';
import NoteCreator from '../screens/create_note/NoteCreator';
import {LanguageContext} from '../translation/TranslationProvider';

const Stack = createStackNavigator();

export default function NotesRoute(props){
    const language = React.useContext(LanguageContext);

    return (
        <Stack.Navigator>
            <Stack.Screen name="NoteList" component={NoteList} options={{title: language.noteList}}/>
            <Stack.Screen name="NoteCreator" component={NoteCreator}/>
        </Stack.Navigator>
    )
}
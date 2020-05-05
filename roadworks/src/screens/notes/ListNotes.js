import * as React from 'react';
import { TouchableOpacity, Image, StyleSheet, FlatList, BackHandler } from 'react-native';
import Note from './Note';
import * as NoteDatabase from '../../database/NoteDatabse';
import {Icon} from 'react-native-elements';
import { AuthContext } from '../../../App';
import { useFocusEffect } from '@react-navigation/native';

export default function ListNotes(props) {
    const [notes, setNotes] = React.useState([]);
    const { signOut } = React.useContext(AuthContext);

    const loadNotes = () => {
        NoteDatabase.readNotes()
        .then(n => {
            setNotes(n);
        })
        .catch(error => {
            setNotes([]);
        });
    };

    NoteDatabase.RealmDB.addListener('change', () => {
        loadNotes();
    });
    

    React.useEffect(() => {
        loadNotes();
    }, []);

    props.navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={() => props.navigation.navigate('NoteCreator')}>
                <Icon
                    type="material"
                    name="add"
                    size={24}
                />
            </TouchableOpacity>
        )
    });

    useFocusEffect(React.useCallback(() => {
        const exit = () => {
            signOut();
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', exit);
        return () => BackHandler.removeEventListener('hardwareBackPress', exit);
    }, []))

    return (
        <FlatList data={notes} renderItem={({item}) => 
            <Note 
                deleteNote={() => NoteDatabase.deleteNote(item.id)}
                editNote={() => props.navigation.navigate('NoteCreator', {index: item.id, title: item.title, description: item.description, urgency: item.urgency})}  
                title={item.title} 
                description={item.description} 
                urgency={item.urgency}
            />} 
            keyExtractor={item => item.id.toString()}
        />
    );
}

const styles = StyleSheet.create({
    headerButton: {
        backgroundColor: '#FFF',
        marginHorizontal: 20
    },
    headerButtonIcon: {

    }
});
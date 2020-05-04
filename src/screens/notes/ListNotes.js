import * as React from 'react';
import { ScrollView, TouchableOpacity, Image, StyleSheet, Text, FlatList } from 'react-native';
import Note from './Note';
import * as NoteDatabase from '../../database/NoteDatabse';

export default function ListNotes(props) {
    const [notes, setNotes] = React.useState([]);
    
    React.useEffect(() => {
        
        NoteDatabase.readNotes()
        .then(n => {
            setNotes(n);
        })
        .catch(error => {
            setNotes([]);
            console.log(error);
        });
        
    }, []);

    props.navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={() => alert('test')}>
                <Image></Image>
                <Text>Press Here</Text>
            </TouchableOpacity>
        )
    });

    return (
        <FlatList data={notes} renderItem={({item}) => <Note  title={item.title} description={item.description} urgency={item.urgency}/>} keyExtractor={item => item.id.toString()}/>
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
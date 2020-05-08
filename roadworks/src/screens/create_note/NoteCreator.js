import * as React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import Crumb from './Crumb';
import CrumbSelector from './CrumbSelector'
import { writeNote, updateNote } from '../../database/NoteDatabse';
import { Icon } from 'react-native-elements';
import {LanguageContext} from '../../translation/TranslationProvider';
import {useFocusEffect} from '@react-navigation/native'


export default function NoteCreator(props){
    const language = React.useContext(LanguageContext);
    const [id, setId] = React.useState(props.route.params ? props.route.params.index : undefined);
    const [title, setTitle] = React.useState(props.route.params ? props.route.params.title : "");
    const [description, setDescription] = React.useState(props.route.params ? props.route.params.description : "");
    const [level, setLevelChange] = React.useState(props.route.params ? props.route.params.urgency : undefined);

    useFocusEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={style.headerButton} onPress={saveNote}>
                    <Icon
                        type="material"
                        name="save"
                        size={24}
                    />
                </TouchableOpacity>
            ),
            title: props.route.params ? language.editNote: language.createNote
        });
    });

    let option = props.route.params === undefined ? writeNote : updateNote;

    const saveNote = () => {
        console.log(id);
        if(title.toString() !== "" && description.toString() !== "" && level !== undefined){
            option({
                title: title,
                description: description,
                urgency: level,
                id: id
            })
                .then(res => {
                    props.navigation.navigate('NoteList');
                })
                .catch(err => {
                    alert('Error creating note');
                    console.log(err);
                });
        }
        else {
            alert(language.fillFields);
        }
    };


    return (
        <ScrollView style={style.container}>
            <Text>{language.title}</Text>
            <TextInput underlineColorAndroid="#00F" style={style.textField} onChangeText={(text) => setTitle(text)} value={title}></TextInput>
            <Text>{language.description}</Text>
            <TextInput underlineColorAndroid="#00F" style={style.textField} onChangeText={text => setDescription(text)} value={description} numberOfLines={5} multiline={true}></TextInput>
    <Text style={{marginBottom: 20}}>{language.urgency}</Text>
            <CrumbSelector onSelect={(id) => setLevelChange(id)} defaultIndex={level}>
                <Crumb color="#0060de">{language.normal}</Crumb>
                <Crumb color="#faac1b">{language.atention}</Crumb>
                <Crumb color="#c90a1a">{language.urgent}</Crumb>
            </CrumbSelector>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 20
    },
    textField: {
        fontSize: 16
    },
    headerButton: {
        backgroundColor: '#FFF',
        marginHorizontal: 20
    },
});
import * as React from 'react';
import { ScrollView, TouchableOpacity, Image, StyleSheet, Text, TextInput, Button } from 'react-native';
import Crumb from './Crumb';
import CrumbSelector from './CrumbSelector'
import { writeNote, updateNote } from '../../database/NoteDatabse';

export default function NoteCreator(props){
    console.log(props.route);
    const [id, setId] = React.useState(props.route.params ? props.route.params.id : 0);
    const [title, setTitle] = React.useState(props.route.params ? props.route.params.title : "");
    const [description, setDescription] = React.useState(props.route.params ? props.route.params.description : "");
    const [level, setLevelChange] = React.useState(props.route.params ? props.route.params.urgency : undefined);

    let option = props.route.params ? writeNote : updateNote;

    let saveNote = () => {
        if(title.toString() !== "" && description.toString() !== "" && level !== undefined){
            option({
                title: title,
                description: description,
                urgency: level,
                id: id
            })
                .then(res => {
                    props.navigation.navigate('Home');
                })
                .catch(err => {
                    alert('Error creating note');
                    console.log(err);
                });
        }
        else {
            alert('Please fill all the fields before submission');
        }
    };

    props.navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={style.headerButton} onPress={saveNote}>
                <Image></Image>
                <Text>Save</Text>
            </TouchableOpacity>
        )
    });



    return (
        <ScrollView style={style.container}>
            <Text>Title</Text>
            <TextInput underlineColorAndroid="#00F" style={style.textField} onChangeText={(text) => setTitle(text)} value={title}></TextInput>
            <Text>Description</Text>
            <TextInput underlineColorAndroid="#00F" style={style.textField} onChangeText={text => setDescription(text)} value={description} numberOfLines={5} multiline={true}></TextInput>
            <Text style={{marginBottom: 20}}>Urgency</Text>
            <CrumbSelector onSelect={(id) => setLevelChange(id)} defaultIndex={level}>
                <Crumb color="#0060de">Low</Crumb>
                <Crumb color="#faac1b">Medium</Crumb>
                <Crumb color="#c90a1a">High</Crumb>
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
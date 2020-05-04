import * as React from 'react';
import { ScrollView, TouchableOpacity, Image, StyleSheet, Text, TextInput, Button } from 'react-native';
import Crumb from './Crumb';
import CrumbSelector from './CrumbSelector'

export default function NoteCreator(props){
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [level, setLevelChange] = React.useState();

    props.navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={style.headerButton} onPress={() => alert('test')}>
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
            <CrumbSelector onSelect={(id) => setLevelChange(id)}>
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
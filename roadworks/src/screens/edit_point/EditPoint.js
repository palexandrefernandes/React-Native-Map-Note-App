import * as React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text, TextInput, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { editPoint } from '../../rest/requests';


export default function EditPoint(props){
    const [id, setId] = React.useState(props.route.params ? props.route.params.issueId : undefined);
    const [title, setTitle] = React.useState(props.route.params ? props.route.params.title : "");
    const [description, setDescription] = React.useState(props.route.params ? props.route.params.description : "");

    const editMyPoint = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await editPoint(token, id, title, description);
            props.navigation.navigate('PointList');
            
        } 
        catch(err){
            console.warn(err);
        }
    };


    props.navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={style.headerButton} onPress={editMyPoint}>
                <Icon
                    type="material"
                    name="save"
                    size={24}
                />
            </TouchableOpacity>
        )
    });



    return (
        <ScrollView style={style.container}>
            <Text>Title</Text>
            <TextInput underlineColorAndroid="#00F" style={style.textField} onChangeText={(text) => setTitle(text)} value={title}></TextInput>
            <Text>Description</Text>
            <TextInput underlineColorAndroid="#00F" style={style.textField} onChangeText={text => setDescription(text)} value={description} numberOfLines={5} multiline={true}></TextInput>
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
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Note(props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{props.title}</Text>
                <TouchableOpacity onPress={props.deleteNote}>
                    <Icon
                        name='delete'
                        type='material'
                        size={20}
                        raised
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={props.editNote}>
                    <Icon
                        name='create'
                        type='material'
                        size={20}
                        raised
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text>{props.description}</Text>
            </View>
            <Tagline state={props.urgency}></Tagline>
        </View>
    );
}

function Tagline(props){
    let color;
    let message;
    switch(props.state){
        case 2: message= "Urgent"; color = Colors.DANGER; break;
        case 1: message= "Atention"; color = Colors.WARNING; break;
        default: message= "Normal"; color = Colors.NORMAL; break;
    }

    return (
        <View style={styles.crumbContainer}>
            <Text style={[styles.crumb, {backgroundColor: color}]}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 5,
        backgroundColor: '#FFF',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6.27,
        elevation: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#EEE',
        borderBottomWidth: 1,
        paddingVertical: 5,
        marginBottom: 10
    },
    title: {
        flex: 9,
        fontSize: 20,
    },
    optionButton:{
      flex: 1  
    },
    edit: {
        flex: 1
    },
    crumb: {
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: "#FFF"
    },
    crumbContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        paddingTop: 10
    }
});

const Colors = {
    DANGER: "#c90a1a",
    WARNING: "#faac1b",
    NORMAL: "#0060de"
}
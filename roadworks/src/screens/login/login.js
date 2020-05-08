import * as React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, TextInput, Image, Dimensions } from 'react-native';
import {AuthContext} from '../../authentication/AuthProvider';
import {LanguageContext} from '../../translation/TranslationProvider';

 export default function Login({navigation}) {
    const languages = React.useContext(LanguageContext);
    const { signIn, skipLogin } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [orientation, setOrientation] = React.useState(Dimensions.get('screen').height > Dimensions.get('screen').width);
    
    Dimensions.addEventListener('change', () => {
        const dim = Dimensions.get('screen');
        setOrientation(dim.height > dim.width);
    });

    return (
        <View style={orientation ? style.mainContainer : styleHorizontal.mainContainer}>
            <View style={!orientation ? styleHorizontal.logoContainer : {}}>
                <Image style={orientation ? style.image : styleHorizontal.image} source={require('../../res/COMMOV.png')}/>
                <Text style={orientation ? style.title : styleHorizontal.title}>RoadWorks</Text>
            </View>
            <View style={!orientation ? styleHorizontal.formContainer : {marginBottom: 10}}>
                <Text style={orientation ? style.label : styleHorizontal.label}>{languages.email}</Text>
                <TextInput style={orientation ? style.input : styleHorizontal.input} autoCompleteType="email" onChangeText={(text) => setEmail(text)}></TextInput>
                <Text style={orientation ? style.label : styleHorizontal.label}>{languages.password}</Text>
                <TextInput style={orientation ? style.input : styleHorizontal.input} autoCompleteType="password" secureTextEntry onChangeText={(text) => setPassword(text)}></TextInput>
                <Button title={languages.login} onPress={() => signIn(email, password)}/>
                <TouchableOpacity onPress={() => skipLogin()}>
                    <Text style={{textAlign: "center", marginTop: 20, color: '#444'}}>{languages.skipLogin}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styleHorizontal = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20
    },
    logoContainer: {
      flex:1,
      justifyContent: 'center',
    },
    formContainer: {
        flex:1,
        justifyContent: 'center',
      },
    input: {
        backgroundColor: '#FFF',
        borderBottomColor: "#03a1fc",
        borderBottomWidth: 5,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        borderRadius: 5,
        borderColor: '#EEE',
        borderWidth: 1,
        marginVertical: 5,
        paddingHorizontal: 10
    },
    label: {
        fontSize: 16,
        marginTop: 10
    },
    image: {
        alignSelf: 'center'
    },
    imageContainer: {
        flex:1,
        alignContent: "center",
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10
    }
});

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20
    },
    input: {
        backgroundColor: '#FFF',
        borderBottomColor: "#03a1fc",
        borderBottomWidth: 5,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        borderRadius: 5,
        borderColor: '#EEE',
        borderWidth: 1,
        marginVertical: 5,
        paddingHorizontal: 10
    },
    label: {
        fontSize: 16,
        marginTop: 10
    },
    image: {
        alignSelf: 'center'
    },
    imageContainer: {
        flex:1,
        alignContent: "center",
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10
    }
});
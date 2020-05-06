import * as React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, TextInput } from 'react-native';
import {AuthContext} from '../../authentication/AuthProvider';


 export default function Login({navigation}) {
    const { signIn, skipLogin } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    return (
        <View style={style.mainContainer}>
            <View>

            </View>
            <View style={{marginBottom: 10}}>
                <Text style={style.label}>Email</Text>
                <TextInput style={style.input} autoCompleteType="email" onChangeText={(text) => setEmail(text)}></TextInput>
                <Text style={style.label}>Password</Text>
                <TextInput style={style.input} autoCompleteType="password" secureTextEntry onChangeText={(text) => setPassword(text)}></TextInput>
            </View>
            <View>
                <Button title="Login" onPress={() => signIn(email, password)}/>
                <TouchableOpacity onPress={() => skipLogin()}>
                    <Text style={{textAlign: "center", marginTop: 20, color: '#444'}}>Skip Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

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
    }
});
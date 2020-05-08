import * as React from 'react';
import { StyleSheet, FlatList, BackHandler, View, AsyncStorage, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getMyPoints, deletePoint } from '../../rest/requests';
import { set } from 'react-native-reanimated';
import {LanguageContext} from '../../translation/TranslationProvider'

export default function ListNotes(props) {
    const language = React.useContext(LanguageContext);
    const [points, setPoints] = React.useState([]);

    const deleteMyPoint = async (id) => {
        const token = await AsyncStorage.getItem('token');
        try{
            const res = await deletePoint(token, id);
            const points = await getMyPoints(token);
            setPoints(points);
        }
        catch(err){
            console.warn(err);
        }
        
    };


    props.navigation.setOptions();

    useFocusEffect(React.useCallback(() => {
        AsyncStorage.getItem('token')
            .then(item => {
                return getMyPoints(item);
            })
            .then(res => {
                if(res)
                    setPoints(res);
            })
            .catch(err => {
                console.warn(err);
            });
    }, []));

    return (
        <FlatList data={points} renderItem={({item}) => 
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={{flex: 9, fontSize: 20}}>{item.title}</Text>
                        <Icon
                            name='delete'
                            type='material'
                            size={20}
                            raised
                            onPress={() => {
                                deleteMyPoint(item.issueId);
                            }}
                            />
                            <Icon
                                name='create'
                                type='material'
                                size={20}
                                raised
                                onPress={()=>{props.navigation.navigate('EditPoint', item);}}
                                />
                    </View>
                    <Text style={{marginBottom:10}}>{item.description}</Text>
                </View>
            } 
            keyExtractor={item => item.issueId.toString()}
        />
    );
}

const styles = StyleSheet.create({
    card: {
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
    }
});
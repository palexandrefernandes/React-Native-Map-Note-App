import * as React from 'react';
import { StyleSheet, FlatList, BackHandler, View, AsyncStorage, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getMyPoints, deletePoint } from '../../rest/requests';
import { set } from 'react-native-reanimated';

export default function ListNotes(props) {
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
                    <Text>{item.description}</Text>
                </View>
            } 
            keyExtractor={item => item.issueId.toString()}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        paddingBottom: 20,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#EEE',
        backgroundColor: "#FFF"
    },
    header: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    }
});
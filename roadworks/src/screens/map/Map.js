import * as React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, PermissionsAndroid, Modal, Text, Button, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Icon} from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {RNCamera} from 'react-native-camera';
import {createPoint} from '../../rest/requests';
import {AuthContext} from '../../authentication/AuthProvider';

function requestGeolocaionPermisson() {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(res => {
            if(!res){
                return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
                    {
                        title: 'Grant Access To Current Location',
                        message: 'In order to get you current location we need your authorization to do so.',
                        buttonPositive: 'Accept',
                        buttonNegative: 'Deny'
                    });
            }
        })
        .catch(err => {
            console.warn(err);
        })
}

export default function Map(props){
    const {getState} = React.useContext(AuthContext);
    const [currentLocation, setCurrentLocation] = React.useState();
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [picture, setPicture] = React.useState({});
    const [cameraState, setCameraState] = React.useState(false)
    const [showCreatePointModal, setCretePointModal] = React.useState(false);
    let camera;

    console.log(getState());

    const centerMap = () => {
        Geolocation.getCurrentPosition(info => {
            setCurrentLocation({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            });
        });
    };

    const savePoint = () => {
        createPoint(currentLocation.latitude, currentLocation.longitude, title, description, picture.raw)
            .then(res => {
                if(res){
                    setTitle("");
                    setDescription("");
                    setPicture({});
                    setCretePointModal(false);
                }
            });
    }

    const takePicture = () => {
        if(camera){
            camera.takePictureAsync({quality: 0.5, base64:true})
                .then(res => {
                    setPicture({uri:`data:image/png;base64,${res.base64}`, raw: res.base64});
                    setCameraState(false);
                })
                .catch(err => {
                    console.warn(err);
                })
        }
    }

    React.useEffect(() => {
        requestGeolocaionPermisson();
        centerMap();
    }, []);


    return (
        <View style={styles.container}>
            <Modal visible={cameraState} onRequestClose={()=> {setCameraState(false)}}>
                    <RNCamera
                        ref={ref => camera = ref}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        captureAudio={false}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        />
                    <View style={styles.cameraControlls}>
                        <Icon
                            containerStyle={{alignSelf: 'center'}}
                            size={32}
                            solid
                            raised
                            name='camera'
                            type='material'
                            color='#00aced' 
                            onPress={() => {takePicture()}}/>
                    </View>
                </Modal>
            <Modal animationType='fade' transparent visible={showCreatePointModal} onRequestClose={()=> {setCretePointModal(false)}}>
                <View style={[styles.modelContainer]}>
                    <View style={styles.modelContent}>
                        <Text>Title</Text>
                        <TextInput onChangeText={(text) => setTitle(text)} value={title}/>
                        <Text>Description</Text>
                        <TextInput onChangeText={(text) => setDescription(text)} value={description}/>
                        {picture.uri?(<Image style={styles.picture} source={picture}></Image>) : (<></>)}
                        <Button title='Take picture' onPress={() => setCameraState(true)}/>
                        <Text></Text>
                        <Button title='Save' onPress={savePoint}/>
                    </View>
                </View>
            </Modal>

            <View style={styles.fabContainer}>
                <Icon
                    size={32}
                    solid
                    raised
                    name='location-searching'
                    type='material'
                    color='#00aced'
                    onPress={centerMap} />
                <Icon
                    size={32}
                    solid
                    raised
                    name='add'
                    type='material'
                    color='#00aced' 
                    onPress={() => {setCretePointModal(true)}}/>
            </View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={currentLocation}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    fabContainer: {
        zIndex: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        flex:1,
        padding: 16
    },
    modelContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: "rgba(0,0,0, 0.6)",
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    modelContent: {
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        marginVertical: 50,
        borderRadius: 5,
        padding: 20,
        flex: 1
    },
    preview: {
        zIndex: 30,
        flex: 1,
        width: '100%'
    },
    cameraControlls: {
        zIndex: 100,
        position: 'absolute',
        bottom: 20,
        flex:1,
        width: '100%',
        alignItems: "center"
    },
    picture: {
        flex: 1,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
        marginBottom: 10,
        alignSelf: 'center'
    }
});
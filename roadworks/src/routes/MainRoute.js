import * as React from 'react';
import { View, Text, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotesRoute from './NotesRoute';
import Map from '../screens/map/Map';
import EditRoute from './EditRoute';
import {LanguageContext} from '../translation/TranslationProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PushNotification from 'react-native-push-notification';


const Tab = createBottomTabNavigator();

export default function MainRoute(){
    BackHandler.addEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
    });

    PushNotification.subscribeToTopic('issue');
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification.message, notification.title);
        PushNotification.localNotification({
          title: notification.title,
          message: notification.message
        });
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    PushNotification.localNotification({
      ticker: "My Notification Ticker",
      autoCancel: true,
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
      bigText: "My big text that will be shown when notification is expanded",
      subText: "This is a subText",
      color: "red", 
      vibrate: true, 
      vibration: 300, 
      priority: "high"
    });



    const language = React.useContext(LanguageContext);

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Map') {
                iconName = 'map'
              } else if (route.name === 'My Points') {
                iconName = 'edit-location';
              }
              else {
                iconName = 'mode-edit'
              }
  
              // You can return any component that you like here!
              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#008cf0',
            inactiveTintColor: 'gray',
          }}
        >
            <Tab.Screen name="Map" component={Map} options={{title: language.map}}/>
            <Tab.Screen name="My Points" component={EditRoute} options={{title: language.myPoint}}/>
            <Tab.Screen name="Notes" component={NotesRoute} options={{title: language.notes}}/>
        </Tab.Navigator>
    )
}
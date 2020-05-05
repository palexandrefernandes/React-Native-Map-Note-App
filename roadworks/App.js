import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteList from './src/screens/notes/ListNotes';
import NoteCreator from './src/screens/create_note/NoteCreator';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Note Creator" component={NoteCreator} />
        <Stack.Screen name="Home" component={NoteList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
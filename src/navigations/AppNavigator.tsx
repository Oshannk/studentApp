import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {StatusBar, Text, TouchableOpacity} from 'react-native';
import Home from '../screens/Home';
import Feather from 'react-native-vector-icons/Feather';
import AddStudentScreen from '../screens/AddStudentScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // const navigation = useNavigation();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#5AE4A7'} />
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerShown: true,
            headerBackVisible: false,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#5AE4A7',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Add Student')}>
                <Feather name="plus" size={35} color="#fff" />
              </TouchableOpacity>
            ),
          })}
          name="Students"
          component={Home}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#5AE4A7',
            },
          }}
          name="Add Student"
          component={AddStudentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

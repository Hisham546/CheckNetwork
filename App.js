import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckNetwork from './src/checkNetwork';


const Stack = createNativeStackNavigator();

const App = () => {
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen
               options={{ headerShown: false }}
               name="CheckNetwork"
               component={CheckNetwork} />

         </Stack.Navigator>

      </NavigationContainer>
   );
};

export default App;
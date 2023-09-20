import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { CardProvider } from './src/context/CardContext';
import { SearchProvider } from './src/context/SearchContext';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';


const Stack = createNativeStackNavigator();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      concurrency: 2,
    },
  },
})

export default function App() {
  return (
    <View style={styles.wrap}>
      <SearchProvider>
        <CardProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Details' component={DetailsScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
              <StatusBar style="auto" />
            </NavigationContainer>
          </QueryClientProvider>
        </CardProvider>
      </SearchProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    // padding: 10,
    backgroundColor: '#1B2035',
    paddingTop: 20
  }
});

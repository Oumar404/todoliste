import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageAccueil from './';
import PageAjout from './';
import PageListe from './';
import PageDetails from './';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={PageAccueil} />
        <Stack.Screen name="Ajout" component={PageAjout} />
        <Stack.Screen name="Liste" component={PageListe} />
        <Stack.Screen name="Details" component={PageDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import { StyleSheet, View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Personnes</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Voir la liste"
          onPress={() => router.push('/liste')}
          color="#228CDB"
        />
        <Button
          title="Ajouter une personne"
          onPress={() => router.push('/ajout')}
          color="#228CDB"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#228CDB',
    marginBottom: 15,
    paddingVertical: 12,
  },
});

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetailsPage() {
  const router = useRouter();
  const { personne } = useLocalSearchParams();
  const personneData = personne ? JSON.parse(Array.isArray(personne) ? personne[0] : personne) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la personne</Text>
      {personneData ? (
        <>
          <Text>ID: {personneData.id}</Text>
          <Text>Nom: {personneData.nom}</Text>
          <Text>Prénom: {personneData.prenom}</Text>
        </>
      ) : (
        <Text>Aucune personne sélectionnée</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20 },
  button: { backgroundColor: '#228CDB', marginTop: 20, padding: 15, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

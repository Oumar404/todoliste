import { StyleSheet, Text, View, Button } from 'react-native';

export default function PageDetails({ navigation, route }) {
  const { personne } = route.params || {}; // ← Récupère les params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la personne</Text>
      {personne ? (
        <>
          <Text>ID: {personne.id}</Text>
          <Text>Nom: {personne.nom}</Text>
          <Text>Prénom: {personne.prenom}</Text>
        </>
      ) : (
        <Text>Aucune personne sélectionnée</Text>
      )}
      <Button title="Retour" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20 },
});
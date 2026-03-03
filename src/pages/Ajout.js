import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Alert } from 'react-native';
import { Formik } from 'formik';
import uuid from 'uuid'; // ou 'react-native-uuid' si tu gardes l'ancien
import { Text, Button, Input } from 'react-native-elements';

export default function PageAjout({ navigation }) {  // ← Ajoute { navigation } ici !

  const { getItem, setItem } = useAsyncStorage('pers');

  const ajout = (values) => {
    if (!values.nom || !values.prenom) {
      Alert.alert('Erreur', 'Nom et prénom sont obligatoires !');
      return;
    }

    getItem()
      .then((persJSON) => {
        let pers = persJSON ? JSON.parse(persJSON) : [];
        pers.push({
          id: uuid.v4(),
          nom: values.nom,
          prenom: values.prenom,
        });
        setItem(JSON.stringify(pers))
          .then(() => {
            Alert.alert('Succès', 'Personne ajoutée !');
            navigation.goBack();  // ← Retour fluide vers l'écran précédent
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text h4>Nouvelle personne</Text>
      <Formik initialValues={{ nom: '', prenom: '' }} onSubmit={ajout}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <Input
              placeholder="Votre nom"
              onChangeText={handleChange('nom')}
              onBlur={handleBlur('nom')}
              value={values.nom}
            />
            <Input
              placeholder="Votre prénom"
              onChangeText={handleChange('prenom')}
              onBlur={handleBlur('prenom')}
              value={values.prenom}
            />
            <Button
              title="Valider"
              onPress={handleSubmit}
              buttonStyle={styles.button}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  form: { marginTop: 20 },
  button: { backgroundColor: '#228CDB', marginTop: 20 },
});
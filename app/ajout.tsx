import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import uuid from 'react-native-uuid';
import { Input } from 'react-native-elements';
import { useRouter } from 'expo-router';

export default function AjoutPage() {
  const router = useRouter();
  const { getItem, setItem } = useAsyncStorage('pers');

  const ajout = (values: { nom: string; prenom: string }) => {
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
            router.back();
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle personne</Text>
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
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  form: { marginTop: 20 },
  button: { backgroundColor: '#228CDB', marginTop: 20, padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

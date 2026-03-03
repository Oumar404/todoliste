import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Alert, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { Formik } from 'formik';
import uuid from 'react-native-uuid';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
            Alert.alert('Succès', 'Tâche ajoutée avec succès !', [
              { text: 'OK', onPress: () => router.back() }
            ]);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>➕ Ajouter une tâche</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.formContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nouvelle tâche</Text>
          <Text style={styles.cardSubtitle}>Remplissez les informations ci-dessous</Text>
          
          <Formik initialValues={{ nom: '', prenom: '' }} onSubmit={ajout}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nom de la tâche</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Acheter du pain"
                    placeholderTextColor="#999"
                    onChangeText={handleChange('nom')}
                    onBlur={handleBlur('nom')}
                    value={values.nom}
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Ex: Aller à la boulangerie du coin"
                    placeholderTextColor="#999"
                    onChangeText={handleChange('prenom')}
                    onBlur={handleBlur('prenom')}
                    value={values.prenom}
                    multiline
                    numberOfLines={3}
                  />
                </View>
                
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>✨ Ajouter la tâche</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#667eea',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

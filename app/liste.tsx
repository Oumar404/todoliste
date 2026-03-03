import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function ListePage() {
  const router = useRouter();
  const { getItem } = useAsyncStorage('pers');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function getListe() {
    getItem()
      .then((persJSON) => {
        const pers = persJSON ? JSON.parse(persJSON) : [];
        setItems(pers);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getListe();
  }, []);

  function renderCard({ item }: { item: any }) {
    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => router.push({ pathname: '/details', params: { personne: JSON.stringify(item) } })}
      >
        <Text style={styles.cardTitle}>
          {item.nom} {item.prenom}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={getListe}
        data={items}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

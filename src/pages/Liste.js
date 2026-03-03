import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StyleSheet, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';

export default function PageListe({ navigation }) {
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
        const unsubscribe = navigation.addListener('focus', getListe);
        return unsubscribe;
    }, [])

  function renderCard({ item }) {
  return (
    <Card onPress={() => navigation.navigate('Details', { personne: item })}>
      <Card.Title style={styles.cardTitle}>
        {item.nom} {item.prenom}
      </Card.Title>
    </Card>
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

}const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
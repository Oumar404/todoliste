import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
        setLoading(false);
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
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.nom ? item.nom.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>
              {item.nom} {item.prenom}
            </Text>
            <Text style={styles.cardSubtitle}>
              ID: {item.id ? item.id.substring(0, 8) + '...' : 'N/A'}
            </Text>
          </View>
          <View style={styles.arrow}>
            <Text style={styles.arrowText}>›</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>📋 Liste des tâches</Text>
        <Text style={styles.subtitle}>{items.length} tâche{items.length > 1 ? 's' : ''}</Text>
      </View>
      
      <View style={styles.listContainer}>
        {items.length === 0 && !loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📝</Text>
            <Text style={styles.emptyTitle}>Aucune tâche</Text>
            <Text style={styles.emptySubtitle}>Commencez par ajouter votre première tâche</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => router.push('/ajout')}
            >
              <Text style={styles.emptyButtonText}>Ajouter une tâche</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={items}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getListe}
                tintColor="#fff"
                colors={['#fff']}
              />
            }
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  arrow: {
    marginLeft: 10,
  },
  arrowText: {
    fontSize: 24,
    color: '#667eea',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  emptyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

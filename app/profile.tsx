import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Simulation : await signOut(auth);
    router.replace('/login');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Mon Profil</ThemedText>
      
      <ThemedText style={styles.infoText}>Ici s'affichera prochainement votre profil</ThemedText>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={{ color: 'white' }}>Déconnexion</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, gap: 30 },
  infoText: { fontSize: 16, textAlign: 'center', fontStyle: 'italic' },
  logoutButton: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' }
});
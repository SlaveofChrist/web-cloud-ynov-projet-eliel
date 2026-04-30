import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      
      {/* Barre de Navigation */}
      <View style={styles.navBar}>
        <Link href="/" style={styles.navLink}>
          <ThemedText type="defaultSemiBold">Accueil</ThemedText>
        </Link>
        <Link href="/login" style={styles.navLink}>
          <ThemedText type="defaultSemiBold">Connexion</ThemedText>
        </Link>
        <Link href="/register" style={styles.navLink}>
          <ThemedText type="defaultSemiBold">Inscription</ThemedText>
        </Link>
        <Link href="/profile" style={styles.navLink}>
          <ThemedText type="defaultSemiBold">Profil</ThemedText>
        </Link>
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenue sur notre Application !</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedText>
          Nous sommes ravis de vous accueillir. Utilisez la barre de navigation ci-dessus pour explorer les différentes sections de l'application ou pour gérer votre compte.
        </ThemedText>
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
    marginBottom: 20,
  },
  navLink: {
    paddingHorizontal: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 15,
  },
  contentContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
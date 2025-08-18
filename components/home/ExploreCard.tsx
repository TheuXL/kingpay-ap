import { Image, StyleSheet, Text, View } from 'react-native';

export default function ExploreCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorar outras funcionalidades</Text>
      <Image source={require('../../images/home/Explore Features Details Container.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginTop: 0,
    marginBottom: -80,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -70,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // ou a proporção correta da imagem
    resizeMode: 'contain',
  },
});

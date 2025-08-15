import { StyleSheet, Text, View } from 'react-native';
import ExploreFeaturesIcon from '../../images/home/Explore Features Details Container.svg';

export default function ExploreCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorar outras funcionalidades</Text>
      <ExploreFeaturesIcon width={'100%'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

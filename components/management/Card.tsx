import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white['01'],
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
  },
});